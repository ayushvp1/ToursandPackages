/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║    Travel Itinerary Widget  —  itinerary-widget.js        ║
 * ║    Drop-in script for any website                         ║
 * ║                                                           ║
 * ║    Usage:                                                 ║
 * ║    <div id="itinerary-widget"></div>                      ║
 * ║    <script                                                ║
 * ║      src="/itinerary-widget.js?v=2.0.14"                  ║
 * ║      data-api-base="https://tours-and-packages.vercel.app" ║
 * ║      data-target="#itinerary-widget">                     ║
 * ║    </script>                                              ║
 * ╚═══════════════════════════════════════════════════════════╝
 */

(function () {
  "use strict";

  // ── Config ──────────────────────────────────────────────────
  const TARGET_SEL = "data-target" in document.currentScript.dataset 
    ? document.currentScript.dataset.target 
    : "#itinerary-widget";

  const script = document.currentScript;
  const state  = {
    dest:              "",
    currentPhase:      "welcome", // welcome | setup | loading | itinerary
    activeInterests:   [],
    dietaryPreference: "VEG",
    arrivalPoint:      "Railway Station",
    arrivalTime:       "09:00",
    departurePoint:    "Railway Station",
    departureTime:     "19:00",
  };

  // ── Inject Styles ───────────────────────────────────────────
  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    .tiw-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #0F172A !important; line-height: 1.5;
      background: #FFFFFF !important; border-radius: 20px;
      overflow: hidden; max-width: 800px; margin: 0 auto;
      box-shadow: 0 20px 50px rgba(0,0,0,0.08);
      border: 1px solid #F1F5F9;
      text-align: left;
    }

    /* CRITICAL: Force inputs to be visible in dark themes */
    .tiw-root input, .tiw-root select, .tiw-root textarea {
      background: #FFFFFF !important;
      color: #0F172A !important;
      border: 1px solid #E2E8F0 !important;
      font-family: inherit;
      -webkit-appearance: none;
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
    }
    .tiw-root input::placeholder {
      color: #94A3B8 !important;
    }

    .tiw-phase { display: none; }
    .tiw-phase.tiw-active { display: block; animation: tiw-fade .5s ease-out; }

    @keyframes tiw-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes tiw-pulse { 0% { opacity: .5; } 50% { opacity: 1; } 100% { opacity: .5; } }

    .tiw-btn-primary {
      background: #14B8A6; color: white !important; border: none;
      padding: .85rem 2rem; border-radius: 12px; font-weight: 700;
      cursor: pointer; transition: all .2s; font-size: .9rem;
      box-shadow: 0 4px 15px rgba(20,184,166,0.25);
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    }
    .tiw-btn-primary:hover:not(:disabled) { background: #0D9488; transform: translateY(-2px); }
    .tiw-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

    .tiw-btn-ghost {
      background: transparent; border: 1px solid #E2E8F0;
      padding: .65rem 1.25rem; border-radius: 10px; font-size: .8rem;
      font-weight: 600; cursor: pointer; color: #64748B !important;
    }

    .tiw-card {
      background: #F8FAFC; border: 1px solid #E2E8F0;
      border-radius: 18px; padding: 1.75rem;
    }

    .tiw-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 480px) { .tiw-grid-2 { grid-template-columns: 1fr; } }

    .tiw-timeline-item {
      display: flex; gap: 1rem; margin-bottom: 2.5rem;
      opacity: 0; transform: translateX(20px);
      transition: opacity .45s ease, transform .45s ease;
    }
    .tiw-timeline-item.tiw-visible { opacity: 1; transform: translateX(0); }

    .tiw-stop-card {
      flex: 1; background: #FFFFFF !important;
      border: 1px solid #E2E8F0; border-radius: 0 14px 14px 14px;
      padding: 1.5rem; border-left-width: 4px; border-left-style: solid;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .tiw-pill {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: .68rem; font-weight: 700; padding: 4px 10px;
      border-radius: 100px; text-transform: uppercase; letter-spacing: .06em;
    }

    .tiw-info-tag {
      display: flex; align-items: center; gap: 8px;
      padding: .85rem 1.25rem; border-radius: 12px; font-size: .8rem;
      font-weight: 600; width: 100%; margin-bottom: .5rem;
    }

    .tiw-interest-chip {
      cursor: pointer; padding: .45rem 1rem; border-radius: 100px;
      font-size: .85rem; font-weight: 600; border: 1px solid;
      transition: all .2s; user-select: none;
    }
    .tiw-interest-chip.active {
      background: rgba(20,184,166,.12) !important;
      border-color: rgba(20,184,166,.4); color: #14B8A6;
    }
    .tiw-interest-chip.inactive {
      background: #F8FAFC !important; border-color: #E2E8F0; color: #475569;
    }
    #tiw-map-container {
      width: 100%; height: 360px; border-radius: 14px; margin-bottom: 2.5rem;
      border: 1px solid #E2E8F0; overflow: hidden; position: relative;
      background: #F1F5F9; transition: all 0.3s ease;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
    }
    .leaflet-container { background: #F8FAFC !important; }
    .tiw-marker { cursor: pointer; transition: transform 0.2s ease; }
    .tiw-marker:hover { transform: scale(1.15); z-index: 10; }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = STYLES;
  document.head.appendChild(styleEl);

  // ── Category Definitions ────────────────────────────────────
  const CATEGORIES = {
    breakfast:  { emoji: "🍳", color: "#D97706", light: "rgba(217,119,6,.12)" },
    coffee:     { emoji: "☕", color: "#B45309", light: "rgba(180,83,9,.1)" },
    attraction: { emoji: "🏛️", color: "#3B82F6", light: "rgba(59,130,246,.1)" },
    activity:   { emoji: "🎭", color: "#10B981", light: "rgba(16,185,129,.1)" },
    lunch:      { emoji: "🍽️", color: "#EF4444", light: "rgba(239,68,68,.1)" },
    dinner:     { emoji: "🌙", color: "#8B5CF6", light: "rgba(139,92,246,.1)" },
    shopping:   { emoji: "🛍️", color: "#F59E0B", light: "rgba(245,158,11,.1)" },
    beach:      { emoji: "🏖️", color: "#06B6D4", light: "rgba(6,182,212,.1)" },
    transport:  { emoji: "🚗", color: "#64748B", light: "rgba(100,116,139,.1)" },
    departure:  { emoji: "🚂", color: "#F43F5E", light: "rgba(244,63,94,.12)" },
    temple:     { emoji: "🕌", color: "#A78BFA", light: "rgba(167,139,250,.1)" },
    museum:     { emoji: "🖼️", color: "#60A5FA", light: "rgba(96,165,250,.1)" },
  };
  const getCat = (c) => CATEGORIES[c] || CATEGORIES.attraction;

  // ── Interests List ──────────────────────────────────────────
  const ALL_INTERESTS = [
    { id: "nature",  label: "🌿 Nature" },
    { id: "culture", label: "🏛️ Culture" },
    { id: "food",    label: "🍲 Foodie" },
    { id: "shop",    label: "🛍️ Shopping" },
    { id: "photo",   label: "📸 Photo Spots" },
    { id: "peace",   label: "🧘 Peace" },
  ];

  // ── HTML Template ───────────────────────────────────────────
  function buildHTML() {
    return `
      <!-- PHASE: WELCOME -->
      <div id="tiw-ph-welcome" class="tiw-phase tiw-active" style="padding:4.5rem 2rem; text-align:center">
        <div style="font-size:3.5rem; margin-bottom:1.5rem">🌏</div>
        <h2 style="font-family:'Playfair Display',serif; font-size:2.5rem; margin-bottom:1.2rem; color:#0F172A">AI Trip Planner</h2>
        <p style="color:#64748B; margin-bottom:3rem; max-width:440px; margin-left:auto; margin-right:auto; font-size:1.1rem; line-height:1.6">
          Arriving at a station? We'll design your perfect day with curated stops, high-fidelity routing, and local gems.
        </p>
        <div style="display:flex; flex-direction:column; gap:1.2rem; align-items:center">
          <button class="tiw-btn-primary" id="tiw-btn-detect" style="min-width:240px">⚡ Map My Perfect Day</button>
          <button class="tiw-btn-ghost" id="tiw-btn-manual">Enter Destination Manually</button>
        </div>
      </div>

      <!-- PHASE: SETUP -->
      <div id="tiw-ph-setup" class="tiw-phase" style="padding:3rem 2rem">
        <h3 style="font-size:1.4rem; font-weight:800; margin-bottom:2.5rem; border-left:4px solid #14B8A6; padding-left:1.2rem; color:#0F172A">Plan Your Tour</h3>
        
        <div style="margin-bottom:2.5rem">
          <label style="display:block; font-size:.75rem; font-weight:800; text-transform:uppercase; color:#94A3B8; margin-bottom:.8rem; letter-spacing:.05em">Where are you heading?</label>
          <div style="position:relative">
            <input type="text" id="tiw-input-dest" placeholder="e.g. Kozhikode, Kerala" style="width:100%; padding:1.1rem 1.4rem; border-radius:14px; border:1px solid #E2E8F0; font-size:1.1rem; padding-right:55px; background:#fff !important">
            <button id="tiw-btn-re-detect" title="Auto-detect location" style="position:absolute; right:15px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:20px; transition:transform 0.2s">📍</button>
          </div>
        </div>

        <div class="tiw-grid-2" style="margin-bottom:2.5rem">
          <div>
            <label style="display:block; font-size:.75rem; font-weight:800; color:#94A3B8; margin-bottom:.8rem; text-transform:uppercase">Arrival Time</label>
            <input type="time" id="tiw-input-arr" value="09:00" style="width:100%; padding:1rem; border-radius:12px; border:1px solid #E2E8F0; background:#fff !important">
          </div>
          <div>
            <label style="display:block; font-size:.75rem; font-weight:800; color:#94A3B8; margin-bottom:.8rem; text-transform:uppercase">Departure Time</label>
            <input type="time" id="tiw-input-dep" value="19:00" style="width:100%; padding:1rem; border-radius:12px; border:1px solid #E2E8F0; background:#fff !important">
          </div>
        </div>

        <div style="margin-bottom:2.5rem">
          <label style="display:block; font-size:.75rem; font-weight:800; color:#94A3B8; margin-bottom:1.2rem; text-transform:uppercase">What's your mood?</label>
          <div id="tiw-interests" style="display:flex; flex-wrap:wrap; gap:.8rem"></div>
        </div>

        <div style="margin-bottom:3rem">
          <label style="display:block; font-size:.75rem; font-weight:800; color:#94A3B8; margin-bottom:1.2rem; text-transform:uppercase">Dietary Preference</label>
          <div id="tiw-dietary" style="display:flex; gap:.8rem"></div>
        </div>

        <button class="tiw-btn-primary" style="width:100%; padding:1.2rem; font-size:1.1rem" id="tiw-btn-generate">Generate Premium Itinerary</button>
      </div>

      <!-- PHASE: LOADING -->
      <div id="tiw-ph-loading" class="tiw-phase" style="padding:6rem 2rem; text-align:center">
        <div style="width:70px; height:70px; border:5px solid #F1F5F9; border-top-color:#14B8A6; border-radius:50%; animation:tiw-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; margin:0 auto 2.5rem"></div>
        <style>@keyframes tiw-spin { to { transform: rotate(360deg); } }</style>
        <h3 id="tiw-loading-title" style="font-size:1.6rem; font-weight:800; margin-bottom:.7rem; color:#0F172A">Crafting Your Vision...</h3>
        <p id="tiw-loading-sub" style="color:#64748B; font-size:1rem; max-width:320px; margin:0 auto">Our AI is mapping the best resorts, hidden cafes, and scenic spots for you.</p>
      </div>

      <!-- PHASE: ITINERARY -->
      <div id="tiw-ph-itinerary" class="tiw-phase">
        <div id="tiw-hero" style="background:linear-gradient(160deg,#F8FAFC 0%,#F1F5F9 100%);padding:3rem 2rem 3.5rem;text-align:center;border-bottom:1px solid #E2E8F0;position:relative;overflow:hidden">
          <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 50% 0%,rgba(20,184,166,0.08),transparent 70%);pointer-events:none"></div>
          <p id="tiw-eyebrow" style="color:#14B8A6;font-size:.75rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;margin-bottom:.6rem">Your Day in</p>
          <h2 id="tiw-city" style="font-family:'Playfair Display',serif;font-size:clamp(2rem,6vw,3.5rem);font-weight:700;color:#0F172A;margin-bottom:.6rem;line-height:1.1">—</h2>
          <p id="tiw-tagline" style="color:#334155;font-style:italic;font-size:1.1rem;margin-bottom:1.5rem;max-width:500px;margin-left:auto;margin-right:auto">—</p>
          <div id="tiw-pref-summary" style="display:flex;justify-content:center;gap:1.2rem;margin-bottom:2rem;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.15em;color:#94A3B8"></div>
          <div id="tiw-badges" style="display:flex;justify-content:center;gap:.8rem;flex-wrap:wrap;margin-bottom:1.2rem"></div>
          <div id="tiw-alert" style="display:none;margin:0 auto;max-width:480px;background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.15);border-radius:100px;padding:.6rem 1.4rem;font-size:.85rem;color:#E11D48;font-weight:600;display:inline-flex;align-items:center;gap:8px"></div>
        </div>
        <div style="max-width:680px;margin:0 auto;padding:2.5rem 1.5rem 5rem">
          <div id="tiw-map-container">
            <div id="tiw-map" style="width:100%; height:100%"></div>
          </div>
          <div style="position:relative">
            <div style="position:absolute;left:21px;top:15px;bottom:15px;width:2px;background:linear-gradient(to bottom, #14B8A6 0%, #E2E8F0 100%);opacity:.4"></div>
            <div id="tiw-timeline"></div>
          </div>
          <div style="text-align:center;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid #F1F5F9">
            <p style="color:#94A3B8;font-size:.8rem;margin-bottom:1.5rem;font-weight:500">Intelligently curated for you · Powered by AI & Mapbox</p>
            <button class="tiw-btn-ghost" id="tiw-btn-reset" style="padding:0.8rem 2rem">↩ Plan Another Trip</button>
          </div>
        </div>
      </div>
    `;
  }

  // ── Logic ───────────────────────────────────────────────────
  function showPhase(id) {
    document.querySelectorAll(".tiw-phase").forEach(p => p.classList.remove("tiw-active"));
    const el = document.getElementById(`tiw-ph-${id}`);
    if (el) el.classList.add("tiw-active");
    state.currentPhase = id;
  }

  function renderInterests(container) {
    if(!container) return;
    container.innerHTML = ALL_INTERESTS.map(i => `<div class="tiw-interest-chip ${state.activeInterests.includes(i.id) ? "active" : "inactive"}" data-id="${i.id}">${i.label}</div>`).join("");
  }
  function renderDietary(container) {
    if(!container) return;
    const opts = ["VEG", "NON-VEG"];
    container.innerHTML = opts.map(val => `<div class="tiw-interest-chip ${state.dietaryPreference === val ? "active" : "inactive"}" data-val="${val}">${val === "VEG" ? "🥗 Pure Veg" : "🍖 Non-Veg OK"}</div>`).join("");
  }

  async function detectLocation(root) {
    const btn = root.querySelector("#tiw-btn-detect");
    const orig = btn ? btn.innerHTML : "⚡ Map My Perfect Day";
    if (btn) { btn.innerHTML = "🛰️ Locating..."; btn.disabled = true; }
    try {
      const res = await fetch("https://ipapi.co/json/").catch(() => null);
      if (res && res.ok) {
        const d = await res.json();
        state.dest = d.city + (d.region ? `, ${d.region}` : "");
      } else if (navigator.geolocation) {
        // High-precision fallback
        const pos = await new Promise((rs, rj) => navigator.geolocation.getCurrentPosition(rs, rj, {timeout:5000})).catch(() => null);
        if (pos) {
          const apiBase = script.dataset.apiBase || "https://tours-and-packages.vercel.app";
          const rev = await fetch(`${apiBase}/api/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`).then(r => r.json()).catch(() => null);
          if (rev && rev.city) state.dest = rev.city;
        }
      }
    } finally {
      if (btn) { btn.innerHTML = orig; btn.disabled = false; }
      showPhase("setup");
      renderInterests(root.querySelector("#tiw-interests"));
      renderDietary(root.querySelector("#tiw-dietary"));
      const input = root.querySelector("#tiw-input-dest");
      if (input && state.dest) input.value = state.dest;
    }
  }

  async function generate(root) {
    state.dest = root.querySelector("#tiw-input-dest").value;
    state.arrivalTime = root.querySelector("#tiw-input-arr").value;
    state.departureTime = root.querySelector("#tiw-input-dep").value;
    if (!state.dest) return alert("Please specify a city!");

    showPhase("loading");
    try {
      const apiBase = script.dataset.apiBase || "https://tours-and-packages.vercel.app";
      const res = await fetch(`${apiBase}/api/itinerary`, {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...state, arrivalPoint: "Railway Station", departurePoint: "Railway Station"})
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      renderItinerary(root, data.itinerary || data);
    } catch (e) {
      alert("Something went wrong. Please try manual input.");
      showPhase("setup");
    }
  }

  function renderItinerary(root, data) {
    root.querySelector("#tiw-city").innerText = data.city;
    root.querySelector("#tiw-tagline").innerText = data.tagline;
    root.querySelector("#tiw-pref-summary").innerText = `${state.dietaryPreference} · ${state.activeInterests.join(" & ") || "EXPLORING"}`;
    root.querySelector("#tiw-badges").innerHTML = `
      <div class="tiw-pill" style="background:rgba(20,184,166,.08);color:#14B8A6;border:1px solid rgba(20,184,166,.15)">☔ ${data.weather_tip || "Check weather"}</div>
      <div class="tiw-pill" style="background:rgba(245,158,11,.08);color:#D97706;border:1px solid rgba(245,158,11,.15)">💰 ${data.cost_estimate || "Mid-range"}</div>
    `;
    const alertEl = root.querySelector("#tiw-alert");
    if(data.departure_alert) { alertEl.style.display = "inline-flex"; alertEl.innerHTML = `<span>🚨</span> ${data.departure_alert}`; }
    else alertEl.style.display = "none";

    const tl = root.querySelector("#tiw-timeline"); tl.innerHTML = "";
    (data.items || []).forEach((item, idx) => {
      const cat = getCat(item.category);
      const div = document.createElement("div"); div.className = "tiw-timeline-item";
      div.innerHTML = `
        <div style="width:42px; text-align:right; flex-shrink:0">
          <div style="width:12px; height:12px; border-radius:50%; background:${cat.color}; border:3px solid white; box-shadow:0 0 0 2px ${cat.light}; margin:8px 0 0 auto"></div>
          <div style="color:#64748B;font-size:.7rem;font-weight:700;margin-top:6px;text-align:right">${item.time}</div>
        </div>
        <div class="tiw-stop-card" style="border-left-color:${cat.color}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:0.8rem">
            <div>
              <span class="tiw-pill" style="background:${cat.light};color:${cat.color};margin-bottom:6px">${cat.emoji} ${item.category}</span>
              <h4 style="margin:0; font-size:1.15rem; font-weight:700; color:#0F172A">${item.title}</h4>
            </div>
            ${item.cost ? `<div style="background:#0F172A; color:#10B981; padding:4px 10px; border-radius:8px; font-size:.75rem; font-weight:800; border:1px solid #334155">${item.cost.replace('$', '₹')}</div>` : ""}
          </div>
          <p style="font-size:0.95rem; color:#475569; margin:0 0 1.2rem; line-height:1.6">${item.description}</p>
          <div style="border-radius:14px; overflow:hidden; height:220px; background:#F1F5F9; margin-bottom:1.2rem; border:1px solid #E2E8F0">
             <img src="https://loremflickr.com/800/600/${encodeURIComponent(item.title)},travel/all" style="width:100%; height:100%; object-fit:cover" loading="lazy">
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:1rem">
            ${item.must_try ? `<div class="tiw-info-tag" style="background:rgba(245,158,11,.05); color:#92400E; border:1px solid rgba(245,158,11,.1); margin:0"><span style="font-size:1.2rem">🥘</span> <b>Must Try:</b> ${item.must_try}</div>` : ""}
            ${item.tip ? `<div class="tiw-info-tag" style="background:rgba(16,185,129,.05); color:#065F46; border:1px solid rgba(16,185,129,.1); margin:0"><span style="font-size:1.2rem">💡</span> ${item.tip}</div>` : ""}
          </div>
          <div style="border-top:1px solid #F1F5F9; padding-top:1rem; display:flex; justify-content:space-between; align-items:center">
             <span style="font-size:0.75rem; color:#94A3B8; font-weight:600">🗺️ ${item.getting_there || "Walk or Cab"}</span>
             <a href="https://maps.google.com/?q=${item.lat},${item.lon}" target="_blank" style="color:#14B8A6; font-size:0.8rem; font-weight:800; text-decoration:none; display:flex; align-items:center; gap:5px">📍 GOOGLE MAPS</a>
          </div>
        </div>
      `;
      tl.appendChild(div);
      setTimeout(() => div.classList.add("tiw-visible"), idx * 150 + 100);
    });

    renderMap(root, data);
    showPhase("itinerary");
    setTimeout(() => mapInstance && mapInstance.resize(), 500);
    root.scrollIntoView({ behavior: "smooth" });
  }

  let mapInstance = null;
  function renderMap(root, data) {
    const items = (data.items || []).filter(i => !isNaN(parseFloat(i.lat)));
    const token = script.dataset.mapboxToken || "";
    const mapEl = root.querySelector("#tiw-map");
    if (!mapEl || !items.length) return;
    if (mapInstance) { if(typeof mapInstance.remove === 'function') mapInstance.remove(); mapInstance = null; }
    
    if (data._meta?.mapboxOverLimit) return renderLeaflet(mapEl, items);

    if (!window.mapboxgl) {
      const l = document.createElement("link"); l.rel="stylesheet"; l.href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"; document.head.appendChild(l);
      const s = document.createElement("script"); s.src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"; 
      s.onload = () => renderMap(root, data); document.head.appendChild(s);
      return;
    }
    mapboxgl.accessToken = token;
    mapInstance = new mapboxgl.Map({ container: mapEl, style: "mapbox://styles/mapbox/streets-v11", center: [parseFloat(items[0].lon), parseFloat(items[0].lat)], zoom: 12, attributionControl: false, preserveDrawingBuffer: true });
    
    mapInstance.on("load", async () => {
      const b = new mapboxgl.LngLatBounds();
      const coords = [];
      items.forEach(i => {
        const cat = getCat(i.category);
        const el = document.createElement('div');
        el.className = 'tiw-marker';
        el.innerHTML = `<div style="background:${cat.color};width:24px;height:24px;border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">${cat.emoji}</div>`;
        new mapboxgl.Marker(el).setLngLat([parseFloat(i.lon), parseFloat(i.lat)]).addTo(mapInstance);
        b.extend([parseFloat(i.lon), parseFloat(i.lat)]);
        coords.push(`${i.lon},${i.lat}`);
      });
      if (coords.length > 1) {
        try {
          const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coords.join(';')}?geometries=geojson&access_token=${token}`);
          const json = await res.json();
          if (json.routes?.[0]) {
            mapInstance.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry: json.routes[0].geometry }});
            mapInstance.addLayer({ id: 'route', type: 'line', source: 'route', paint: { 'line-color': '#14B8A6', 'line-width': 4, 'line-opacity': 0.8 }});
          }
        } catch(err){}
      }
      mapInstance.fitBounds(b, {padding: 60, maxZoom: 15});
      setTimeout(() => mapInstance.resize(), 500);
    });
  }

  function renderLeaflet(el, items) {
    if (!window.L) {
      const l = document.createElement("link"); l.rel="stylesheet"; l.href="https://unpkg.com/leaflet/dist/leaflet.css"; document.head.appendChild(l);
      const s = document.createElement("script"); s.src="https://unpkg.com/leaflet/dist/leaflet.js"; 
      s.onload = () => renderLeaflet(el, items); document.head.appendChild(s);
      return;
    }
    mapInstance = L.map(el, {attributionControl: false}).setView([items[0].lat, items[0].lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance);
    items.forEach(i => L.marker([i.lat, i.lon]).addTo(mapInstance));
    const group = new L.featureGroup(items.map(i => L.marker([i.lat, i.lon])));
    mapInstance.fitBounds(group.getBounds().pad(0.1));
  }

  function mount() {
    document.querySelectorAll(TARGET_SEL).forEach(root => {
      root.classList.add("tiw-root"); root.innerHTML = buildHTML();
      root.querySelector("#tiw-btn-detect").onclick = () => detectLocation(root);
      root.querySelector("#tiw-btn-manual").onclick = () => { showPhase("setup"); renderInterests(root.querySelector("#tiw-interests")); renderDietary(root.querySelector("#tiw-dietary")); };
      root.querySelector("#tiw-btn-re-detect")?.addEventListener("click", () => detectLocation(root));
      root.querySelector("#tiw-btn-generate").onclick = () => generate(root);
      root.querySelector("#tiw-btn-reset").onclick = () => showPhase("welcome");
      root.querySelector("#tiw-interests").onclick = e => { 
        if (e.target.dataset.id) { 
          const id = e.target.dataset.id; 
          if (state.activeInterests.includes(id)) state.activeInterests = state.activeInterests.filter(x => x !== id); 
          else state.activeInterests.push(id); 
          renderInterests(root.querySelector("#tiw-interests")); 
        } 
      };
      root.querySelector("#tiw-dietary").onclick = e => { 
        if (e.target.dataset.val) { 
          state.dietaryPreference = e.target.dataset.val; 
          renderDietary(root.querySelector("#tiw-dietary")); 
        } 
      };
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  window.TravelItineraryWidget = { mount };
})();
