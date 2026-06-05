/* ============================================
   ALFANDOXEON PORTFOLIO - APP.JS
   Client Side Rendering (CSR)
   ============================================ */

// ============================================
// DATA FETCHING (CSR)
// ============================================
let configData = null;

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Gagal memuat config.json');
        configData = await response.json();
        renderAll();
        initEntryPopup();
    } catch (error) {
        console.error('Error loading config:', error);
        document.getElementById('hero-subtitle').textContent = 'Error memuat data. Pastikan config.json tersedia.';
    }
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderAll() {
    if (!configData) return;

    renderHero();
    renderAbout();
    renderMusic();
    renderSkills();
    renderYoutube();
    renderPortfolio();
    renderContact();
    renderPromo();
    startTypingEffect();

    // Observe dynamically added reveal elements (skills cards)
    observeRevealElements();
}

// --- Hero Section ---
function renderHero() {
    const profile = configData.profile;
    const subtitle = document.getElementById('hero-subtitle');
    subtitle.textContent = `${profile.jurusan} — ${profile.sub_jurusan} | Developer & IT Support`;
}

// --- About Section ---
function renderAbout() {
    const profile = configData.profile;

    // About Info Card
    const aboutInfo = document.getElementById('about-info');
    aboutInfo.innerHTML = `
        <div class="info-row">
            <span class="info-icon">&gt;</span>
            <span class="info-label">nama</span>
            <span class="info-value">${profile.nama}</span>
        </div>
        <div class="info-row">
            <span class="info-icon">&gt;</span>
            <span class="info-label">panggilan</span>
            <span class="info-value">${profile.panggilan}</span>
        </div>
        <div class="info-row">
            <span class="info-icon">&gt;</span>
            <span class="info-label">lahir</span>
            <span class="info-value">${profile.tanggal_lahir}</span>
        </div>
        <div class="info-row">
            <span class="info-icon">&gt;</span>
            <span class="info-label">jurusan</span>
            <span class="info-value">${profile.jurusan}</span>
        </div>
        <div class="info-row">
            <span class="info-icon">&gt;</span>
            <span class="info-label">sub</span>
            <span class="info-value">${profile.sub_jurusan}</span>
        </div>
        <div class="info-row">
            <span class="info-icon">&gt;</span>
            <span class="info-label">kelamin</span>
            <span class="info-value">${profile.kelamin}</span>
        </div>
    `;

    // Profile Image
    const aboutImage = document.getElementById('about-image');
    aboutImage.innerHTML = `
        <img class="profile-photo" src="${profile.foto_profil}" alt="Foto Profil ${profile.nama}" onerror="this.src='${profile.foto_placeholder}'">
    `;

    // Hobbies Tags
    const hobbiesContainer = document.getElementById('about-hobbies');
    const hobbyIcons = {
        'Mobile Legends': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        'Musik': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
        'Piano': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 20V4M10 20V4M14 20V4M18 20V4"/></svg>',
        'Gitar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5l-3 3"/><circle cx="10" cy="16" r="5"/><path d="M12 11l5-5"/></svg>',
        'Mendengarkan': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>',
        'Membaca': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
        'Buku': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
        'Nonton': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>',
        'Anime': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
    };

    hobbiesContainer.innerHTML = profile.hobi.map(hobby => {
        let icon = hobbyIcons['Nonton'];
        for (const key in hobbyIcons) {
            if (hobby.toLowerCase().includes(key.toLowerCase())) {
                icon = hobbyIcons[key];
                break;
            }
        }
        return `<span class="hobby-tag">${icon}<span>${hobby}</span></span>`;
    }).join('');
}

// --- Skills Section ---
function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    const skills = configData.skills;

    const skillIcons = {
        'Python': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
        'JavaScript': '<path d="M3 3h18v18H3V3zm13.5 13.5c.83 0 1.5-.67 1.5-1.5v-3h-1.5v3h-1.5v-6H18v6c0 1.66-1.34 3-3 3h-1.5v-1.5h1.5zm-6 0c.83 0 1.5-.67 1.5-1.5v-3H10.5v3H9v-6h1.5v1.5H12v6c0 1.66-1.34 3-3 3H7.5v-1.5h1.5z"/>',
        'HTML': '<path d="M3 3h18v18H3V3zm4 4v10l5 2.5 5-2.5V7H7zm2 2h6v2H9V9zm0 4h6v2H9v-2z"/>',
        'CSS': '<path d="M3 3h18v18H3V3zm4 4v10l5 2.5 5-2.5V7H7zm2 2h6v2H9V9zm0 4h6v2H9v-2z"/>',
        'PHP': '<path d="M7.5 15.5v-4h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2zm10-2c0 1.1-.9 2-2 2h-2v-4h2c1.1 0 2 .9 2 2zM3 3h18v18H3V3zm7 4.5H7.5v7H9v-2.5h1.5c1.66 0 3-1.34 3-3s-1.34-3-3-3zm5 0h-2.5v7H15c1.66 0 3-1.34 3-3s-1.34-3-3-3z"/>',
        'C': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
        'IT': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
        'Video': '<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>',
        'Photo': '<path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.93-2.74-3.1-4.9-5.78-5.82L12.5 9h9.04zM21.8 10h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C2.19 6.78 1 9.28 1 12c0 2.61.81 5.03 2.2 7l4.76-8.25.58-1zM12.5 14.5l-2.08 3.59c.73.22 1.5.36 2.3.36 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.88 1.65z"/>'
    };

    skillsGrid.innerHTML = skills.map((skill, index) => {
        let iconPath = skillIcons['IT'];
        for (const key in skillIcons) {
            if (skill.nama.toLowerCase().includes(key.toLowerCase())) {
                iconPath = skillIcons[key];
                break;
            }
        }

        return `
            <div class="skill-card reveal" style="transition-delay: ${index * 0.1}s">
                <div class="skill-header">
                    <div class="skill-icon-wrapper">
                        <svg class="skill-icon" viewBox="0 0 24 24" fill="currentColor">
                            ${iconPath}
                        </svg>
                    </div>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
                <h3 class="skill-name">${skill.nama}</h3>
                <p class="skill-category">${skill.kategori}</p>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.level}%" style="width: 0%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderMusic() {
    const tracks = configData.favorite_music || [];
    const playlist = document.getElementById('music-playlist');
    const coverImg = document.getElementById('music-cover');
    const titleEl = document.getElementById('music-title');
    const artistEl = document.getElementById('music-artist');

    if (!playlist) return;

    if (tracks.length === 0) {
        playlist.innerHTML = `
            <div class="music-empty">
                Tidak ada lagu favorit. Tambahkan lagu di <code>config.json</code> pada properti <code>favorite_music</code>.
            </div>
        `;
        return;
    }

    playlist.innerHTML = tracks.map((track, index) => {
        const fileName = track.path ? track.path.split('/').pop() : 'file.mp3';
        return `
            <button type="button" class="music-track-item" data-track-index="${index}">
                <div>
                    <p class="track-title">${track.judul}</p>
                    <p class="track-artist">${track.artis}</p>
                </div>
                <span class="track-file">${fileName}</span>
            </button>
        `;
    }).join('');

    setupMusicPlayer(tracks, coverImg, titleEl, artistEl);
}

function setupMusicPlayer(tracks, coverImg, titleEl, artistEl) {
    const audio = document.getElementById('audio-player');
    const nextBtn = document.getElementById('music-next');
    const prevBtn = document.getElementById('music-prev');
    const toggleBtn = document.getElementById('music-toggle');
    const progressFill = document.getElementById('music-progress');
    const currentTimeEl = document.getElementById('music-current-time');
    const durationEl = document.getElementById('music-duration');
    const playlistItems = document.querySelectorAll('.music-track-item');
    const progressBar = document.querySelector('.music-progress-bar');
    const volumeSlider = document.getElementById('music-volume');
    const volumeValue = document.getElementById('music-volume-value');
    const spectrumCanvas = document.getElementById('music-spectrum');
    const spectrumCtx = spectrumCanvas ? spectrumCanvas.getContext('2d') : null;
    const visualizerConfig = configData.music_visualizer || {};

    let currentTrackIndex = 0;
    let isPlaying = false;
    let audioContext = null;
    let analyser = null;
    let frequencyData = null;
    let visualizerAnimation = null;

    function resizeSpectrumCanvas() {
        if (!spectrumCanvas) return;
        spectrumCanvas.width = spectrumCanvas.clientWidth;
        spectrumCanvas.height = spectrumCanvas.clientHeight;
    }

    function drawSpectrum() {
        if (!analyser || !spectrumCtx || !spectrumCanvas) return;
        analyser.getByteFrequencyData(frequencyData);
        spectrumCtx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

        const bars = Math.min(visualizerConfig.bar_count || 30, frequencyData.length);
        const barWidth = spectrumCanvas.width / bars;
        spectrumCtx.strokeStyle = visualizerConfig.color || '#ff1a1a';
        spectrumCtx.lineWidth = visualizerConfig.line_width || 2;
        spectrumCtx.lineCap = 'round';

        for (let i = 0; i < bars; i++) {
            const dataIndex = Math.floor(i * (frequencyData.length / bars));
            const value = frequencyData[dataIndex] / 255;
            const maxHeight = visualizerConfig.max_bar_height || spectrumCanvas.height - 12;
            const barHeight = Math.max(4, value * maxHeight);
            const x = barWidth * i + barWidth / 2;
            spectrumCtx.beginPath();
            spectrumCtx.moveTo(x, spectrumCanvas.height - 6);
            spectrumCtx.lineTo(x, spectrumCanvas.height - 6 - barHeight);
            spectrumCtx.stroke();
        }

        visualizerAnimation = requestAnimationFrame(drawSpectrum);
    }

    function initVisualizer() {
        if (!visualizerConfig.enabled || !audio || !spectrumCanvas || !spectrumCtx) {
            if (spectrumCanvas && spectrumCanvas.parentElement) {
                spectrumCanvas.parentElement.style.display = 'none';
            }
            return;
        }

        resizeSpectrumCanvas();

        if (audioContext || !window.AudioContext && !window.webkitAudioContext) return;

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        frequencyData = new Uint8Array(analyser.frequencyBinCount);

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        drawSpectrum();
        window.addEventListener('resize', resizeSpectrumCanvas);
    }

    function playAudio() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }

        audio.play().then(() => {
            isPlaying = true;
            toggleBtn.textContent = 'Pause';
            toggleBtn.classList.add('playing');
        }).catch(() => {
            isPlaying = false;
            toggleBtn.textContent = 'Play';
        });
    }

    if (!audio || !toggleBtn || !progressFill || !progressBar || !volumeSlider || !volumeValue) return;

    function formatTime(seconds) {
        if (!seconds || Number.isNaN(seconds)) return '00:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function highlightTrack(index) {
        playlistItems.forEach((item, itemIndex) => {
            item.classList.toggle('active', itemIndex === index);
        });
    }

    function updateNowPlaying() {
        const track = tracks[currentTrackIndex];
        if (!track) return;
        if (coverImg) coverImg.src = track.cover || 'photos/cover-music-1.jpg';
        if (titleEl) titleEl.textContent = track.judul || 'Tanpa judul';
        if (artistEl) artistEl.textContent = track.artis || 'Tidak diketahui';
        audio.src = track.path || '';
        audio.load();
        highlightTrack(currentTrackIndex);
        initVisualizer();
    }

    function updateVolumeDisplay(value) {
        volumeValue.textContent = `${value}%`;
        if (audio) audio.volume = value / 100;
    }

    volumeSlider.addEventListener('input', () => {
        const volume = Number(volumeSlider.value);
        updateVolumeDisplay(volume);
    });

    updateVolumeDisplay(Number(volumeSlider.value));

    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        toggleBtn.textContent = 'Play';
        toggleBtn.classList.remove('playing');
    }

    function togglePlayback() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    function selectTrack(index) {
        if (index < 0) index = tracks.length - 1;
        if (index >= tracks.length) index = 0;
        currentTrackIndex = index;
        updateNowPlaying();
        playAudio();
    }

    function previousTrack() {
        selectTrack(currentTrackIndex - 1);
    }

    function nextTrack() {
        selectTrack(currentTrackIndex + 1);
    }

    toggleBtn.addEventListener('click', togglePlayback);
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', nextTrack);

    if (progressBar) {
        progressBar.addEventListener('click', (event) => {
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = event.clientX - rect.left;
            const percentage = clickPosition / rect.width;
            if (audio.duration) {
                audio.currentTime = percentage * audio.duration;
            }
        });
    }

    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = Number(item.dataset.trackIndex);
            selectTrack(index);
        });
    });

    updateNowPlaying();
}

// --- Contact Section ---
function renderYoutube() {
    const youtubeLink = configData.youtube_channel;
    const youtubeEmbed = document.getElementById('youtube-embed');
    const youtubeButton = document.getElementById('youtube-link');

    if (!youtubeEmbed || !youtubeLink) return;

    const rawHandle = youtubeLink.split('/').pop().split('?')[0];
    const channelHandle = rawHandle.startsWith('@') ? rawHandle.slice(1) : rawHandle;
    const embedUrl = `https://www.youtube.com/embed?listType=user_uploads&list=${encodeURIComponent(channelHandle)}`;

    youtubeEmbed.innerHTML = `
        <div class="youtube-frame-wrapper">
            <iframe src="${embedUrl}" title="YouTube Channel ${channelHandle}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    `;

    if (youtubeButton) {
        youtubeButton.href = youtubeLink;
    }
}

function renderPortfolio() {
    const portfolio = configData.portfolio_site;
    const portfolioTitle = document.getElementById('portfolio-title');
    const portfolioDescription = document.getElementById('portfolio-description');
    const portfolioButton = document.getElementById('portfolio-link');

    if (!portfolio || !portfolioButton) return;

    if (portfolioTitle) {
        portfolioTitle.textContent = portfolio.title || 'Portofolio Editing & Konten Kreator';
    }
    if (portfolioDescription) {
        portfolioDescription.textContent = portfolio.description || 'Kunjungi portofolio saya untuk melihat karya editing dan konten kreator Mobile Legends.';
    }

    portfolioButton.textContent = portfolio.button_text || 'Kunjungi Portofolio';
    portfolioButton.href = portfolio.url;
}

function renderPromo() {
    const promo = configData.promo;
    const promoSection = document.getElementById('promo');
    const promoImage = document.querySelector('#promo-image');
    const promoLabel = document.getElementById('promo-label');
    const promoTitle = document.getElementById('promo-title');
    const promoDescription = document.getElementById('promo-description');
    const promoButton = document.getElementById('promo-button');

    if (!promo || !promoSection) return;

    if (promo.enabled === false) {
        promoSection.style.display = 'none';
        return;
    }

    if (promoImage && promo.image) {
        promoImage.src = promo.image;
    }
    if (promoLabel && promo.label) {
        promoLabel.textContent = promo.label;
    }
    if (promoTitle && promo.title) {
        promoTitle.textContent = promo.title;
    }
    if (promoDescription && promo.description) {
        promoDescription.textContent = promo.description;
    }
    if (promoButton) {
        promoButton.textContent = promo.button_text || promoButton.textContent;
        promoButton.href = promo.link || promoButton.href;
        promoButton.target = '_blank';
        promoButton.rel = 'noopener noreferrer';
    }
}

function renderContact() {
    const profile = configData.profile;
    const socialLinks = configData.social_links;

    const contactInfo = document.getElementById('contact-info');

    const socialIcons = {
        'WhatsApp': '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
        'Instagram': '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>',
        'GitHub': '<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>',
        'LinkedIn': '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'
    };

    contactInfo.innerHTML = socialLinks.map(link => {
        const icon = socialIcons[link.platform] || socialIcons['GitHub'];
        const displayValue = link.platform === 'WhatsApp' 
            ? profile.kontak.whatsapp 
            : (link.platform === 'Instagram' ? '@' + profile.kontak.instagram : link.platform);

        return `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="contact-item">
                <div class="contact-icon-wrapper">
                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                        ${icon}
                    </svg>
                </div>
                <div class="contact-details">
                    <h4>${link.platform}</h4>
                    <p>${displayValue}</p>
                </div>
            </a>
        `;
    }).join('');
}

// ============================================
// TYPING EFFECT
// ============================================
function startTypingEffect() {
    if (!configData) return;

    const nameElement = document.getElementById('hero-name');
    const name = configData.profile.nama_panggung;
    let i = 0;

    function type() {
        if (i < name.length) {
            nameElement.textContent += name.charAt(i);
            i++;
            setTimeout(type, 150);
        }
    }

    nameElement.textContent = '';
    setTimeout(type, 500);
}

// ============================================
// PARTICLE BACKGROUND
// ============================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const connectionDistance = 150;
    const maxConnections = 3;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 26, 26, 0.5)';
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            let connections = 0;
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance && connections < maxConnections) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 26, 26, ${0.15 * (1 - distance / connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    connections++;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();

    window.addEventListener('resize', () => {
        resize();
        init();
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Reveal on scroll - observe static elements
    observeRevealElements();
}

// Global reveal observer function that can be called after dynamic content is added
function observeRevealElements() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill bars
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!configData) return;

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');

        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';

        const whatsappLink = configData.social_links.find(link => link.platform === 'WhatsApp')?.url;
        const phoneNumber = configData.profile?.kontak?.whatsapp;
        let baseUrl = whatsappLink || '';

        if (!baseUrl && phoneNumber) {
            const normalizedPhone = phoneNumber.startsWith('0') ? `62${phoneNumber.slice(1)}` : phoneNumber;
            baseUrl = `https://wa.me/${normalizedPhone}`;
        }

        if (baseUrl) {
            const text = `Halo, nama saya ${name}. Email: ${email}. Pesan: ${message}`;
            const waUrl = `${baseUrl}?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
        }

        // Show toast
        toast.classList.add('show');

        // Reset form
        form.reset();

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });
}

function executeCommand(inputCommand) {
    const terminalScreen = document.getElementById('terminal-screen');
    const cmd = inputCommand.trim().toLowerCase();
    if (!cmd || !terminalScreen) return;

    const cmdEcho = document.createElement('div');
    cmdEcho.className = 'terminal-line terminal-line-white';
    cmdEcho.innerHTML = `<span class="terminal-path">tyo@xeon-net:~$</span> ${inputCommand}`;
    terminalScreen.appendChild(cmdEcho);

    const replyBlock = document.createElement('div');
    replyBlock.className = 'terminal-line terminal-line-muted';

    if (!configData) {
        replyBlock.innerHTML = 'Data masih dimuat. Silakan coba beberapa saat lagi.';
        terminalScreen.appendChild(replyBlock);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        return;
    }

    switch (cmd) {
        case 'help':
            replyBlock.innerHTML = `
                <p class="terminal-line terminal-line-warning"><strong>Instruksi Terminal Portofolio yang Tersedia:</strong></p>
                <p><strong>profil</strong>   : Menampilkan data identitas.</p>
                <p><strong>keahlian</strong> : Menampilkan daftar keahlian.</p>
                <p><strong>hobi</strong>     : Menampilkan daftar hobi.</p>
                <p><strong>kontak</strong>   : Menampilkan rute komunikasi.</p>
                <p><strong>clear</strong>    : Bersihkan layar terminal.</p>
            `;
            break;
        case 'profil':
            replyBlock.innerHTML = `
                <p class="terminal-line terminal-line-success"><strong>== IDENTIFICATION SYSTEM LOG ==</strong></p>
                <p>NAMA          : ${configData.profile.nama}</p>
                <p>PANGGILAN     : ${configData.profile.panggilan}</p>
                <p>JURUSAN       : ${configData.profile.jurusan}</p>
                <p>SUB JURUSAN   : ${configData.profile.sub_jurusan}</p>
                <p>TANGGAL LAHIR : ${configData.profile.tanggal_lahir}</p>
                <p>KELAMIN       : ${configData.profile.kelamin}</p>
            `;
            break;
        case 'keahlian':
            replyBlock.innerHTML = `<p class="terminal-line terminal-line-success"><strong>== MASTER CAPABILITY MATRIX ==</strong></p>`;
            configData.skills.forEach(skill => {
                const skillLine = document.createElement('p');
                skillLine.className = 'terminal-line';
                skillLine.textContent = `- [${skill.level}%] ${skill.nama} (${skill.kategori})`;
                replyBlock.appendChild(skillLine);
            });
            break;
        case 'hobi':
            replyBlock.innerHTML = `<p class="terminal-line terminal-line-success"><strong>== RECREATIONAL PROFILE ==</strong></p>`;
            configData.profile.hobi.forEach(hobby => {
                const hobbyLine = document.createElement('p');
                hobbyLine.className = 'terminal-line';
                hobbyLine.textContent = `- ${hobby}`;
                replyBlock.appendChild(hobbyLine);
            });
            break;
        case 'kontak':
            const whatsappLink = configData.social_links.find(link => link.platform === 'WhatsApp')?.url || '';
            const instagramLink = configData.social_links.find(link => link.platform === 'Instagram')?.url || '';
            replyBlock.innerHTML = `
                <p class="terminal-line terminal-line-success"><strong>== COMMUNICATION ROUTING ==</strong></p>
                <p>WhatsApp  : ${configData.profile.kontak.whatsapp}</p>
                <p>Instagram : @${configData.profile.kontak.instagram}</p>
            `;
            if (whatsappLink) {
                const linkLine = document.createElement('p');
                linkLine.className = 'terminal-line';
                linkLine.innerHTML = `Buka WhatsApp : <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="terminal-highlight">${whatsappLink}</a>`;
                replyBlock.appendChild(linkLine);
            }
            if (instagramLink) {
                const linkLine = document.createElement('p');
                linkLine.className = 'terminal-line';
                linkLine.innerHTML = `Instagram : <a href="${instagramLink}" target="_blank" rel="noopener noreferrer" class="terminal-highlight">${instagramLink}</a>`;
                replyBlock.appendChild(linkLine);
            }
            break;
        case 'clear':
            terminalScreen.innerHTML = '';
            return;
        default:
            replyBlock.innerHTML = `Instruksi '<strong>${cmd}</strong>' tidak dikenali. Ketik <strong>help</strong> untuk daftar bantuan.`;
    }

    terminalScreen.appendChild(replyBlock);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    if (!terminalInput) return;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(terminalInput.value);
            terminalInput.value = '';
        }
    });
}

function initEntryPopup() {
    const popup = document.getElementById('entry-popup');
    const blurTarget = document.getElementById('blur-target');
    const closeButtons = popup ? popup.querySelectorAll('[data-popup-close]') : [];
    const ctaButton = popup ? popup.querySelector('.entry-popup-cta') : null;
    const popupTitle = document.getElementById('entry-popup-title');
    const popupCopy = document.getElementById('entry-popup-copy');
    const popupImage = document.getElementById('entry-popup-image');
    const popupButton = document.getElementById('entry-popup-button');

    const popupConfig = configData?.popup;
    if (!popup || !blurTarget || !popupConfig || !popupConfig.enabled) {
        if (popup) {
            popup.style.display = 'none';
        }
        return;
    }

    if (popupTitle && popupConfig.headline) {
        popupTitle.textContent = popupConfig.headline;
    }

    if (popupCopy && popupConfig.description) {
        popupCopy.textContent = popupConfig.description;
    }

    if (popupImage && popupConfig.image) {
        popupImage.src = popupConfig.image;
    }

    if (popupButton && popupConfig.button_text) {
        popupButton.textContent = popupConfig.button_text;
    }

    function closePopup() {
        popup.classList.remove('open');
        blurTarget.classList.remove('blurred');
        popup.setAttribute('aria-hidden', 'true');
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closePopup);
    });

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const targetLink = popupConfig.link || 'Dana/index.html';
            window.open(targetLink, '_blank', 'noopener,noreferrer');
        });
    }

    requestAnimationFrame(() => {
        popup.classList.add('open');
        blurTarget.classList.add('blurred');
        popup.setAttribute('aria-hidden', 'false');
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    initParticles();
    initScrollAnimations();
    initMobileNav();
    initContactForm();
    initTerminal();
});