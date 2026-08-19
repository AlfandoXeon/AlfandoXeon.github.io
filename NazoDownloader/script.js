/**
 * Nazo Downloader - Promotional Landing Page Script
 * Pure Vanilla JavaScript • Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initMobileNav();
  initVersionsList();
  initDonationCopy();
  initSmoothScroll();
});

/* ─── 0. AOS (ANIMATE ON SCROLL) INIT ─── */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 550,
      once: true,
      easing: 'ease-out-cubic',
      offset: 40
    });
  }
}

/* ─── 1. MOBILE NAVIGATION TOGGLE ─── */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '☰';
    });
  });
}

/* ─── 2. VERSIONS ARCHIVE LIST LOADER ─── */
const FALLBACK_VERSIONS = [
  {
    "version": "v1.0.2",
    "releaseDate": "Agustus 2026",
    "status": "Latest",
    "size": "152.7 MB",
    "architecture": "Windows 10/11 (64-bit)",
    "changelog": [
      "Integrasi TikWM API (Download TikTok Full HD tanpa watermark & album foto)",
      "Peningkatan engine Instagram Reels dengan multi-browser session cookies resolver",
      "Dukungan Tema Dinamis (Dark Mode & Light Mode) tersimpan di database SQLite",
      "Desain Riwayat Unduhan baru dengan filter platform, status URL, dan pencarian instan",
      "Speedometer Analog Jaringan dengan visual dial & skala Mbps real-time",
      "Status Database di Pengaturan dengan opsi pembersihan aman menggunakan VACUUM"
    ],
    "downloadUrl": "https://github.com/AlfandoXeon/kumpulanMyAplikasi/releases/download/v1/NazoDownloader_Setup_v1.0.2.exe"
  }
];

async function initVersionsList() {
  const container = document.getElementById('versionsList');
  if (!container) return;

  let versions = FALLBACK_VERSIONS;

  try {
    const res = await fetch('versions.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        versions = data;
      }
    }
  } catch (e) {
    // Fallback data
  }

  container.innerHTML = versions.map(v => {
    const badgeClass = v.status.toLowerCase() === 'latest' ? 'badge-latest'
      : (v.status.toLowerCase() === 'stable' ? 'badge-stable' : 'badge-legacy');

    const changelogHtml = v.changelog.map(item => `<li>${item}</li>`).join('');

    return `
      <div class="version-item">
        <div class="version-header">
          <div class="version-identity">
            <span class="version-tag">${v.version}</span>
            <span class="badge-status ${badgeClass}">${v.status}</span>
            <div class="version-meta">
              <span>Rilis: ${v.releaseDate}</span>
              <span>Ukuran: ${v.size}</span>
              <span>OS: ${v.architecture}</span>
            </div>
          </div>
          <a href="${v.downloadUrl}" class="btn-sm-download" ${v.downloadUrl === '#' ? 'onclick="showDownloadTemplateAlert(event)"' : 'download'}>
            Download ${v.version}
          </a>
        </div>
        <ul class="version-changelog">
          ${changelogHtml}
        </ul>
      </div>
    `;
  }).join('');
}

function showDownloadTemplateAlert(e) {
  e.preventDefault();
  showToast("Link download template. Silakan ganti dengan URL rilis di versions.json");
}

/* ─── 3. DONATION COPY INTERACTION ─── */
function initDonationCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Nomor ${textToCopy} berhasil disalin.`);
        
        const originalText = btn.innerHTML;
        btn.innerHTML = `Tersalin`;
        btn.style.background = '#0078D4';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = '#0078D4';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      }).catch(() => {
        showToast(`Nomor: ${textToCopy}`);
      });
    });
  });
}

/* ─── 4. TOAST NOTIFICATION ─── */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${message}</span>`;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ─── 5. ACTIVE NAV HIGHLIGHT ON SCROLL ─── */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}
