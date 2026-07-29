const wkwk = "hy"



// ===== CONFIGURATION =====
const WA_NUMBER = '6285764175824';

// ===== TIME-BASED GREETING =====
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'Pagi';
  if (hour >= 11 && hour < 15) return 'Siang';
  if (hour >= 15 && hour < 18) return 'Sore';
  return 'Malam';
}

// ===== SLIDES DATA =====
const slides = [
  {
    id: 'intro',
    type: 'greeting',
    label: 'FROM TYO ALFANDO',
    title: `Hallo Bel..`,
    subtitle: `Selamat ${getGreeting()}`,
    text: 'Aku ada mau ngomong sesuatu sama kamu bel...',
    buttons: [
      { text: 'Lanjut', icon: '→', style: 'primary-red', action: 'next' }
    ]
  },
  {
    id: 'confession-1',
    type: 'text',
    label: 'FROM TYO ALFANDO',
    title: 'Jujur bel..',
    text: 'Aku tuh sebenarnya ada rasa suka bel sama kamu..\n\nUdah lumayan lama sih, dari pertama kenal dulu..\n\nKamu baik, kamu imut, kamu lucu, cara bicara mu soft..\n\nDan mungkin ada banyak hal yang ga bisa aku jelasin dengan kata kata, untuk menjelaskan alasan ku tertarik ke kamu.',
    buttons: [
      { text: 'Lanjut', icon: '→', style: 'primary-red', action: 'next' }
    ]
  },
  {
    id: 'confession-2',
    type: 'text',
    label: 'FROM TYO ALFANDO',
    title: 'Tapi..',
    text: 'Sebelumnya mungkin aku memang belum kenal kamu lebih dalam..\n\nAku juga masih belum tau tentang kisah relationship mu yang sebelumnya..\n\nAtau jangan jangan kamu punya pacar sekarang...',
    textClass: 'has-red-ending',
    buttons: [
      { text: 'Lanjut', icon: '→', style: 'primary-red', action: 'next' }
    ]
  },
  {
    id: 'status-check',
    type: 'choice',
    label: 'PERTANYAAN',
    title: 'So..',
    text: 'Boleh tau ga bel, status kamu sekarang gimana?',
    buttons: [
      { text: 'Aku sudah punya pacar tyo..', icon: '', style: 'outline', action: 'has-partner' },
      { text: 'Aku tidak terikat dengan siapapun', icon: '', style: 'primary-red', action: 'single' }
    ]
  },
  {
    id: 'has-partner',
    type: 'rejection-partner',
    label: 'MAAF',
    title: 'Oalah..',
    text: 'Wkwkwk.. Maaf ya bel, ku kira kamu masih single..\n\nYauda deh anggep aja suratku angin lalu..',
    buttons: [
      { text: 'Konfirmasi, aku sudah punya pacar', icon: '', style: 'whatsapp', action: 'wa-has-partner' }
    ]
  },
  {
    id: 'single-relief',
    type: 'text',
    label: 'LEGA',
    title: 'Ohh syukur deh..',
    text: 'Kalo masih single kwkwkw\n\nOke lanjut ya bel..',
    buttons: [
      { text: 'Lanjut', icon: '→', style: 'primary-red', action: 'next-from-single' }
    ]
  },
  {
    id: 'confession-3',
    type: 'text',
    label: 'FROM TYO ALFANDO',
    title: 'Bel..',
    text: 'Aku juga masih belum tau bel, pandangan mu tentang aku bagaimana..\n\nDan aku juga tidak terlalu mempermasalahkan pandangan mu tentang aku..\n\nAku juga tidak mempermasalahkan apakah kamu menerima confess ku atau tidak..\n\nTapi hari ini aku mencoba untuk memberanikan diri untuk menembak mu bel dan <span class="text-pink">confess</span>.',
    buttons: [
      { text: 'Lanjut', icon: '→', style: 'primary-red', action: 'next' }
    ]
  },
  {
    id: 'final',
    type: 'final',
    label: 'CONFESS',
    title: 'Aku menyukai mu bel..',
    text: 'Ada rasa yang berbeda ketika aku bersamamu.\n\nJadi apakah kamu menerima confess ku ini...',
    note: 'nanti otomatis mengarah ke WhatsApp ku yaa bel',
    buttons: [
      { text: 'Maaf, aku belum bisa..', icon: '', style: 'danger-confess', action: 'reject' },
      { text: 'Terima / Jalani dulu', icon: '♡', style: 'success-confess', action: 'accept' }
    ]
  }
];

// ===== NAVIGATION MAP =====
function getSlideIndexById(id) {
  return slides.findIndex(s => s.id === id);
}

// ===== STATE =====
let currentSlide = 0;
let isAnimating = false;
let musicStarted = false;

// ===== DOM REFERENCES =====
const slideContainer = document.getElementById('slide-container');
const audioElement = document.getElementById('bg-music');

// ===== AUTO-PLAY MUSIC (called inside user gesture) =====
function tryPlayMusic() {
  if (musicStarted) return;
  audioElement.play().then(() => {
    musicStarted = true;
  }).catch(() => {});
}

// ===== SLIDE RENDERER =====
function renderSlide(index) {
  const slide = slides[index];
  if (!slide) return;

  let html = `<div class="slide-content" id="slide-${slide.id}">`;

  // Label
  if (slide.label) {
    html += `<span class="slide-label">${slide.label}</span>`;
  }

  // Title
  if (slide.title) {
    if (slide.type === 'greeting') {
      html += `<h1 class="slide-title">${slide.title}<br>Selamat <span class="highlight">${getGreeting()}</span></h1>`;
    } else if (slide.id === 'final') {
      html += `<h1 class="slide-title">${slide.title}<br><span class="highlight">Lebih dari sekedar teman..</span></h1>`;
    } else {
      html += `<h1 class="slide-title">${slide.title}</h1>`;
    }
  }

  // Divider
  html += `<div class="slide-divider"></div>`;

  // Text
  if (slide.text) {
    let textContent = slide.text.replace(/\n/g, '<br>');
    if (slide.textClass === 'has-red-ending') {
      textContent = textContent.replace(
        'Atau jangan jangan kamu punya pacar sekarang...',
        'Atau jangan jangan kamu <span class="text-red">punya pacar sekarang...</span>'
      );
    }
    html += `<p class="slide-text">${textContent}</p>`;
  }

  // Note
  if (slide.note) {
    html += `<p class="slide-note">${slide.note}</p>`;
  }

  // Buttons
  if (slide.buttons && slide.buttons.length > 0) {
    const isHorizontal = slide.type === 'final';
    html += `<div class="btn-group-confess${isHorizontal ? ' horizontal' : ''}">`;
    slide.buttons.forEach(btn => {
      const iconHtml = btn.icon ? ` <span>${btn.icon}</span>` : '';
      html += `<button class="btn-confess btn-${btn.style}" data-action="${btn.action}">${btn.text}${iconHtml}</button>`;
    });
    html += `</div>`;
  }

  html += `</div>`;

  slideContainer.innerHTML = html;
  attachButtonListeners();
}

// ===== BUTTON HANDLERS =====
function attachButtonListeners() {
  const buttons = slideContainer.querySelectorAll('[data-action]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => handleAction(btn.dataset.action));
  });
}

function handleAction(action) {
  if (isAnimating) return;

  // Play music on first interaction (must be in user gesture call stack)
  tryPlayMusic();

  switch (action) {
    case 'next':
      goToNextSlide();
      break;
    case 'has-partner':
      goToSlideById('has-partner');
      break;
    case 'single':
      goToSlideById('single-relief');
      break;
    case 'next-from-single':
      goToSlideById('confession-3');
      break;
    case 'wa-has-partner':
      openWhatsApp('maaf tyo, aku udah punya pacar...');
      break;
    case 'reject':
      showRejectionModal();
      break;
    case 'accept':
      handleAccept();
      break;
  }
}

// ===== NAVIGATION =====
function goToNextSlide() {
  if (currentSlide < slides.length - 1) {
    animateTransition(() => {
      currentSlide++;
      renderSlide(currentSlide);
    });
  }
}

function goToSlideById(id) {
  const index = getSlideIndexById(id);
  if (index >= 0) {
    animateTransition(() => {
      currentSlide = index;
      renderSlide(currentSlide);
    });
  }
}

function animateTransition(callback) {
  isAnimating = true;
  const content = slideContainer.querySelector('.slide-content');
  if (content) {
    content.classList.add('slide-out');
    setTimeout(() => {
      callback();
      isAnimating = false;
    }, 350);
  } else {
    callback();
    isAnimating = false;
  }
}

// ===== WHATSAPP INTEGRATION =====
function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank');
}

// ===== REJECTION MODAL =====
function showRejectionModal() {
  const modal = new bootstrap.Modal(document.getElementById('rejectionModal'));
  modal.show();
}

function submitRejection() {
  const reasonInput = document.getElementById('rejection-reason');
  const reason = reasonInput.value.trim();
  if (!reason) {
    reasonInput.classList.add('is-invalid');
    return;
  }
  reasonInput.classList.remove('is-invalid');

  const message = `Maaf tyo aku masih belum bisa menerima confess mu.. ${reason}`;
  openWhatsApp(message);

  const modal = bootstrap.Modal.getInstance(document.getElementById('rejectionModal'));
  if (modal) modal.hide();
}

// ===== ACCEPT HANDLER =====
function handleAccept() {
  launchConfetti();
  setTimeout(() => {
    openWhatsApp('iyaa tyoo.. jalanin dulu gapapa sayang..');
  }, 2000);
}

// ===== CONFETTI EFFECT (Red & White theme) =====
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#ff003c', '#ffffff', '#cc0030', '#ff4466', '#ff6680', '#e00035', '#ffcccc', '#ff1a1a'];
  const confettiPieces = [];

  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      speedX: (Math.random() - 0.5) * 3,
      speedY: Math.random() * 3 + 1.5,
      opacity: 1,
      type: Math.random() > 0.75 ? 'heart' : 'rect'
    });
  }

  function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const t = size * 0.3;
    ctx.moveTo(x, y + t);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + t);
    ctx.bezierCurveTo(x - size / 2, y + (size + t) / 2, x, y + (size + t) / 1.2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + t) / 1.2, x + size / 2, y + (size + t) / 2, x + size / 2, y + t);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + t);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  let frame = 0;
  const maxFrames = 250;

  function animate() {
    if (frame >= maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (frame > maxFrames - 50) {
        p.opacity = Math.max(0, 1 - (frame - (maxFrames - 50)) / 50);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'heart') {
        drawHeart(ctx, 0, 0, p.w, p.color);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();
    });

    frame++;
    requestAnimationFrame(animate);
  }

  animate();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderSlide(0);

  const sendRejectBtn = document.getElementById('send-rejection');
  if (sendRejectBtn) {
    sendRejectBtn.addEventListener('click', submitRejection);
  }

  const rejectionInput = document.getElementById('rejection-reason');
  if (rejectionInput) {
    rejectionInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitRejection();
      }
    });
  }

  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
});
