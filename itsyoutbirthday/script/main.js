/**
 * Engine Utama — membaca CONFIG, memuat komponen, me-render & mengorkestrasi animasi GSAP.
 */

// ── Tema ────────────────────────────────────────────────────────
let currentMode = CONFIG.defaultMode || "dark";

function applyTheme(mode) {
  currentMode = mode;
  const root = document.documentElement;
  const c = CONFIG.colors || {};

  root.style.setProperty("--primary", c.primary || "#f43f5e");
  root.style.setProperty("--accent", c.accent || "#a855f7");

  const theme = c[mode] || c.dark || {};
  root.style.setProperty("--bg", theme.background || "#090d16");
  root.style.setProperty("--text", theme.text || "#f8fafc");

  // Update toggle icon
  const btn = document.getElementById("theme-toggle");
  if (btn && window.Icons) {
    btn.innerHTML = mode === "dark" ? window.Icons.sun(20) : window.Icons.moon(20);
  }
}

function createThemeToggle() {
  if (document.getElementById("theme-toggle")) return;
  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.title = "Ganti Mode Gelap / Terang";
  btn.innerHTML = currentMode === "dark" ? (window.Icons ? window.Icons.sun(20) : "☀️") : (window.Icons ? window.Icons.moon(20) : "🌙");
  btn.addEventListener("click", () => {
    applyTheme(currentMode === "dark" ? "light" : "dark");
  });
  document.body.appendChild(btn);
}

// ── Floating Music Controller ────────────────────────────────────
function createMusicController(audio) {
  if (document.getElementById("music-controller")) return;

  const btn = document.createElement("button");
  btn.id = "music-controller";
  btn.title = "Nyalakan / Jeda Musik";
  const musicIcon = window.Icons ? window.Icons.music(16) : "🎵";

  btn.innerHTML = `
    <div class="music-disc">${musicIcon}</div>
    <span class="music-label">Musik</span>
  `;

  const updateState = () => {
    if (!audio) return;
    const disc = btn.querySelector(".music-disc");
    const label = btn.querySelector(".music-label");
    if (audio.paused) {
      btn.classList.remove("playing");
      disc.innerHTML = window.Icons ? window.Icons.mute(16) : "🔇";
      label.textContent = "Mute";
    } else {
      btn.classList.add("playing");
      disc.innerHTML = window.Icons ? window.Icons.music(16) : "🎵";
      label.textContent = "Putar";
    }
  };

  btn.addEventListener("click", () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(updateState).catch(() => {});
    } else {
      audio.pause();
      updateState();
    }
  });

  audio.addEventListener("play", updateState);
  audio.addEventListener("pause", updateState);

  document.body.appendChild(btn);
  updateState();
}

// ── Script Loader ────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Komponen tidak ditemukan: " + src));
    document.head.appendChild(s);
  });
}

// ── State Global Presentation ───────────────────────────────────
let currentTimeline = null;
let globalAudio = null;

// ── Main Initializer ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  applyTheme(currentMode);
  createThemeToggle();

  // Set music source (knt.mp4)
  const audio = document.querySelector(".song");
  globalAudio = audio;
  if (audio && CONFIG.music) {
    audio.src = CONFIG.music;
    audio.load();
  }

  createMusicController(audio);

  // Determine unique component types
  const types = [...new Set(CONFIG.sections.map((s) => s.type))];

  // Dynamically load component scripts
  for (const type of types) {
    try {
      await loadScript(`./script/components/${type}.js`);
    } catch (e) {
      console.warn(e.message);
    }
  }

  // SweetAlert dialog estetik tanpa emoji mentah
  const isDark = currentMode === "dark";
  Swal.fire({
    title: "Putar Musik Pengiring?",
    html: `<p style="font-size: 0.95rem; line-height: 1.6; opacity: 0.85;">Alunan melodi siap menemani perayaan ulang tahunmu ke-24 hari ini.</p>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: CONFIG.colors?.primary || "#f43f5e",
    cancelButtonColor: isDark ? "#475569" : "#94a3b8",
    confirmButtonText: "Putar Musik",
    cancelButtonText: "Nanti Saja",
    background: isDark ? "#111827" : "#ffffff",
    color: isDark ? "#f8fafc" : "#1e293b",
    allowOutsideClick: false,
    customClass: {
      popup: "romantic-swal-popup",
      title: "romantic-swal-title",
      confirmButton: "romantic-swal-confirm",
      cancelButton: "romantic-swal-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed && audio) {
      audio.play().catch((err) => {
        console.warn("Autoplay audio dicegah browser:", err);
      });
    }
    runPresentation();
  });
});

// ── Render & Jalankan Presentasi Bersih (Pencegah Bug Layar Kosong) ────
function runPresentation() {
  // 1. Hentikan timeline lama dan bersihkan semua animasi GSAP
  if (currentTimeline) {
    currentTimeline.kill();
    currentTimeline = null;
  }
  gsap.killTweensOf("*");

  // 2. Bersihkan container DOM agar tidak ada inline styles atau event listener yang bertabrakan
  const container = document.querySelector(".container");
  container.innerHTML = "";
  container.style.visibility = "visible";

  // 3. Render ulang semua bagian secara segar
  const rendered = [];
  CONFIG.sections.forEach((section) => {
    const comp = window.Components && window.Components[section.type];
    if (!comp) {
      console.warn(`Komponen "${section.type}" tidak ditemukan, dilewati.`);
      return;
    }
    const el = comp.render(container, section, CONFIG);
    rendered.push({ el, comp, section });
  });

  // 4. Bangun timeline GSAP segar
  currentTimeline = buildTimeline(rendered);
}

// ── Timeline Builder ─────────────────────────────────────────────
function buildTimeline(rendered) {
  const tl = gsap.timeline();

  tl.to(".container", { duration: 0.4, visibility: "visible" });

  // Track deferred exits for overlay components
  let deferredExits = [];

  rendered.forEach(({ el, comp, section }, i) => {
    const isOverlay = comp.overlay === true;

    // Flush deferred exits before non-overlay sections
    if (!isOverlay && deferredExits.length > 0) {
      deferredExits.forEach((fn) => fn());
      deferredExits = [];
    }

    // Animate section
    comp.animate(tl, el, CONFIG);

    // Handle exit lifecycle
    if (comp.exit) {
      const next = rendered[i + 1];
      const nextIsOverlay = next && next.comp && next.comp.overlay === true;

      if (nextIsOverlay) {
        deferredExits.push(() => comp.exit(tl, el));
      } else if (!isOverlay) {
        comp.exit(tl, el);
      }
    }
  });

  // Flush remaining
  deferredExits.forEach((fn) => fn());

  // Setup replay button listener secara terisolasi dan bersih
  const bindReplay = () => {
    const replayBtn = document.getElementById("replay");
    if (replayBtn) {
      replayBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (globalAudio && globalAudio.paused) {
          globalAudio.play().catch(() => {});
        }
        runPresentation();
      };
    }
  };

  bindReplay();
  tl.eventCallback("onComplete", bindReplay);

  return tl;
}
