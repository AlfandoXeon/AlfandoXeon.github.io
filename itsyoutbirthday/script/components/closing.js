(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-closing";

      const text =
        section.text ||
        "Semoga di usia ke-24 ini, harimu selalu dipenuhi tawa, cinta, dan segala hal indah yang kau impikan.";
      const replayText = section.replayText || "Putar Ulang Ucapan";
      const signature =
        section.signature || "Tertanda dengan segenap cinta,<br><strong>Glorius Paskan Danu</strong>";

      const cakeIcon = window.Icons ? window.Icons.cake(36) : "";
      const replayIcon = window.Icons ? window.Icons.replay(16) : "";
      const galleryIcon = window.Icons ? window.Icons.gallery(16) : "";
      const heartIcon = window.Icons ? window.Icons.heart(26) : "";

      div.innerHTML = `
        <div class="closing-card">
          <div class="closing-icon-wrap">${cakeIcon}</div>
          <p class="closing-text">${text}</p>
          <div class="closing-signature">${signature}</div>
          
          <div class="closing-actions">
            <button class="action-btn replay-btn" id="replay">
              ${replayIcon}
              <span>${replayText}</span>
            </button>
            <button class="action-btn gallery-shortcut-btn" id="reopen-gallery">
              ${galleryIcon}
              <span>Lihat Galeri Foto Lagi</span>
            </button>
          </div>
          <div class="last-heart-icon">${heartIcon}</div>
        </div>
      `;
      container.appendChild(div);

      // Event listener for reopening gallery directly
      const reopenBtn = div.querySelector("#reopen-gallery");
      if (reopenBtn) {
        reopenBtn.addEventListener("click", () => {
          const gallerySection = document.querySelector(".section-gallery");
          const galleryWrapper = gallerySection ? gallerySection.querySelector(".gallery-wrapper") : null;
          if (gallerySection && galleryWrapper) {
            gsap.to(div, { duration: 0.35, opacity: 0, scale: 0.95, pointerEvents: "none" });
            gallerySection.style.pointerEvents = "auto";
            gallerySection.style.zIndex = "10";
            gsap.fromTo(
              galleryWrapper,
              { opacity: 0, y: 25, scale: 0.92 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.4)",
              }
            );
          }
        });
      }

      return div;
    },

    animate(tl, el) {
      const card = el.querySelector(".closing-card");
      const icon = el.querySelector(".closing-icon-wrap");
      const text = el.querySelector(".closing-text");
      const sig = el.querySelector(".closing-signature");
      const btns = el.querySelectorAll(".action-btn");
      const heart = el.querySelector(".last-heart-icon");

      el.style.pointerEvents = "auto";

      tl.fromTo(
        card,
        { opacity: 0, scale: 0.88, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.5)" }
      )
        .fromTo(
          icon,
          { scale: 0, rotation: -20 },
          { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.8)" },
          "-=0.3"
        )
        .fromTo(
          text,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          sig,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          btns,
          { opacity: 0, y: 18, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.12, ease: "back.out(1.7)" },
          "-=0.1"
        )
        .set(btns, { pointerEvents: "auto" })
        .fromTo(
          heart,
          { scale: 0, opacity: 0 },
          { scale: 1.2, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
        );
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.4, opacity: 0 });
    },
  };
})();
