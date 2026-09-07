(function () {
  window.Components = window.Components || {};

  window.Components.profile = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-profile";

      const photoSrc = section.photo || config.photo || "./img/image copy 4.png";
      const wishTitle = section.wishTitle || "Selamat Ulang Tahun!";
      const wishText = section.wishText || "Dirayakan penuh cinta di usia 24 tahun.";
      const sparkleIcon1 = window.Icons ? window.Icons.sparkle(22) : "";
      const sparkleIcon2 = window.Icons ? window.Icons.sparkle(18) : "";
      const heartIcon = window.Icons ? window.Icons.heart(14) : "";

      div.innerHTML = `
        <div class="profile-wrapper">
          <div class="profile-decorations">
            <span class="profile-sparkle sparkle-tl">${sparkleIcon1}</span>
            <span class="profile-sparkle sparkle-tr">${sparkleIcon2}</span>
            <span class="profile-badge">${heartIcon} 24th Birthday</span>
          </div>
          <img src="${photoSrc}" alt="Foto Spesial" class="profile-picture" />
        </div>
        <div class="wish">
          <h3 class="wish-hbd"></h3>
          <h5 class="wish-text">${wishText}</h5>
        </div>
      `;

      // Split wish title into spans preserving spaces
      const hbd = div.querySelector(".wish-hbd");
      let titleHtml = "";
      for (let i = 0; i < wishTitle.length; i++) {
        const ch = wishTitle[i];
        if (ch === " ") {
          titleHtml += `<span class="char-space">&nbsp;</span>`;
        } else {
          titleHtml += `<span>${ch}</span>`;
        }
      }
      hbd.innerHTML = titleHtml;

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const pic = el.querySelector(".profile-picture");
      const badge = el.querySelector(".profile-badge");
      const sparkles = el.querySelectorAll(".profile-sparkle");
      const titleChars = el.querySelectorAll(".wish-hbd span");
      const wishText = el.querySelector(".wish-text");

      // Reset section opacity
      el.style.opacity = 1;

      // Photo appears with lively scale & rotation
      tl.fromTo(
        pic,
        { scale: 0.4, opacity: 0, rotation: -8 },
        { duration: 0.9, scale: 1, opacity: 1, rotation: 0, ease: "back.out(1.6)" }
      )
        .fromTo(
          badge,
          { scale: 0, opacity: 0 },
          { duration: 0.5, scale: 1, opacity: 1, ease: "back.out(2)" },
          "-=0.4"
        )
        .fromTo(
          sparkles,
          { scale: 0, opacity: 0 },
          { duration: 0.6, scale: 1, opacity: 1, stagger: 0.2, ease: "back.out(2)" },
          "-=0.3"
        )
        // Wish title letters stagger in
        .fromTo(
          titleChars,
          { opacity: 0, y: -25 },
          {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "back.out(1.7)",
            stagger: 0.035,
          },
          "-=0.2"
        )
        // Color each letter to primary theme
        .to(
          titleChars,
          {
            color: "var(--primary)",
            duration: 0.4,
            stagger: 0.025,
            ease: "none",
          },
          "-=0.2"
        )
        // Wish text fades in
        .fromTo(
          wishText,
          { opacity: 0, y: 15 },
          {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          "-=0.1"
        )
        // Pause to appreciate photo & wish
        .to({}, { duration: 3.2 });
    },

    exit(tl, el) {
      tl.to(el, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        scale: 0.96,
        ease: "power2.in",
      });
    },
  };
})();
