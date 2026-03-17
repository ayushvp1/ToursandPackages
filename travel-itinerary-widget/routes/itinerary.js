// ═══════════════════════════════════════════════════════════
//  Route: POST /api/itinerary
//  Orchestrates: Geocode → Overpass POIs → OSRM → Groq AI
//  FREE: Groq free tier — 14,400 req/day, no credit card
//  Model: llama-3.3-70b-versatile
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { cachedGeocode, cachedPOIs, cachedTravelTime, usageTracker } from "../lib/cache.js";
import { createLogger } from "../lib/logger.js";

const router = Router();
const log    = createLogger("itinerary");

// ── Groq API call (pure fetch, zero SDK needed) ──────────────

const GROQ_MODEL   = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

async function callGroq(prompt) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set in .env — get one free at console.groq.com");

  const res = await fetch(GROQ_API_URL, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      model:       GROQ_MODEL,
      temperature: 0.7,
      max_tokens:  3500,
      // response_format forces pure JSON — no markdown, no backticks
      response_format: { type: "json_object" },
      messages: [
        {
          role:    "system",
          content: "You are an expert local travel guide. You specialization is in LUXURY and PREMIUM travel. You always include at least one resort or hotel recommendation in every plan. You correctly identify and highlight VEG vs NON-VEG food options. Always respond with a single valid JSON object — no markdown, no explanation text.",
        },
        {
          role:    "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // Handle Groq-specific rate limit error gracefully
    if (res.status === 429) {
      throw new Error("Free tier rate limit hit — please wait a minute and try again.");
    }
    throw new Error(`Groq API error ${res.status}: ${err?.error?.message || res.statusText}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from Groq");
  return text;
}

// ── Raw API helpers (passed into cache wrappers) ─────────────

async function _geocode(query) {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token || usageTracker.isOverLimit) return _geocodeFallback(query);

  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&limit=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Mapbox geocoding failed");
    
    // Successful call, increment tracker
    usageTracker.increment();
    
    const data = await res.json();
    if (!data.features || !data.features.length) return null;
    const [lon, lat] = data.features[0].center;
    return { lat, lon };
  } catch (err) {
    log.error("Mapbox geocode error, falling back", err);
    return _geocodeFallback(query);
  }
}

async function _geocodeFallback(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const res = await fetch(url, { headers: { "User-Agent": "TravelItineraryWidget/1.0" } });
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

async function _fetchPOIs(lat, lon) {
  const query = `
    [out:json][timeout:20];
    (
      node["amenity"="restaurant"](around:5000,${lat},${lon});
      node["amenity"="cafe"](around:4000,${lat},${lon});
      node["tourism"="attraction"](around:6000,${lat},${lon});
      node["leisure"="park"](around:5000,${lat},${lon});
      node["tourism"="museum"](around:6000,${lat},${lon});
      node["amenity"="place_of_worship"](around:5000,${lat},${lon});
      node["tourism"="viewpoint"](around:6000,${lat},${lon});
      node["leisure"="beach"](around:6000,${lat},${lon});
      node["tourism"="hotel"](around:8000,${lat},${lon});
      node["tourism"="resort"](around:8000,${lat},${lon});
    );
    out body;
  `.trim();

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    `data=${encodeURIComponent(query)}`,
  });
  if (!res.ok) return [];

  const data = await res.json();
  return (data.elements || [])
    .filter((e) => e.tags?.name && e.tags.name.length > 1)
    .slice(0, 25)
    .map((e) => ({
      name:    e.tags.name,
      type:    e.tags.amenity || e.tags.tourism || e.tags.leisure || "place",
      hours:   e.tags.opening_hours || "",
      cuisine: e.tags.cuisine || "",
      lat:     e.lat,
      lon:     e.lon,
    }));
}

async function _getTravelMinutes(lat1, lon1, lat2, lon2) {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token || usageTracker.isOverLimit) return _getTravelMinutesFallback(lat1, lon1, lat2, lon2);

  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${lon1},${lat1};${lon2},${lat2}?access_token=${token}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Mapbox directions failed");
    
    // Successful call, increment tracker
    usageTracker.increment();
    
    const data = await res.json();
    return Math.ceil((data.routes?.[0]?.duration || 1800) / 60);
  } catch (err) {
    log.error("Mapbox directions error, falling back", err);
    return _getTravelMinutesFallback(lat1, lon1, lat2, lon2);
  }
}

async function _getTravelMinutesFallback(lat1, lon1, lat2, lon2) {
  const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) return 30;
  const data = await res.json();
  return Math.ceil((data.routes?.[0]?.duration || 1800) / 60);
}

// ── Time utilities ───────────────────────────────────────────

function subtractMinutes(timeStr, mins) {
  const [h, m] = timeStr.split(":").map(Number);
  const total  = Math.max(0, h * 60 + m - mins);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// ── Prompt builder ───────────────────────────────────────────

function buildPrompt({ dest, arrPt, depPt, arrTime, depTime, interests, dietaryPreference, pois, travelMins }) {
  const buffer  = travelMins + 25;
  const leaveBy = subtractMinutes(depTime, buffer);

  const poisBlock =
    pois.length > 0
      ? pois.map((p) =>
          `• ${p.name} [Coords: ${p.lat}, ${p.lon}] (${p.type}${p.cuisine ? " / " + p.cuisine : ""}${p.hours ? " | hrs: " + p.hours : ""})`
        ).join("\n")
      : `(No OSM data — use your knowledge of famous local spots in ${dest})`;

  return {
    leaveBy,
    prompt: `You are an expert local travel guide with deep knowledge of ${dest}.

TRIP BRIEF:
- Destination  : ${dest}
- Arrival      : ${arrTime} at "${arrPt}"
- Train departs: ${depTime} from "${depPt}"
- Road travel to departure: ~${travelMins} min + 25 min buffer
- MUST LEAVE BY: ${leaveBy}
- Interests: ${interests.join(", ")}
- Dietary Preference: ${dietaryPreference === 'veg' ? 'STRICT VEGETARIAN (Only suggest Pure Veg places)' : 'NON-VEGETARIAN (Can suggest places with meat/seafood)'}

REAL LOCAL PLACES (OpenStreetMap data):
${poisBlock}

RULES:
1. Build a complete day itinerary from ${arrTime} to ${leaveBy}.
2. Start with breakfast near the arrival station.
3. Mix: food, cultural sites, local activities, rest stops, afternoon exploration.
4. FINAL item must be travel to "${depPt}" at time "${leaveBy}".
5. Use real places — prefer the OSM list above, supplement with your own knowledge.
6. Realistic durations: restaurants 45-60 min, major sights 60-90 min, quick stops 30 min.
7. Local transport suggestions (walk/auto/bus) with rough INR cost and minutes.
8. departure_alert must say exactly: "Leave by ${leaveBy}. Allow ${travelMins} min to reach ${depPt} by ${depTime}."
9. For each item, MUST include "lat" and "lon" coordinates. Use the provided OSM coordinates when choosing those spots.
10. MANDATORY: You MUST include a "photo_query" field for EVERY item. It should be a 3-word specific description for an image search.
11. MANDATORY: You MUST include at least one HIGH-END RESORT or HOTEL stop in the itinerary (e.g. for relaxation, tea, or stay).
12. If dietary preference is VEG, suggest ONLY purely vegetarian restaurants.
13. If dietary preference is NON-VEG, you can suggest places known for meat/seafood (like Karim's in Delhi).
14. Traffic: Mention typical ${dest} traffic in descriptions for transport stops.
15. Focus on EXOTIC and STYLISH places that would look good in a travel brochure.

Return this exact JSON structure:
{
  "city": "city name",
  "tagline": "one poetic line about the city",
  "weather_tip": "what to wear / carry",
  "cost_estimate": "total INR range for the full day",
  "departure_alert": "leave by message",
  "items": [
    {
      "time": "HH:MM",
      "end_time": "HH:MM",
      "title": "place name",
      "subtitle": "street or neighbourhood",
      "description": "2 vivid sentences that paint a picture",
      "category": "breakfast|coffee|attraction|activity|lunch|dinner|shopping|beach|temple|museum|transport|departure",
      "must_try": "one specific thing to try",
      "tip": "one insider tip",
      "getting_there": "transport mode + INR cost + minutes",
      "cost": "INR range or Free",
      "lat": 0.0,
      "lon": 0.0,
      "photo_query": "search term"
    }
  ]
}`,
  };
}

// ── Route handler ─────────────────────────────────────────────

router.post("/", async (req, res) => {
  const { dest, arrivalPoint, departurePoint, arrivalTime, departureTime, interests, dietaryPreference } = req.body;

  const reqId = Math.random().toString(36).slice(2, 8);
  log.info("Request received", { reqId, dest, arrivalTime, departureTime });
  const t0 = Date.now();

  try {
    // Step 1: Geocode destination (cached 6h)
    const coords = await cachedGeocode(dest, _geocode).catch(() => null);

    // Step 2: POIs + travel time in parallel (both cached)
    const [pois, travelMins] = await Promise.all([
      coords
        ? cachedPOIs(coords.lat, coords.lon, _fetchPOIs).catch(() => [])
        : Promise.resolve([]),

      (async () => {
        if (!coords) return 30;
        const depCoords = await cachedGeocode(
          `${departurePoint}, ${dest}`, _geocode
        ).catch(() => null);
        if (!depCoords) return 30;
        return cachedTravelTime(
          coords.lat, coords.lon,
          depCoords.lat, depCoords.lon,
          _getTravelMinutes
        ).catch(() => 30);
      })(),
    ]);

    log.debug("Data gathered", { reqId, poisCount: pois.length, travelMins });

    // Step 3: Build prompt → call Groq
    const { leaveBy, prompt } = buildPrompt({
      dest,
      arrPt:   arrivalPoint,
      depPt:   departurePoint,
      arrTime: arrivalTime,
      depTime: departureTime,
      interests,
      dietaryPreference,
      pois,
      travelMins,
    });

    log.debug("Calling Groq", { reqId, model: GROQ_MODEL });
    const rawText = await callGroq(prompt);
    console.log("--- RAW AI RESPONSE ---", rawText);

    // Step 4: Parse
    let itinerary;
    try {
      itinerary = JSON.parse(rawText.replace(/```json|```/g, "").trim());
    } catch {
      log.error("Groq returned malformed JSON", { reqId, preview: rawText.slice(0, 200) });
      return res.status(500).json({ error: "AI returned malformed response — please retry." });
    }
    console.log("--- PARSED ITINERARY ---", itinerary);

    itinerary._meta = {
      poisFound:           pois.length,
      travelMinsToStation: travelMins,
      leaveBy,
      durationMs:          Date.now() - t0,
      generatedAt:         new Date().toISOString(),
      model:               GROQ_MODEL,
      mapboxOverLimit:     usageTracker.isOverLimit
    };

    log.info("Itinerary generated", {
      reqId, city: itinerary.city,
      stops: itinerary.items?.length,
      ms: itinerary._meta.durationMs,
    });

    res.json({ success: true, itinerary });

  } catch (err) {
    log.error("Error", { reqId, err: err.message });
    res.status(500).json({ error: err.message || "Failed to generate itinerary" });
  }
});

export default router;
