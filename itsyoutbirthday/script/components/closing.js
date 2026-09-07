(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-closing";

      const text =
        section.text ||
        "Semoga di usia ke-24 ini, harimu selalu dipenuhi tawa, cinta, dan segala hal indah yang kau impikan.";
      const replayText = section.replayText || "Putar Ulang Ucapan ✨";
      const signature = section.signature || "Dengan segenap cinta,<br><strong>Glorius Paskan Danu ❤️</strong>";

      div.innerHTML = `
        <div class="closing-card">
          <span class="closing-icon">🎂</span>
          <p class="closing-text">${text}</p>
          <div class="closing-signature">${signature}</div>
          
          <div class="closing-actions">
            <button class="action-btn replay-btn" id="replay">${replayText}</button>
            <button class="action-btn gallery-shortcut-btn" id="reopen-gallery">Lihat Galeri Foto Lagi 📸</button>
          </div>
          <p class="last-smile">❤️</p>
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
            gsap.to(div, { duration: 0.4, opacity: 0, scale: 0.95, pointerEvents: "none" });
            gallerySection.style.pointerEvents = "auto";
            gallerySection.style.zIndex = "10";
            gsap.fromTo(
              galleryWrapper,
              { opacity: 0, y: 30, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
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
      const icon = el.querySelector(".closing-icon");
      const text = el.querySelector(".closing-text");
      const sig = el.querySelector(".closing-signature");
      const btns = el.querySelectorAll(".action-btn");
      const smile = el.querySelector(".last-smile");

      tl.fromTo(
        card,
        { opacity: 0, scale: 0.85, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }
      )
        .fromTo(
          icon,
          { scale: 0, rotation: -45 },
          { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" },
          "-=0.4"
        )
        .fromTo(
          text,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          sig,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          btns,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.1"
        )
        .set(btns, { pointerEvents: "auto" })
        .fromTo(
          smile,
          { scale: 0, opacity: 0 },
          { scale: 1.4, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
        )
        .to(smile, {
          scale: 1.1,
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          ease: "sine.inOut",
        });
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.5, opacity: 0 });
    },
  };
})();
