/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║    Travel Itinerary Widget  —  itinerary-widget.js        ║
 * ║    Drop-in script for any website                         ║
 * ║                                                           ║
 * ║    Usage:                                                 ║
 * ║    <div id="itinerary-widget"></div>                      ║
 * ║    <script                                                ║
 * ║      src="/widget/itinerary-widget.js"                   ║
 * ║      data-api-base="http://localhost:3001"               ║
 * ║      data-target="#itinerary-widget">                     ║
 * ║    </script>                                              ║
 * ╚═══════════════════════════════════════════════════════════╝
 */

(function () {
  "use strict";

  // ── Config ──────────────────────────────────────────────────
  const script = document.currentScript;
  const API_BASE = (script?.dataset?.hasOwnProperty('apiBase') ? script.dataset.apiBase : "http://localhost:3001").replace(/\/$/, "");
  const TARGET_SEL = script?.dataset?.target || "#itinerary-widget";

  // ── Inject Styles ────────────────────────────────────────────
  const STYLES = `
    @font-face {
      font-family: 'DM Sans';
      font-style: normal;
      font-weight: 400;
      src: url('https://fonts.gstatic.com/s/dmsans/v11/rP2Fp2K8fYIO6MuclL986v8.woff2') format('woff2');
    }
    @import url('https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css');

    .tiw-root *, .tiw-root *::before, .tiw-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .tiw-root {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: #FFFFFF;
      color: #0F172A;
      border-radius: 20px;
      overflow: hidden;
      min-height: 500px;
      position: relative;
      border: 1px solid #E2E8F0;
    }
    .tiw-root input, .tiw-root select, .tiw-root button { font-family: inherit; }
    .tiw-root ::-webkit-scrollbar { width: 4px; }
    .tiw-root ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }

    @keyframes tiw-fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes tiw-slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
    @keyframes tiw-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes tiw-pulse { 0%,100% { opacity:.4; } 50% { opacity:1; } }
    @keyframes tiw-glow { 0%,100% { box-shadow:0 0 6px rgba(20,184,166,.3); } 50% { box-shadow:0 0 18px rgba(20,184,166,.7); } }

    .tiw-fade-up { animation: tiw-fadeUp .5s ease forwards; }
    .tiw-phase { display: none; }
    .tiw-phase.tiw-active { display: block; }

    .tiw-btn-primary {
      background: linear-gradient(135deg, #14B8A6, #0D9488);
      color: #fff; border: none; border-radius: 100px;
      padding: .85rem 2rem; font-size: .95rem; font-weight: 600;
      cursor: pointer; letter-spacing: .02em; transition: transform .15s, box-shadow .15s;
    }
    .tiw-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(20,184,166,.35); }
    .tiw-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }

    .tiw-btn-ghost {
      background: transparent; border: 1px solid #1E3A5F;
      color: #334155; border-radius: 100px; padding: .6rem 1.5rem;
      font-size: .85rem; cursor: pointer; transition: border-color .2s, color .2s;
    }
    .tiw-btn-ghost:hover { border-color: #14B8A6; color: #14B8A6; }

    .tiw-inp {
      width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0;
      border-radius: 10px; padding: .7rem .95rem; color: #0F172A;
      font-size: .9rem; outline: none; transition: border-color .2s, box-shadow .2s;
      border: 1.5px solid #CBD5E1;
    }
    .tiw-inp:focus { border-color: #14B8A6; }
    .tiw-inp::placeholder { color: #94A3B8; }
    .tiw-inp::-webkit-calendar-picker-indicator { cursor: pointer; filter: invert(0.2) sepia(1) saturate(5) hue-rotate(175deg) brightness(0.7); opacity: 0.8; }

    .tiw-lbl {
      display: block; color: #020617; font-size: .72rem;
      font-weight: 700; text-transform: uppercase;
      letter-spacing: .09em; margin-bottom: .4rem;
    }

    .tiw-badge {
      display: inline-flex; align-items: center; gap: 5px;
      background: #F8FAFC; border: 1px solid #E2E8F0;
      border-radius: 100px; padding: .35rem .9rem;
      font-size: .78rem; color: #334155;
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
    .leaflet-tile {  }
    .leaflet-bar a { background: #FFFFFF !important; color: #020617 !important; border-color: #E2E8F0 !important; }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = STYLES;
  document.head.appendChild(styleEl);

  // ── Load Leaflet JS ─────────────────────────────────────────
  const scriptEl = document.createElement("script");
  scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  document.head.appendChild(scriptEl);

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
    { id: "food",      label: "🍴 Food" },
    { id: "culture",   label: "🏛️ Culture" },
    { id: "nature",    label: "🌿 Nature" },
    { id: "shopping",  label: "🛍️ Shopping" },
    { id: "beaches",   label: "🏖️ Beaches" },
    { id: "adventure", label: "🧗 Adventure" },
    { id: "heritage",  label: "🏯 Heritage" },
    { id: "nightlife", label: "🎶 Nightlife" },
    { id: "photography", label: "📸 Photography" },
  ];

  // ── Dietary List ─────────────────────────────────────────────
  const DIETARY_OPTIONS = [
    { id: "veg", label: "🥦 Veg Only" },
    { id: "non-veg", label: "🍗 Non-Veg Included" }
  ];

  // ── Widget State ─────────────────────────────────────────────
  const state = {
    activeInterests: ["food", "culture"],
    dietaryPreference: "non-veg",
    userCity: "",
    currentPhase: "welcome",
  };

  // ── HTML Template ────────────────────────────────────────────
  function buildHTML() {
    return `
      <!-- PHASE: WELCOME -->
      <div id="tiw-ph-welcome" class="tiw-phase tiw-active"
        style="min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem 1.5rem;text-align:center;position:relative;overflow:hidden">
        <div style="position:absolute;top:10%;left:10%;width:320px;height:320px;background:radial-gradient(circle,rgba(20,184,166,.07),transparent 65%);border-radius:50%;pointer-events:none"></div>
        <div style="position:absolute;bottom:10%;right:8%;width:260px;height:260px;background:radial-gradient(circle,rgba(245,158,11,.06),transparent 65%);border-radius:50%;pointer-events:none"></div>
        <div class="tiw-fade-up" style="max-width:460px">
          <div style="font-size:48px;margin-bottom:1.5rem;filter:drop-shadow(0 0 18px rgba(20,184,166,.4))">✈️</div>
          <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.2;margin-bottom:1rem">
            Your Day,<br><em style="color:#14B8A6">Perfectly Mapped.</em>
          </h2>
          <p style="color:#020617;font-size:.92rem;line-height:1.8;margin-bottom:2rem">
            Arriving by train? Tell us your window — we'll craft a beautifully time-mapped day and tell you exactly when to head back.
          </p>
          <button class="tiw-btn-primary" id="tiw-btn-detect" style="font-size:.95rem;padding:.9rem 2.2rem">
            📍 Detect My Location &amp; Begin
          </button>
          <div style="margin-top:1.5rem">
            <button class="tiw-btn-ghost" id="tiw-btn-manual" style="border-color:#E2E8F0;color:#64748B;font-size:.85rem;padding:.7rem 1.8rem">
              Skip & Enter Manually
            </button>
          </div>
          <p style="color:#1E3A5F;font-size:.72rem;margin-top:1.2rem;opacity:0.5">Location used once. Never stored.</p>
        </div>
      </div>

      <!-- PHASE: SETUP -->
      <div id="tiw-ph-setup" class="tiw-phase" style="padding:2rem 1.25rem">
        <div style="max-width:540px;margin:0 auto">
          <div style="text-align:center;margin-bottom:1.75rem;animation:tiw-fadeUp .4s ease">
            <p id="tiw-loc-label" style="color:#14B8A6;font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.4rem">📍 Ready</p>
            <h2 style="font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;margin-bottom:.3rem">Plan Your Day</h2>
            <p style="color:#334155;font-size:.85rem">Fill in the details and we'll handle the rest</p>
          </div>
          <div class="tiw-card" style="animation:tiw-fadeUp .5s ease .1s both">
            <div style="margin-bottom:1.1rem">
              <label class="tiw-lbl">Destination City</label>
              <input class="tiw-inp" id="tiw-dest" placeholder="e.g. Kozhikode, Kerala">
            </div>
            <div class="tiw-grid-2" style="margin-bottom:1.1rem">
              <div>
                <label class="tiw-lbl">Arrival Point</label>
                <input class="tiw-inp" id="tiw-arr-pt" placeholder="e.g. Railway Station">
              </div>
              <div>
                <label class="tiw-lbl">Departure Point</label>
                <input class="tiw-inp" id="tiw-dep-pt" placeholder="e.g. Railway Station">
              </div>
            </div>
            <div class="tiw-grid-2" style="margin-bottom:1.1rem">
              <div>
                <label class="tiw-lbl">I Arrive At</label>
                <input type="time" class="tiw-inp" id="tiw-arr-time" value="09:00">
              </div>
              <div>
                <label class="tiw-lbl">Train Departs At</label>
                <input type="time" class="tiw-inp" id="tiw-dep-time" value="19:00">
              </div>
            </div>
            <div style="margin-bottom:1.5rem">
              <label class="tiw-lbl">Dietary Preference</label>
              <div id="tiw-dietary" style="display:flex;gap:.45rem"></div>
            </div>
            <div style="margin-bottom:1.5rem">
              <label class="tiw-lbl">My Interests</label>
              <div id="tiw-interests" style="display:flex;flex-wrap:wrap;gap:.45rem"></div>
            </div>
            <div id="tiw-err" style="display:none;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;padding:.7rem 1rem;color:#F87171;font-size:.82rem;margin-bottom:1rem"></div>
            <button class="tiw-btn-primary" id="tiw-btn-generate" style="width:100%;padding:.95rem;font-size:.95rem">
              ✨ Generate My Itinerary
            </button>
          </div>
        </div>
      </div>

      <!-- PHASE: LOADING -->
      <div id="tiw-ph-loading" class="tiw-phase"
        style="min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center">
        <div id="tiw-load-icon" style="font-size:48px;margin-bottom:1.75rem;animation:tiw-spin 3s linear infinite">🗺️</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:1.7rem;margin-bottom:.75rem">Building Your Day...</h2>
        <p id="tiw-load-msg" style="color:#14B8A6;font-size:.9rem;margin-bottom:1.75rem;min-height:1.4em;animation:tiw-pulse 1.8s ease infinite"></p>
        <div style="width:min(100%,380px);background:#0A1628;border-radius:100px;height:4px;overflow:hidden;margin-bottom:2rem">
          <div id="tiw-load-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#14B8A6,#059669);border-radius:100px;transition:width .6s ease"></div>
        </div>
        <div style="display:flex;gap:1.75rem">
          ${["🍳 Food","🏛️ Culture","🎭 Activities","🚂 Return"].map((l, i) =>
            `<div id="tiw-le${i+1}" style="text-align:center;opacity:.2;transition:opacity .4s,transform .4s;transform:scale(.9)">
              <div style="font-size:26px">${l.split(" ")[0]}</div>
              <div style="font-size:.62rem;color:#334155;margin-top:4px">${l.split(" ").slice(1).join(" ")}</div>
            </div>`
          ).join("")}
        </div>
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
            <div id="tiw-map" style="width:100%; height:100%"></div>
          </div>
          <div style="position:relative">
            <div style="position:absolute;left:20px;top:12px;bottom:12px;width:2px;background:linear-gradient(to bottom,#14B8A6,#E2E8F0);opacity:.3"></div>
            <div id="tiw-timeline"></div>
          </div>
          <div style="text-align:center;margin-top:2rem;padding-top:1.75rem;border-top:1px solid #F1F5F9">
            <p style="color:#94A3B8;font-size:.72rem;margin-bottom:1rem">OpenStreetMap · OSRM · Groq AI — For guidance only</p>
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

    container.addEventListener("click", (e) => {
      const chip = e.target.closest(".tiw-interest-chip");
      if (!chip) return;
      const id = chip.dataset.id;
      if (state.activeInterests.includes(id)) {
        state.activeInterests = state.activeInterests.filter((x) => x !== id);
        chip.className = "tiw-interest-chip inactive";
      } else {
        state.activeInterests.push(id);
        chip.className = "tiw-interest-chip active";
      }
    });
  }

  // ── Render Dietary Options ───────────────────────────────────
  function renderDietary(container) {
    if (!container) return;
    container.innerHTML = DIETARY_OPTIONS.map((o) => {
      const active = state.dietaryPreference === o.id;
      return `<div class="tiw-interest-chip ${active ? "active" : "inactive"}" data-id="${o.id}">${o.label}</div>`;
    }).join("");

    container.addEventListener("click", (e) => {
      const chip = e.target.closest(".tiw-interest-chip");
      if (!chip) return;
      state.dietaryPreference = chip.dataset.id;
      container.querySelectorAll(".tiw-interest-chip").forEach(c => {
        c.className = c.dataset.id === state.dietaryPreference ? "tiw-interest-chip active" : "tiw-interest-chip inactive";
      });
    });
  }

  // ── Loading Progress ─────────────────────────────────────────
  function setLoad(msg, pct, step) {
    const msgEl = document.getElementById("tiw-load-msg");
    const bar = document.getElementById("tiw-load-bar");
    if (msgEl) msgEl.textContent = msg;
    if (bar) bar.style.width = pct + "%";
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`tiw-le${i}`);
      if (!el) continue;
      if (step >= i) { el.style.opacity = "1"; el.style.transform = "scale(1.1)"; }
      else { el.style.opacity = ".2"; el.style.transform = "scale(.9)"; }
    }
  }

  // ── Detect Location ──────────────────────────────────────────
  function detectLocation(root) {
    if (!navigator.geolocation) {
      showPhase("setup");
      renderInterests(root.querySelector("#tiw-interests"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const r = await fetch(`${API_BASE}/api/geocode/reverse?lat=${lat}&lon=${lon}`);
          const d = await r.json();
          state.userCity = d.city || "";
          const dest = root.querySelector("#tiw-dest");
          if (dest && d.city) dest.value = d.city;
          const lbl = root.querySelector("#tiw-loc-label");
          if (lbl) lbl.textContent = `📍 ${d.city || "Location detected"}`;
        } catch {
          /* silently continue */
        }
        showPhase("setup");
        renderInterests(root.querySelector("#tiw-interests"));
        renderDietary(root.querySelector("#tiw-dietary"));
      },
      () => {
        showPhase("setup");
        renderInterests(root.querySelector("#tiw-interests"));
        renderDietary(root.querySelector("#tiw-dietary"));
      }
    );
  }

  // ── Generate Itinerary ───────────────────────────────────────
  async function generate(root) {
    const dest     = root.querySelector("#tiw-dest")?.value.trim();
    const arrPt    = root.querySelector("#tiw-arr-pt")?.value.trim();
    const depPt    = root.querySelector("#tiw-dep-pt")?.value.trim();
    const arrTime  = root.querySelector("#tiw-arr-time")?.value;
    const depTime  = root.querySelector("#tiw-dep-time")?.value;
    const errEl    = root.querySelector("#tiw-err");

    if (!dest) {
      errEl.style.display = "block";
      errEl.textContent = "Please enter a destination city.";
      return;
    }
    errEl.style.display = "none";

    const btn = root.querySelector("#tiw-btn-generate");
    if (btn) btn.disabled = true;

    showPhase("loading");
    setLoad("Locating your destination...", 15, 0);

    try {
      setLoad("Fetching local attractions & restaurants...", 38, 1);
      await new Promise((r) => setTimeout(r, 400));

      setLoad("Calculating routes & travel time...", 58, 2);
      await new Promise((r) => setTimeout(r, 300));

      setLoad("AI crafting your perfect day...", 75, 3);

      const response = await fetch(`${API_BASE}/api/itinerary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dest,
          arrivalPoint:   arrPt   || dest,
          departurePoint: depPt   || dest,
          arrivalTime:    arrTime || "09:00",
          departureTime:  depTime || "19:00",
          interests: state.activeInterests,
          dietaryPreference: state.dietaryPreference,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Server error");

      setLoad("Putting the finishing touches...", 95, 4);
      await new Promise((r) => setTimeout(r, 500));

      renderItinerary(root, data.itinerary);
    } catch (err) {
      showPhase("setup");
      errEl.style.display = "block";
      errEl.textContent = `Error: ${err.message}`;
      if (btn) btn.disabled = false;
    }
  }

  // ── Render Itinerary ─────────────────────────────────────────
  function renderItinerary(root, data) {
    root.querySelector("#tiw-city").textContent   = data.city    || "Your Destination";
    root.querySelector("#tiw-tagline").textContent = data.tagline || "";

    // Badges
    const badges = [
      { icon: "⏰", text: data._meta ? `${data._meta.travelMinsToStation} min to station` : "—" },
      { icon: "💰", text: (data.cost_estimate || "—").replace(/\$/g, "₹") },
      { icon: "🌤️", text: data.weather_tip  || "Check weather" },
    ];
    root.querySelector("#tiw-badges").innerHTML = badges
      .map((b) => `<div class="tiw-badge"><span style="font-size:14px">${b.icon}</span>${b.text}</div>`)
      .join("");

    // Preference summary
    const diet = DIETARY_OPTIONS.find(o => o.id === state.dietaryPreference)?.label || "Standard";
    root.querySelector("#tiw-pref-summary").innerHTML = `
      <span>PREFERENCES:</span>
      <span style="color:#14B8A6">${diet}</span>
      <span>•</span>
      <span style="color:#14B8A6">${state.activeInterests.length} Interests</span>
    `;

    // Departure alert
    if (data.departure_alert) {
      const alertEl = root.querySelector("#tiw-alert");
      alertEl.style.display = "inline-flex";
      alertEl.innerHTML = `<span style="font-size:14px">🚨</span>${data.departure_alert}`;
    }

    // Timeline
    const timeline = root.querySelector("#tiw-timeline");
    timeline.innerHTML = "";
    (data.items || []).forEach((item, idx) => {
      const cat = getCat(item.category);
      const div = document.createElement("div");
      div.className = "tiw-timeline-item";
      div.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;min-width:42px;padding-top:2px">
          <div style="width:13px;height:13px;border-radius:50%;background:${cat.color};box-shadow:0 0 0 3px ${cat.color}22;flex-shrink:0;z-index:1;animation:tiw-glow 2.5s ease-in-out infinite ${idx * 0.12}s"></div>
          <div style="color:#334155;font-size:.67rem;font-weight:600;margin-top:5px;text-align:center">${item.time}</div>
        </div>
        <div class="tiw-stop-card" style="border-left-color:${cat.color}">
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
          ${(() => {
            const q = item.photo_query || item.title || "travel scenery";
            return `
            <div style="margin: 1.2rem 0; border-radius: 20px; overflow: hidden; height: 200px; background: #F8FAFC; position: relative; border: 1px solid #F1F5F9; box-shadow: inset 0 2px 10px rgba(0,0,0,0.02)">
              <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #94A3B8; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase">
                <span style="animation: tiw-pulse 1.5s infinite">📸 Gathering Vision...</span>
              </div>
              <img src="https://loremflickr.com/800/600/${encodeURIComponent(q)},travel/all"
                style="width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.8s ease"
                onload="this.style.opacity='1'; this.previousElementSibling.style.display='none'"
                onerror="this.src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'; this.style.opacity='1'; this.previousElementSibling.style.display='none'"
              />
            </div>`;
          })()}
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

    // Initialize Map
    renderMap(root, data);

    showPhase("itinerary");
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Render Map (Hybrid with Fallback) ──────────────────────
  let mapInstance = null;
  function renderMap(root, data) {
    const items = data.items || [];
    const isOverLimit = data._meta?.mapboxOverLimit || false;
    const token = script?.dataset?.mapboxToken || "pk.eyJ1IjoiYXl1c2h2cDEiLCJhIjoiY204ZHB4NmI5MHZwejJxcTJkb3hncGdmdyJ9.y7fS-x_M5x7W-x_M5x7W-x_M5x7W-x";

    const mapEl = root.querySelector("#tiw-map");
    if (!mapEl) return;
    
    // Clear previous map instance reliably
    if (mapInstance) {
      if (typeof mapInstance.remove === 'function') mapInstance.remove();
      mapInstance = null;
      mapEl.innerHTML = "";
    }

    const validItems = items.filter(i => i.lat && i.lon);
    if (!validItems.length) {
      root.querySelector("#tiw-map-container").style.display = "none";
      return;
    }
    root.querySelector("#tiw-map-container").style.display = "block";

    if (isOverLimit) {
      renderLeafletMap(root, mapEl, validItems);
    } else {
      renderMapboxMap(root, mapEl, validItems, token);
    }
  }

  function renderMapboxMap(root, mapEl, validItems, token) {
    if (!window.mapboxgl) {
      if (!document.getElementById('tiw-mapbox-js')) {
        const s = document.createElement('script');
        s.id = 'tiw-mapbox-js';
        s.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js';
        s.onload = () => renderMap(root, { items: validItems });
        document.head.appendChild(s);
      } else {
        setTimeout(() => renderMap(root, { items: validItems }), 200);
      }
      return;
    }

    mapboxgl.accessToken = token;
    mapInstance = new mapboxgl.Map({
      container: mapEl,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [parseFloat(validItems[0].lon), parseFloat(validItems[0].lat)],
      zoom: 12,
      attributionControl: false
    });

    mapInstance.on('load', () => {
      const bounds = new mapboxgl.LngLatBounds();
      const coords = [];

      validItems.forEach((item) => {
        const cat = getCat(item.category);
        const markerEmoji = cat.emoji || "📍";
        
        const el = document.createElement('div');
        el.className = 'tiw-marker';
        el.innerHTML = `<div style="background:${cat.color}; width:28px; height:28px; border:2px solid #fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 4px 10px rgba(0,0,0,0.25); cursor:pointer">${markerEmoji}</div>`;

        new mapboxgl.Marker(el)
          .setLngLat([parseFloat(item.lon), parseFloat(item.lat)])
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<b style="color:#0F172A; font-family:sans-serif">${item.time} - ${item.title}</b><br><span style="color:#64748B; font-size:11px">${item.category}</span>`))
          .addTo(mapInstance);

        bounds.extend([parseFloat(item.lon), parseFloat(item.lat)]);
        coords.push([parseFloat(item.lon), parseFloat(item.lat)]);
      });

      if (coords.length > 1) {
        mapInstance.addSource('route', {
          'type': 'geojson',
          'data': { 'type': 'Feature', 'geometry': { 'type': 'LineString', 'coordinates': coords } }
        });
        mapInstance.addLayer({
          'id': 'route', 'type': 'line', 'source': 'route',
          'layout': { 'line-join': 'round', 'line-cap': 'round' },
          'paint': { 'line-color': '#14B8A6', 'line-width': 4, 'line-opacity': 0.6, 'line-dasharray': [1, 2] }
        });
      }
      mapInstance.fitBounds(bounds, { padding: 40, animate: true });
    });
  }

  function renderLeafletMap(root, mapEl, validItems) {
    if (!window.L) {
      if (!document.getElementById('tiw-leaflet-js')) {
        const s = document.createElement('script');
        s.id = 'tiw-leaflet-js';
        s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        s.onload = () => renderMap(root, { items: validItems, _meta: { mapboxOverLimit: true } });
        document.head.appendChild(s);
        
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(l);
      } else {
        setTimeout(() => renderMap(root, { items: validItems, _meta: { mapboxOverLimit: true } }), 200);
      }
      return;
    }

    const coords = validItems.map(i => [parseFloat(i.lat), parseFloat(i.lon)]);
    mapInstance = L.map(mapEl, { scrollWheelZoom: false, attributionControl: false }).setView(coords[0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);

    validItems.forEach((item) => {
      const cat = getCat(item.category);
      const icon = L.divIcon({
        html: `<div style="background:${cat.color}; width:24px; height:24px; border:2px solid #fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; box-shadow:0 0 10px rgba(0,0,0,0.5)">${cat.emoji || "📍"}</div>`,
        className: '', iconSize: [24, 24], iconAnchor: [12, 12]
      });
      L.marker([item.lat, item.lon], { icon }).addTo(mapInstance)
        .bindPopup(`<b style="color:#060F1C">${item.time} - ${item.title}</b><br><span style="color:#475569; font-size:11px">${item.category}</span>`);
    });

    if (coords.length > 1) {
      L.polyline(coords, { color: '#14B8A6', weight: 3, opacity: 0.6, dashArray: '5, 10' }).addTo(mapInstance);
    }
    mapInstance.fitBounds(L.latLngBounds(coords), { padding: [30, 30] });
  }

  // ── Mount Widget ─────────────────────────────────────────────
  function mount() {
    const targets = document.querySelectorAll(TARGET_SEL);
    if (!targets.length) {
      console.warn(`[itinerary-widget] No element found for selector: "${TARGET_SEL}"`);
      return;
    }

    targets.forEach((root) => {
      root.classList.add("tiw-root");
      root.innerHTML = buildHTML();

      // Welcome button
      root.querySelector("#tiw-btn-detect").addEventListener("click", () => detectLocation(root));

      // Generate button
      root.querySelector("#tiw-btn-generate").addEventListener("click", () => generate(root));

      // Manual button
      root.querySelector("#tiw-btn-manual").addEventListener("click", () => {
        showPhase("setup");
        renderInterests(root.querySelector("#tiw-interests"));
        renderDietary(root.querySelector("#tiw-dietary"));
      });

      // Reset button
      root.querySelector("#tiw-btn-reset").addEventListener("click", () => {
        root.querySelector("#tiw-timeline").innerHTML = "";
        showPhase("welcome");
        root.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // Mount when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  // Public API for advanced use
  window.TravelItineraryWidget = { mount };
})();
