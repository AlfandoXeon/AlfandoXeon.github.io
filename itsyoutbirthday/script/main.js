/**
 * Engine — membaca CONFIG, memuat komponen dinamis, me-render & mengorkestrasi animasi GSAP.
 */

// ── Tema ────────────────────────────────────────────────────────
let currentMode = CONFIG.defaultMode || "dark";

function applyTheme(mode) {
  currentMode = mode;
  const root = document.documentElement;
  const c = CONFIG.colors || {};

  root.style.setProperty("--primary", c.primary || "#f43f5e");
  root.style.setProperty("--accent", c.accent || "#8b5cf6");

  const theme = c[mode] || c.dark || {};
  root.style.setProperty("--bg", theme.background || "#0b0f19");
  root.style.setProperty("--text", theme.text || "#f8fafc");

  // Update toggle icon
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.innerHTML = mode === "dark" ? "☀️" : "🌙";
}

function createThemeToggle() {
  if (document.getElementById("theme-toggle")) return;
  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.title = "Ganti Mode Gelap / Terang";
  btn.innerHTML = currentMode === "dark" ? "☀️" : "🌙";
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
  btn.innerHTML = `
    <div class="music-disc">🎵</div>
    <span class="music-label">Musik</span>
  `;

  const updateState = () => {
    if (!audio) return;
    if (audio.paused) {
      btn.classList.remove("playing");
      btn.querySelector(".music-disc").innerHTML = "🔇";
      btn.querySelector(".music-label").textContent = "Mute";
    } else {
      btn.classList.add("playing");
      btn.querySelector(".music-disc").innerHTML = "🎵";
      btn.querySelector(".music-label").textContent = "Putar";
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
    // Check if script already loaded
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

// ── Main Initializer ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  applyTheme(currentMode);
  createThemeToggle();

  // Set music source
  const audio = document.querySelector(".song");
  if (audio && CONFIG.music) {
    const source = audio.querySelector("source");
    if (source) source.src = CONFIG.music;
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

  // Render all sections
  const container = document.querySelector(".container");
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

  // SweetAlert music prompt dalam Bahasa Indonesia yang romantis
  const isDark = currentMode === "dark";
  Swal.fire({
    title: "Putar Musik Pengiring? 🎶",
    html: `<p style="font-size: 0.95rem; line-height: 1.6; opacity: 0.85;">Ada alunan melodi manis untuk menemani perayaan ulang tahunmu ke-24 hari ini ❤️</p>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: CONFIG.colors?.primary || "#f43f5e",
    cancelButtonColor: isDark ? "#475569" : "#94a3b8",
    confirmButtonText: "Iya, Putar Musik! ✨",
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
        console.warn("Autoplay audio dicegah oleh browser:", err);
      });
    }
    buildTimeline(rendered, audio);
  });
});

// ── Timeline Builder ─────────────────────────────────────────────
function buildTimeline(rendered, audio) {
  const tl = gsap.timeline();

  tl.to(".container", { duration: 0.6, visibility: "visible" });

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

  // Setup replay button listener
  const setupReplay = () => {
    const replayBtn = document.getElementById("replay");
    if (replayBtn) {
      replayBtn.onclick = () => {
        // Reset any custom styles applied directly
        document.querySelectorAll(".section").forEach((sec) => {
          sec.style.position = "";
          sec.style.zIndex = "";
          sec.style.pointerEvents = "";
        });
        if (audio && audio.paused) {
          audio.play().catch(() => {});
        }
        tl.restart();
      };
    }
  };

  setupReplay();
  tl.eventCallback("onComplete", setupReplay);
}
