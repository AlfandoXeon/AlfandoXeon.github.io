(function () {
  window.Components = window.Components || {};

  window.Components.gallery = {
    currentIndex: 0,
    lightboxEl: null,

    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-gallery";

      const photos = section.photos || [
        {
          src: "./img/WhatsApp Image 2026-09-06 at 20.48.51.jpeg",
          caption: "Senyum ceria di depan cermin, dari kecil auranya sudah sehangat dan semanis ini ✨",
          year: "Masa Balita",
        },
        {
          src: "./img/image.png",
          caption: "Momen menggemaskan elus anabul kucing putih kesayangan 🐱",
          year: "Kecil & Penyayang",
        },
        {
          src: "./img/image copy.png",
          caption: "Pipi tembam yang selalu bikin gemas, duduk manis di sofa vintage kesayangan 🥰",
          year: "Si Paling Imut",
        },
        {
          src: "./img/image copy 2.png",
          caption: "Paling keren dengan kacamata biru di samping pohon natal! Gaya juara sejak dini 😎🎄",
          year: "Gaya Juara",
        },
        {
          src: "./img/image copy 3.png",
          caption: "Santai di kursi bambu sambil nyemil biskuit bareng anabul kesayangan 🍪🐾",
          year: "Momen Hangat",
        },
        {
          src: "./img/image copy 4.png",
          caption: "Pose kuncir dua paling ikonik dan tak terlupakan, selalu sukses bikin tersenyum! 👧💖",
          year: "Penuh Ceria",
        },
      ];

      this.photos = photos;
      this.currentIndex = 0;

      div.innerHTML = `
        <div class="gallery-wrapper">
          <div class="gallery-header">
            <span class="gallery-tag">✨ Galeri Kenangan</span>
            <h2 class="gallery-title">${section.title || "Foto Masa Kecilmu yang Menggemaskan"}</h2>
            <p class="gallery-subtitle">${section.subtitle || "Tumbuh menjadi sosok yang paling kucintai hingga kini di usia 24 tahun"}</p>
          </div>

          <div class="polaroid-stage">
            <div class="polaroid-card" id="active-polaroid">
              <div class="washi-tape"></div>
              <div class="polaroid-img-box">
                <img src="${photos[0].src}" alt="${photos[0].caption}" id="polaroid-image" />
                <button class="zoom-badge" title="Perbesar Foto">🔍 Perbesar</button>
              </div>
              <div class="polaroid-caption-area">
                <span class="polaroid-year" id="polaroid-year">${photos[0].year || "Memori Indah"}</span>
                <p class="polaroid-caption" id="polaroid-caption">${photos[0].caption}</p>
                <span class="polaroid-counter" id="polaroid-counter">1 / ${photos.length}</span>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="gallery-nav">
            <button class="gallery-btn prev-btn" id="gallery-prev" title="Foto Sebelumnya">❮</button>
            <div class="gallery-dots" id="gallery-dots">
              ${photos
                .map(
                  (_, idx) =>
                    `<button class="gallery-dot ${idx === 0 ? "active" : ""}" data-index="${idx}" title="Foto ${idx + 1}"></button>`
                )
                .join("")}
            </div>
            <button class="gallery-btn next-btn" id="gallery-next" title="Foto Selanjutnya">❯</button>
          </div>

          <div class="gallery-footer-action">
            <button class="continue-story-btn" id="gallery-continue">Lanjut ke Pesan Terakhir 💌</button>
          </div>
        </div>

        <!-- Lightbox Modal -->
        <div class="gallery-lightbox" id="gallery-lightbox">
          <div class="lightbox-backdrop"></div>
          <div class="lightbox-content">
            <button class="lightbox-close" id="lightbox-close" title="Tutup">✕</button>
            <img src="${photos[0].src}" alt="Preview Foto" id="lightbox-img" />
            <p class="lightbox-caption" id="lightbox-caption">${photos[0].caption}</p>
          </div>
        </div>
      `;

      container.appendChild(div);
      this.attachEvents(div, photos);
      return div;
    },

    attachEvents(el, photos) {
      const img = el.querySelector("#polaroid-image");
      const caption = el.querySelector("#polaroid-caption");
      const year = el.querySelector("#polaroid-year");
      const counter = el.querySelector("#polaroid-counter");
      const dots = el.querySelectorAll(".gallery-dot");
      const prevBtn = el.querySelector("#gallery-prev");
      const nextBtn = el.querySelector("#gallery-next");
      const card = el.querySelector("#active-polaroid");
      const zoomBtn = el.querySelector(".zoom-badge");

      // Lightbox elements
      const lightbox = el.querySelector("#gallery-lightbox");
      const lightboxImg = el.querySelector("#lightbox-img");
      const lightboxCaption = el.querySelector("#lightbox-caption");
      const lightboxClose = el.querySelector("#lightbox-close");
      const backdrop = el.querySelector(".lightbox-backdrop");

      const updateCard = (index) => {
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        this.currentIndex = index;

        gsap.to(card, {
          duration: 0.22,
          scale: 0.95,
          opacity: 0.4,
          rotation: (Math.random() - 0.5) * 6,
          ease: "power2.in",
          onComplete: () => {
            const cur = photos[this.currentIndex];
            img.src = cur.src;
            caption.textContent = cur.caption;
            year.textContent = cur.year || "Memori Indah";
            counter.textContent = `${this.currentIndex + 1} / ${photos.length}`;

            dots.forEach((d, i) => {
              d.classList.toggle("active", i === this.currentIndex);
            });

            gsap.to(card, {
              duration: 0.35,
              scale: 1,
              opacity: 1,
              rotation: (Math.random() - 0.5) * 4,
              ease: "back.out(1.4)",
            });
          },
        });
      };

      this.updateCard = updateCard;

      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCard(this.currentIndex - 1);
      });

      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCard(this.currentIndex + 1);
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          const idx = parseInt(dot.getAttribute("data-index"), 10);
          updateCard(idx);
        });
      });

      // Open Lightbox
      const openLightbox = () => {
        const cur = photos[this.currentIndex];
        lightboxImg.src = cur.src;
        lightboxCaption.textContent = cur.caption;
        lightbox.classList.add("active");
        gsap.fromTo(
          lightbox.querySelector(".lightbox-content"),
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }
        );
      };

      zoomBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox();
      });

      img.addEventListener("click", () => {
        openLightbox();
      });

      // Close Lightbox
      const closeLightbox = () => {
        gsap.to(lightbox.querySelector(".lightbox-content"), {
          scale: 0.8,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            lightbox.classList.remove("active");
          },
        });
      };

      lightboxClose.addEventListener("click", closeLightbox);
      backdrop.addEventListener("click", closeLightbox);

      // Swipe support for mobile
      let startX = 0;
      let startY = 0;
      card.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        },
        { passive: true }
      );

      card.addEventListener(
        "touchend",
        (e) => {
          const diffX = e.changedTouches[0].clientX - startX;
          const diffY = e.changedTouches[0].clientY - startY;
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              updateCard(this.currentIndex + 1);
            } else {
              updateCard(this.currentIndex - 1);
            }
          }
        },
        { passive: true }
      );
    },

    animate(tl, el) {
      const wrapper = el.querySelector(".gallery-wrapper");
      const card = el.querySelector("#active-polaroid");
      const continueBtn = el.querySelector("#gallery-continue");

      el.style.pointerEvents = "auto";

      // Animate gallery in
      tl.fromTo(
        wrapper,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          card,
          { scale: 0.7, rotation: -10, opacity: 0 },
          { scale: 1, rotation: -2, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.4"
        )
        .fromTo(
          el.querySelectorAll(".gallery-nav, .gallery-footer-action"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
          "-=0.2"
        );

      // Smooth automated preview of photos so user sees more than one photo during timeline
      if (this.photos && this.photos.length > 1) {
        tl.call(() => {
          if (this.updateCard) this.updateCard(1);
        }, null, "+=3.0");

        tl.call(() => {
          if (this.updateCard) this.updateCard(2);
        }, null, "+=3.0");
      }

      // Friendly pause
      tl.to({}, { duration: 3.5 });

      // If user clicks continue button, proceed to closing
      if (continueBtn) {
        continueBtn.onclick = () => {
          // Advance timeline past the gallery
          tl.play();
        };
      }
    },

    exit(tl, el) {
      tl.to(el.querySelector(".gallery-wrapper"), {
        duration: 0.6,
        opacity: 0,
        y: -30,
        scale: 0.95,
        ease: "power2.in",
        onComplete: () => {
          el.style.pointerEvents = "none";
        },
      });
    },
  };
})();
