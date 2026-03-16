# Tours & Package — Extraordinary Expeditions

A premium, modern travel and tourism web application equipped with an AI-powered trip planner. Built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Key Features

- **Parallax Hero Experience**: Immersive, multi-layer parallax entrance.
- **AI Trip Planner (New)**: A dynamic travel itinerary widget powered by **Groq AI** and OpenStreetMap.
  - Generates detailed, time-mapped schedules.
  - Real-time location detection.
  - **Dynamic Route Maps**: Visualizes your daily path with Leaflet.js.
- **Tour Listings**: Filterable grid of curated experiences.
- **Responsive & Premium UI**: Clean white-themed aesthetics with smooth micro-animations.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18 or higher.
- **Groq API Key**: Get a free key at [console.groq.com](https://console.groq.com/).

### 2. Installation
```bash
# Clone the repo
git clone <your-repo-url>
cd ToursandPackages

# Install all dependencies
npm install

# Set up your AI Key
# Open travel-itinerary-widget/.env and paste your key:
GROQ_API_KEY=your_key_here
```

### 3. Run Locally (Unified Command)
We've unified the frontend and the AI backend into one easy command:
```bash
npm run dev:all
```
- **Frontend**: http://localhost:5173
- **AI Widget Server**: http://localhost:3001

---

## 📦 Deployment

### Vercel (Recommended)
This project is configured for a seamless one-click deployment on Vercel.

1. **Connect GitHub**: Push your code to a GitHub repo and link it to Vercel.
2. **Environment Variables**: Add the following Secret in your Vercel Project Settings:
   - `GROQ_API_KEY`: Your actual Groq key.
3. **Automatic Routing**: The included `vercel.json` automatically configures the **Serverless Functions** to handle both the React SPA and the AI API.

### Project Structure
- `/src`: React frontend components and pages.
- `/travel-itinerary-widget`: Standalone Node.js/Express server for the AI planner.
- `/api`: Vercel Function bridge.

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion.
- **AI/Backend**: Node.js, Express, Groq (Llama 3.3), Leaflet.js (Mapping).
- **Data**: OpenStreetMap (POIs and Geocoding).
