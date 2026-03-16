# ✈️ Travel Itinerary Widget

AI-powered day planner for train travelers. Drop two lines into any website.

---

## What it does

A traveler arrives in a city by train at 9 am and must leave by 7 pm.
They open your website — this widget:

1. **Detects GPS** via the browser (no key needed)
2. Accepts arrival/departure times and interests
3. Your Node.js server orchestrates:
   - **Nominatim** → geocode the destination (free)
   - **Overpass API** → real restaurants, temples, beaches, parks within 5 km (free)
   - **OSRM** → real road travel time to the station (free)
   - **Claude AI** → crafts a vivid, time-mapped itinerary
4. Renders an **animated timeline** — every stop with time window, vivid description, must-try, insider tip, transport info, cost
5. **Departure alert** pinned at the top — "Leave by 18:10"

---

## File Structure

```
travel-itinerary-widget/
├── server.js               ← Standalone Express server (run this)
├── embed.js                ← Mount into an EXISTING Express app
├── package.json
├── .env.example
├── test.js                 ← CLI test runner (no framework)
│
├── routes/
│   ├── itinerary.js        ← Geocode → Overpass → OSRM → Claude
│   └── geocode.js          ← Nominatim proxy (forward + reverse)
│
├── middleware/
│   └── validate.js         ← Input validation (time format, window, interests)
│
├── lib/
│   ├── cache.js            ← In-memory TTL cache (geo/POI/route)
│   └── logger.js           ← Structured logger + request timing middleware
│
└── public/
    ├── itinerary-widget.js ← THE drop-in frontend script (self-contained)
    └── demo.html           ← Live demo page
```

---

## Quick Start (Standalone)

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
# Edit .env — add your ANTHROPIC_API_KEY

# 3. Start
npm start

# 4. Open demo
# → http://localhost:3001/demo
```

### Embed on any page (2 lines)

```html
<div id="itinerary-widget"></div>

<script
  src="https://yourserver.com/widget/itinerary-widget.js"
  data-api-base="https://yourserver.com"
  data-target="#itinerary-widget">
</script>
```

---

## Plug into an Existing Express App

Use `embed.js` instead of running `server.js` separately:

```js
// In your existing app.js / server.js
import express from "express";
import { mountWidget } from "./travel-itinerary-widget/embed.js";

const app = express();

// Your existing routes...
app.get("/", (req, res) => res.send("My website"));

// Mount the widget (5 lines)
mountWidget(app, {
  apiPrefix:    "/api/travel",   // default
  staticPrefix: "/widget",       // default
  rateLimit:    20,              // requests/IP/15min
});

app.listen(3000);
```

Then in your HTML:

```html
<div id="trip-planner"></div>
<script
  src="/widget/itinerary-widget.js"
  data-api-base="https://mysite.com"
  data-target="#trip-planner">
</script>
```

---

## API Reference

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/itinerary` | Generate day itinerary |
| `GET`  | `/api/geocode?q=place` | Forward geocode |
| `GET`  | `/api/geocode/reverse?lat=X&lon=Y` | Reverse geocode |
| `GET`  | `/api/health` | Health + cache stats |
| `GET`  | `/api/cache/stats` | Cache entry count |

### POST /api/itinerary

**Request:**
```json
{
  "dest":           "Kozhikode, Kerala",
  "arrivalPoint":   "Kozhikode Railway Station",
  "departurePoint": "Kozhikode Railway Station",
  "arrivalTime":    "09:00",
  "departureTime":  "19:00",
  "interests":      ["food", "culture", "beaches"]
}
```

**Allowed interests:** `food` `culture` `nature` `shopping` `beaches` `adventure` `heritage` `nightlife`

**Response:**
```json
{
  "success": true,
  "itinerary": {
    "city": "Kozhikode",
    "tagline": "Where the spice winds still carry centuries of trade",
    "weather_tip": "Light cotton — humid coastal air; carry water",
    "cost_estimate": "₹700–1000 for the day",
    "departure_alert": "Leave by 18:10 to reach Kozhikode Railway Station by 19:00",
    "items": [ ... ],
    "_meta": {
      "poisFound": 18,
      "travelMinsToStation": 25,
      "leaveBy": "18:10",
      "durationMs": 12400,
      "generatedAt": "2025-01-01T09:00:00Z"
    }
  }
}
```

**Validation errors return 400:**
```json
{
  "error": "Validation failed",
  "details": [
    "arrivalTime must be in HH:MM format (e.g. 09:00)",
    "You need at least 90 minutes between arrival and departure"
  ]
}
```

---

## Running Tests

```bash
# Start the server first
npm start

# In another terminal:
npm test            # all suites (includes a live Claude call ~15s)
node test.js health    # health suite only
node test.js geocode   # geocode suite only
node test.js validation  # validation suite only
node test.js itinerary  # full Claude call
```

Example output:
```
📋 Health check
  ✅ returns 200
  ✅ status is ok
  ✅ has model field
  ✅ has cache stats

📋 Validation — missing required fields
  ✅ returns 400
  ✅ has details array
  ✅ mentions dest
  ✅ mentions arrivalTime

📋 Itinerary — full generation (real Claude call, ~15s)
  ⏳ Calling Claude... (this takes ~10-20 seconds)
  ⏱️  Completed in 14382ms
  ✅ returns 200
  ✅ has city
  ✅ at least 5 stops
  ✅ last item is departure
  ...

──────────────────────────────────────────────────
Results: 32 passed, 0 failed
🎉 All tests passed!
```

---

## Caching

Geocoding, POI, and routing results are cached in memory (TTL: 6 hours for geo/POI, 1 hour for routes). This means:

- Repeat requests for the same city are ~1–2s faster
- Third-party free APIs are not hammered unnecessarily
- Cache stats exposed at `GET /api/health` and `GET /api/cache/stats`

Itinerary results from Claude are **not cached** — each call is unique creative output.

---

## Free APIs — Zero Cost

| API | Purpose | Key |
|-----|---------|-----|
| Browser Geolocation | GPS detection | None — native |
| Nominatim (OSM) | Geocoding | None |
| Overpass API | POIs — restaurants, beaches, temples | None |
| OSRM Public Server | Route + travel time | None |
| Claude API | Itinerary AI | Your Anthropic key |

---

## Environment Variables

```env
ANTHROPIC_API_KEY=sk-ant-xxx    # Required
PORT=3001                        # Default: 3001
ALLOWED_ORIGINS=https://mysite.com,https://www.mysite.com
CLAUDE_MODEL=claude-sonnet-4-20250514
RATE_LIMIT=20                   # req/IP/15min
LOG_LEVEL=info                  # debug|info|warn|error
NODE_ENV=production             # switches to JSON log output
```

---

## Requirements

- **Node.js ≥ 18.0.0** (native `fetch` — no `node-fetch` needed)
- **Anthropic API key** — [console.anthropic.com](https://console.anthropic.com)
