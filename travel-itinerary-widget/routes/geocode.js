// ══════════════════════════════════════════════════════════
//  Route: GET /api/geocode?q=<place name>
//  Thin proxy around Nominatim so the widget JS
//  doesn't need a CORS workaround in the browser.
// ══════════════════════════════════════════════════════════

import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.status(400).json({ error: "Missing query param: q" });

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "TravelItineraryWidget/1.0",
        "Accept-Language": "en",
      },
    });
    if (!response.ok) throw new Error("Nominatim request failed");
    const data = await response.json();
    if (!data.length) return res.json({ found: false });
    const { lat, lon, display_name } = data[0];
    res.json({ found: true, lat: parseFloat(lat), lon: parseFloat(lon), display_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reverse geocode: GET /api/geocode/reverse?lat=X&lon=Y
router.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "TravelItineraryWidget/1.0",
        "Accept-Language": "en",
      },
    });
    if (!response.ok) throw new Error("Reverse geocode failed");
    const data = await response.json();
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      "Unknown";
    res.json({ city, display_name: data.display_name, address: data.address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vercel first-party IP geolocation: GET /api/geocode/ip
router.get("/ip", (req, res) => {
  const city = req.headers["x-vercel-ip-city"] || req.headers["x-real-ip-city"];
  const region = req.headers["x-vercel-ip-country-region"];
  const lat = req.headers["x-vercel-ip-latitude"];
  const lon = req.headers["x-vercel-ip-longitude"];
  
  if (city) {
    res.json({ city, region, lat: parseFloat(lat), lon: parseFloat(lon) });
  } else {
    res.status(404).json({ error: "Vercel headers missing or not on edge network" });
  }
});

export default router;
