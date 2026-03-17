/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║    Travel Itinerary Widget  —  itinerary-widget.js        ║
 * ║    Drop-in script for any website                         ║
 * ║                                                           ║
 * ║    Usage:                                                 ║
 * ║    <div id="itinerary-widget"></div>                      ║
 * ║    <script                                                ║
 * ║      src="/itinerary-widget.js?v=2.0.12"                  ║
 * ║      data-api-base="http://localhost:3001"               ║
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

    .tiw-root input {
      background: #FFFFFF !important;
      color: #0F172A !important;
      border: 1px solid #E2E8F0 !important;
      font-family: inherit;
      -webkit-appearance: none;
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
      display: flex; gap: 1rem; margin-bottom: 1.75rem;
      opacity: 0; transform: translateX(20px);
      transition: opacity .45s ease, transform .45s ease;
    }
    .tiw-timeline-item.tiw-visible { opacity: 1; transform: translateX(0); }

    .tiw-stop-card {
      flex: 1; background: #FFFFFF;
      border: 1px solid #E2E8F0; border-radius: 0 14px 14px 0;
      padding: 1.1rem 1.25rem; border-left-width: 3px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .tiw-pill {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: .68rem; font-weight: 700; padding: 3px 9px;
      border-radius: 100px; text-transform: uppercase; letter-spacing: .06em;
    }

    .tiw-info-tag {
      display: flex; align-items: center; gap: 8px;
      padding: .85rem 1.25rem; border-radius: 12px; font-size: .8rem;
      font-weight: 600; width: 100%; margin-bottom: .5rem;
    }

    .tiw-interest-chip {
      cursor: pointer; padding: .35rem .85rem; border-radius: 100px;
      font-size: .8rem; font-weight: 500; border: 1px solid;
      transition: all .2s; user-select: none;
    }
    .tiw-interest-chip.active {
      background: rgba(20,184,166,.12);
      border-color: rgba(20,184,166,.4); color: #14B8A6;
    }
    .tiw-interest-chip.inactive {
      background: transparent; border-color: #1E3A5F; color: #1E293B;
    }
    #tiw-map-container {
      width: 100%; height: 320px; border-radius: 14px; margin-bottom: 2rem;
      border: 1px solid #E2E8F0; overflow: hidden; position: relative;
      background: #F1F5F9;
    }
    .leaflet-container { background: #F8FAFC !important; }
    .tiw-marker { cursor: pointer; transition: transform 0.2s ease; }
    .tiw-marker:hover { transform: scale(1.1); }
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
      <div id="tiw-ph-welcome" class="tiw-phase tiw-active" style="padding:4rem 2rem; text-align:center">
        <div style="font-size:3rem; margin-bottom:1.5rem">🌏</div>
        <h2 style="font-family:'Playfair Display',serif; font-size:2.2rem; margin-bottom:1rem; color:#0F172A">AI Trip Planner</h2>
        <p style="color:#64748B; margin-bottom:2.5rem; max-width:400px; margin-left:auto; margin-right:auto">
          Arriving at a station? We'll design your perfect day with curated stops and 3D maps.
        </p>
        <div style="display:flex; flex-direction:column; gap:1rem; align-items:center">
          <button class="tiw-btn-primary" id="tiw-btn-detect">⚡ Map My Perfect Day</button>
          <button class="tiw-btn-ghost" id="tiw-btn-manual">Enter Destination Manually</button>
        </div>
      </div>

      <!-- PHASE: SETUP -->
      <div id="tiw-ph-setup" class="tiw-phase" style="padding:2.5rem 1.5rem">
        <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:2rem; border-left:4px solid #14B8A6; padding-left:1rem; color:#0F172A">Trip Details</h3>
        
        <div style="margin-bottom:2rem">
          <label style="display:block; font-size:.7rem; font-weight:800; text-transform:uppercase; color:#94A3B8; margin-bottom:.7rem">Where are you heading?</label>
          <div style="position:relative">
            <input type="text" id="tiw-input-dest" placeholder="e.g. Kozhikode, Kerala" style="width:100%; padding:.9rem 1.2rem; border-radius:12px; border:1px solid #E2E8F0; font-size:1rem; padding-right:45px">
            <button id="tiw-btn-re-detect" title="Auto-detect location" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:18px">📍</button>
          </div>
        </div>

        <div class="tiw-grid-2" style="margin-bottom:2rem">
          <div>
            <label style="display:block; font-size:.7rem; font-weight:800; color:#94A3B8; margin-bottom:.7rem">Arriving (at station)</label>
            <input type="time" id="tiw-input-arr" value="09:00" style="width:100%; padding:.8rem; border-radius:10px; border:1px solid #E2E8F0">
          </div>
          <div>
            <label style="display:block; font-size:.7rem; font-weight:800; color:#94A3B8; margin-bottom:.7rem">Departing (from station)</label>
            <input type="time" id="tiw-input-dep" value="19:00" style="width:100%; padding:.8rem; border-radius:10px; border:1px solid #E2E8F0">
          </div>
        </div>

        <div style="margin-bottom:2rem">
          <label style="display:block; font-size:.7rem; font-weight:800; color:#94A3B8; margin-bottom:1rem">What are you in the mood for?</label>
          <div id="tiw-interests" style="display:flex; flex-wrap:wrap; gap:.6rem"></div>
        </div>

        <div style="margin-bottom:2.5rem">
          <label style="display:block; font-size:.7rem; font-weight:800; color:#94A3B8; margin-bottom:1rem">Dietary Preference</label>
          <div id="tiw-dietary" style="display:flex; gap:.6rem"></div>
        </div>

        <button class="tiw-btn-primary" style="width:100%" id="tiw-btn-generate">Generate Premium Itinerary</button>
      </div>

      <!-- PHASE: LOADING -->
      <div id="tiw-ph-loading" class="tiw-phase" style="padding:5rem 2rem; text-align:center">
        <div style="width:60px; height:60px; border:4px solid #F1F5F9; border-top-color:#14B8A6; border-radius:50%; animation:tiw-spin 1s linear infinite; margin:0 auto 2rem"></div>
        <style>@keyframes tiw-spin { to { transform: rotate(360deg); } }</style>
        <h3 id="tiw-loading-title" style="font-size:1.4rem; font-weight:700; margin-bottom:.5rem; color:#0F172A">Crafting Your Vision...</h3>
        <p id="tiw-loading-sub" style="color:#64748B; font-size:.9rem">Our AI is mapping the best resorts, cafes, and spots for your day tour.</p>
      </div>

      <!-- PHASE: ITINERARY -->
      <div id="tiw-ph-itinerary" class="tiw-phase">
        <div id="tiw-hero" style="background:linear-gradient(160deg,#F8FAFC 0%,#F1F5F9 100%);padding:2.25rem 1.5rem 2.75rem;text-align:center;border-bottom:1px solid #E2E8F0;position:relative;overflow:hidden">
          <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 50% 0%,rgba(20,184,166,0.05),transparent 60%);pointer-events:none"></div>
          <p id="tiw-eyebrow" style="color:#14B8A6;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:.4rem">Your Day in</p>
          <h2 id="tiw-city" style="font-family:'Playfair Display',serif;font-size:clamp(1.8rem,5vw,3rem);font-weight:700;color:#0F172A;margin-bottom:.4rem">—</h2>
          <p id="tiw-tagline" style="color:#334155;font-style:italic;font-size:1rem;margin-bottom:.5rem">—</p>
          <div id="tiw-pref-summary" style="display:flex;justify-content:center;gap:.7rem;margin-bottom:1.5rem;font-size:.65rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#94A3B8"></div>
          <div id="tiw-badges" style="display:flex;justify-content:center;gap:.65rem;flex-wrap:wrap;margin-bottom:1rem"></div>
          <div id="tiw-alert" style="display:none;margin:0 auto;max-width:440px;background:rgba(244,63,94,.1);border:1px solid rgba(244,63,94,.25);border-radius:100px;padding:.45rem 1.1rem;font-size:.8rem;color:#FB7185;display:inline-flex;align-items:center;gap:5px"></div>
        </div>
        <div style="max-width:640px;margin:0 auto;padding:2rem 1rem 4rem">
          <div id="tiw-map-container">
            <div id="tiw-map" style="width:100%; height:320px"></div>
          </div>
          <div style="position:relative">
            <div style="position:absolute;left:20px;top:12px;bottom:12px;width:2px;background:linear-gradient(to bottom,#14B8A6,#E2E8F0);opacity:.3"></div>
            <div id="tiw-timeline"></div>
          </div>
          <div style="text-align:center;margin-top:2rem;padding-top:1.75rem;border-top:1px solid #F1F5F9">
            <p style="color:#94A3B8;font-size:.72rem;margin-bottom:1rem">Powered by AI & Mapbox Professionals — 10k Safe Edition</p>
            <button class="tiw-btn-ghost" id="tiw-btn-reset">↩ Plan Another Trip</button>
          </div>
        </div>
      </div>
    `;
  }

  // ── Phase Switching ──────────────────────────────────────────
  function showPhase(id) {
    document.querySelectorAll(".tiw-phase").forEach((p) => p.classList.remove("tiw-active"));
    const el = document.getElementById(`tiw-ph-${id}`);
    if (el) el.classList.add("tiw-active");
    state.currentPhase = id;
  }

  // ── Render Interest Chips ────────────────────────────────────
  function renderInterests(container) {
    container.innerHTML = ALL_INTERESTS.map((i) => {
      const active = state.activeInterests.includes(i.id);
      return `<div class="tiw-interest-chip ${active ? "active" : "inactive"}" data-id="${i.id}">${i.label}</div>`;
    }).join("");
  }

  // ── Render Dietary Chips ─────────────────────────────────────
  function renderDietary(container) {
    const options = ["VEG", "NON-VEG"];
    container.innerHTML = options.map((opt) => {
      const active = state.dietaryPreference === opt;
      return `<div class="tiw-interest-chip ${active ? "active" : "inactive"}" data-val="${opt}">${opt === "VEG" ? "🥗 Veg Only" : "🍖 Non-Veg OK"}</div>`;
    }).join("");
  }

  // ── API Interactions ─────────────────────────────────────────
  async function detectLocation(root) {
    const btn = root.querySelector("#tiw-btn-detect");
    const originalText = btn ? btn.innerHTML : "⚡ Map My Perfect Day";
    if (btn) {
      btn.innerHTML = "🛰️ Locating...";
      btn.disabled = true;
    }

    try {
      // Primary: ipinfo.io (no token = limited) or similar
      let data = null;
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) data = await res.json();
      } catch (e) {
        console.warn("ipapi.co failed, trying fallback");
        // Fallback: simple cloudflare cdn-cgi trace
        const res = await fetch("https://1.1.1.1/cdn-cgi/trace");
        if (res.ok) {
           // This is text based, harder to parse but reliable for IP. 
           // Let's stick to JSON ones for now.
        }
      }

      if (data && data.city) {
        state.dest = data.city + (data.region ? `, ${data.region}` : "");
        const input = root.querySelector("#tiw-input-dest");
        if (input) input.value = state.dest;
      } else {
         // Try Browser Geolocation as last resort (requires user permission)
         if ("geolocation" in navigator) {
            const pos = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
            }).catch(() => null);
            
            if (pos) {
              const apiBase = script.dataset.apiBase || "http://localhost:3001";
              const revRes = await fetch(`${apiBase}/api/geocode/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
              if (revRes.ok) {
                const revData = await revRes.json();
                state.dest = revData.city;
                const input = root.querySelector("#tiw-input-dest");
                if (input) input.value = state.dest;
              }
            }
         }
      }
    } catch (e) {
      console.warn("Location detection failed", e);
    } finally {
      if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
      showPhase("setup");
      renderInterests(root.querySelector("#tiw-interests"));
      renderDietary(root.querySelector("#tiw-dietary"));
      // Ensure values are refreshed in inputs
      const input = root.querySelector("#tiw-input-dest");
      if (input && state.dest) input.value = state.dest;
    }
  }

  async function generate(root) {
    state.dest = root.querySelector("#tiw-input-dest").value;
    state.arrivalTime = root.querySelector("#tiw-input-arr").value;
    state.departureTime = root.querySelector("#tiw-input-dep").value;

    if (!state.dest) {
      alert("Please enter a destination");
      return;
    }

    showPhase("loading");
    document.getElementById("tiw-loading-title").innerText = "Crafting Your Vision...";
    document.getElementById("tiw-loading-sub").innerText = "Our AI is mapping the best resorts, cafes, and spots for your day tour.";

    try {
      const apiBase = script.dataset.apiBase || "http://localhost:3001";
      const res = await fetch(`${apiBase}/api/itinerary`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          dest:              state.dest,
          arrivalTime:       state.arrivalTime,
          departureTime:     state.departureTime,
          interests:         state.activeInterests,
          dietaryPreference: state.dietaryPreference,
          arrivalPoint:      "Railway Station",
          departurePoint:    "Railway Station",
        }),
      });

      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      
      const itinerary = data.itinerary || data; 
      renderItinerary(root, itinerary);
    } catch (err) {
      alert(`Error: ${err.message}`);
      showPhase("setup");
    }
  }

  function renderItinerary(root, data) {
    root.querySelector("#tiw-city").innerText = data.city;
    root.querySelector("#tiw-tagline").innerText = data.tagline;
    root.querySelector("#tiw-pref-summary").innerText = `${state.dietaryPreference} · ${state.activeInterests.join(" & ") || "Exploration"}`;
    
    const badges = root.querySelector("#tiw-badges");
    badges.innerHTML = `
      <div style="background:rgba(20,184,166,.07); color:#14B8A6; border:1px solid rgba(20,184,166,.15); padding:6px 14px; border-radius:100px; font-size:.7rem; font-weight:700">☔ ${data.weather_tip || "Sunny"}</div>
      <div style="background:rgba(245,158,11,.07); color:#D97706; border:1px solid rgba(245,158,11,.15); padding:6px 14px; border-radius:100px; font-size:.7rem; font-weight:700">💰 ${data.cost_estimate || "Affordable"}</div>
    `;

    const alertEl = root.querySelector("#tiw-alert");
    if (data.departure_alert) {
      alertEl.style.display = "inline-flex";
      alertEl.innerHTML = `<span>🚨</span> ${data.departure_alert}`;
    } else {
      alertEl.style.display = "none";
    }

    const timeline = root.querySelector("#tiw-timeline");
    timeline.innerHTML = "";
    (data.items || []).forEach((item, idx) => {
      const cat = getCat(item.category);
      const div = document.createElement("div");
      div.className = "tiw-timeline-item";
      div.innerHTML = `
        <div style="width:42px; text-align:right">
          <div style="width:12px; height:12px; border-radius:50%; background:${cat.color}; border:2px solid white; box-shadow:0 0 0 2px ${cat.light}; margin:6px 0 0 auto"></div>
          <div style="color:#334155;font-size:.67rem;font-weight:600;margin-top:5px;text-align:center">${item.time}</div>
        </div>
        <div class="tiw-stop-card" style="border-left-color:${cat.color}; background:#FFFFFF">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.55rem">
            <div>
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:.3rem;flex-wrap:wrap">
                <span class="tiw-pill" style="background:${cat.light};color:${cat.color}">${cat.emoji} ${item.category || "visit"}</span>
                ${item.end_time ? `<span style="color:#1E3A5F;font-size:.68rem">→ ${item.end_time}</span>` : ""}
              </div>
              <h3 style="margin:0;font-size:.97rem;font-weight:600;color:#0F172A;line-height:1.3">${item.title}</h3>
              ${item.subtitle ? `<p style="margin:.12rem 0 0;font-size:.73rem;color:#334155">${item.subtitle}</p>` : ""}
            </div>
            ${item.cost ? `<div style="background:#060F1C;border:1px solid #1E3A5F;border-radius:7px;padding:3px 9px;font-size:.7rem;color:#34D399;white-space:nowrap;flex-shrink:0">${item.cost.replace(/\$/g, "₹")}</div>` : ""}
          </div>
          ${item.description ? `<p style="margin:.45rem 0 .65rem;font-size:.84rem;color:#1E293B;line-height:1.65">${item.description}</p>` : ""}
          <div style="margin: 1.2rem 0; border-radius: 20px; overflow: hidden; height: 200px; background: #F8FAFC; position: relative">
             <img src="https://loremflickr.com/800/600/${encodeURIComponent(item.title || "travel")},scenery/all" style="width:100%; height:100%; object-fit:cover">
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:.4rem">
            ${item.must_try ? `<div class="tiw-info-tag" style="background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.18);color:#FCD34D"><span style="font-size:12px">⭐</span>${item.must_try}</div>` : ""}
            ${item.tip ? `<div class="tiw-info-tag" style="background:rgba(20,184,166,.06);border:1px solid rgba(20,184,166,.15);color:#5EEAD4"><span style="font-size:12px">💡</span>${item.tip}</div>` : ""}
          </div>
          <div style="margin-top:.65rem;padding-top:.65rem;border-top:1px solid #F1F5F9;display:flex;flex-direction:column;gap:8px">
            ${item.getting_there ? `<div style="font-size:.72rem;color:#334155;display:flex;align-items:center;gap:4px"><span style="font-size:12px">🗺️</span>${item.getting_there}</div>` : ""}
            ${item.lat && item.lon ? `
              <a href="https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#14B8A6;text-decoration:none;font-weight:700;letter-spacing:0.02em;text-transform:uppercase">
                <span style="font-size:13px">📍</span> View on Google Maps
              </a>
            ` : ""}
          </div>
        </div>
      `;
      timeline.appendChild(div);
      setTimeout(() => div.classList.add("tiw-visible"), idx * 170 + 80);
    });

    renderMap(root, data);
    showPhase("itinerary");
    if (mapInstance && typeof mapInstance.resize === 'function') {
      setTimeout(() => mapInstance.resize(), 500);
    }
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  let mapInstance = null;
  function renderMap(root, data) {
    const items = data.items || [];
    const isOverLimit = data._meta?.mapboxOverLimit || false;
    const token = script?.dataset?.mapboxToken || "pk.eyJ1IjoiYXl1c2h2cDEiLCJhIjoiY204ZHB4NmI5MHZwejJxcTJkb3hncGdmdyJ9.y7fS-x_M5x7W-x_M5x7W-x_M5x7W-x";
    const mapEl = root.querySelector("#tiw-map");
    if (!mapEl) return;
    
    if (mapInstance) {
      if (typeof mapInstance.remove === 'function') mapInstance.remove();
      mapInstance = null;
      mapEl.innerHTML = "";
    }

    const validItems = items.filter(i => !isNaN(parseFloat(i.lat)) && !isNaN(parseFloat(i.lon)));
    if (!validItems.length) {
      root.querySelector("#tiw-map-container").style.display = "none";
      return;
    }
    root.querySelector("#tiw-map-container").style.display = "block";

    if (isOverLimit) renderLeafletMap(root, mapEl, validItems);
    else renderMapboxMap(root, mapEl, validItems, token, data);
  }

  function renderMapboxMap(root, mapEl, validItems, token, data) {
    if (!window.mapboxgl) {
      if (!document.getElementById('tiw-mapbox-js')) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
        document.head.appendChild(l);
        const s = document.createElement('script');
        s.id = 'tiw-mapbox-js';
        s.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js';
        s.onload = () => setTimeout(() => renderMap(root, data), 300);
        document.head.appendChild(s);
      } else setTimeout(() => renderMap(root, data), 300);
      return;
    }

    mapboxgl.accessToken = token;
    mapInstance = new mapboxgl.Map({
      container: mapEl,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [parseFloat(validItems[0].lon), parseFloat(validItems[0].lat)],
      zoom: 13,
      attributionControl: false,
      preserveDrawingBuffer: true
    });

    mapInstance.on('load', async () => {
      const bounds = new mapboxgl.LngLatBounds();
      const coords = [];
      validItems.forEach((item) => {
        const cat = getCat(item.category);
        const el = document.createElement('div');
        el.className = 'tiw-marker';
        el.innerHTML = `<div style="background:${cat.color}; width:24px; height:24px; border:2px solid #fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 2px 8px rgba(0,0,0,0.2)">${cat.emoji || "📍"}</div>`;
        new mapboxgl.Marker(el).setLngLat([parseFloat(item.lon), parseFloat(item.lat)]).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<b>${item.title}</b>`)).addTo(mapInstance);
        bounds.extend([parseFloat(item.lon), parseFloat(item.lat)]);
        coords.push(`${item.lon},${item.lat}`);
      });

      if (coords.length > 1) {
        try {
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords.join(';')}?geometries=geojson&overview=full&access_token=${token}`;
          const res = await fetch(url);
          const json = await res.json();
          if (json.routes?.[0]) {
            mapInstance.addSource('route', { 'type': 'geojson', 'data': { 'type': 'Feature', 'geometry': json.routes[0].geometry } });
            mapInstance.addLayer({ 'id': 'route', 'type': 'line', 'source': 'route', 'paint': { 'line-color': '#14B8A6', 'line-width': 4 } });
          }
        } catch (e) {}
      }
      mapInstance.fitBounds(bounds, { padding: 40 });
      setTimeout(() => mapInstance.resize(), 500);
    });
  }

  function renderLeafletMap(root, mapEl, validItems) {
    if (!window.L) {
       // ... simplified for breath
    }
  }

  function mount() {
    const targets = document.querySelectorAll(TARGET_SEL);
    targets.forEach((root) => {
      root.classList.add("tiw-root");
      root.innerHTML = buildHTML();

      root.querySelector("#tiw-btn-detect").addEventListener("click", () => detectLocation(root));
      root.querySelector("#tiw-btn-generate").addEventListener("click", () => generate(root));
      root.querySelector("#tiw-btn-manual").addEventListener("click", () => {
          showPhase("setup");
          renderInterests(root.querySelector("#tiw-interests"));
          renderDietary(root.querySelector("#tiw-dietary"));
      });
      root.querySelector("#tiw-btn-re-detect")?.addEventListener("click", () => detectLocation(root));
      root.querySelector("#tiw-interests").addEventListener("click", (e) => {
          const chip = e.target.closest(".tiw-interest-chip");
          if (!chip) return;
          const id = chip.dataset.id;
          if (state.activeInterests.includes(id)) state.activeInterests = state.activeInterests.filter(x => x !== id);
          else state.activeInterests.push(id);
          renderInterests(root.querySelector("#tiw-interests"));
      });
      root.querySelector("#tiw-dietary").addEventListener("click", (e) => {
          const chip = e.target.closest(".tiw-interest-chip");
          if (!chip) return;
          state.dietaryPreference = chip.dataset.val;
          renderDietary(root.querySelector("#tiw-dietary"));
      });
      root.querySelector("#tiw-btn-reset").addEventListener("click", () => showPhase("welcome"));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
  window.TravelItineraryWidget = { mount };
})();
