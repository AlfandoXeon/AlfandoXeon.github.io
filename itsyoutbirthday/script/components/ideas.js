(function () {
  window.Components = window.Components || {};

  const ENTER = { opacity: 0, y: 24, rotationX: 8, scale: 0.96 };
  const LEAVE = { opacity: 0, y: -24, rotationX: -8, scale: 1.04 };

  window.Components.ideas = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-ideas";

      const title = section.title || "Kamu Dirayakan Olehku";
      const scrollIcon = window.Icons ? window.Icons.scroll(14) : "";
      const skipIcon = window.Icons ? window.Icons.skip(13) : "";

      div.innerHTML = `
        <div class="ideas-header">
          <div class="ideas-header-top">
            <span class="ideas-badge">
              ${scrollIcon}
              <span>Untaian Rasa</span>
            </span>
            <button class="skip-poem-btn" id="skip-poem" title="Lewati puisi ini">
              <span>Lewati</span>
              ${skipIcon}
            </button>
          </div>
          <h3 class="ideas-main-title">${title}</h3>
        </div>

        <div class="ideas-verses-container">
          ${(section.lines || [])
            .map((line, i) => {
              const isLast = i === (section.lines || []).length - 1;
              return `
                <div class="idea-line ${isLast ? "idea-special" : ""}">
                  <div class="idea-line-inner">${line}</div>
                </div>
              `;
            })
            .join("")}
        </div>

        ${
          section.bigLetters
            ? `
          <div class="idea-big-letters">
            ${section.bigLetters
              .split("")
              .map((ch) => `<span>${ch}</span>`)
              .join("")}
          </div>
        `
            : ""
        }
      `;

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const header = el.querySelector(".ideas-header");
      const regularLines = el.querySelectorAll(".idea-line:not(.idea-special)");
      const specialLine = el.querySelector(".idea-special");
      const bigLetters = el.querySelectorAll(".idea-big-letters span");
      const skipBtn = el.querySelector("#skip-poem");

      // Set pointer-events so skip button can be clicked
      el.style.pointerEvents = "auto";

      // Label at start of poem
      tl.addLabel("poemStart");

      // Show header
      tl.fromTo(
        header,
        { opacity: 0, y: -20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
      );

      // Display each poetry verse with snappier, comfortable timing
      regularLines.forEach((line) => {
        tl.fromTo(
          line,
          { ...ENTER },
          { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.6, ease: "power2.out" }
        );

        const strong = line.querySelector("strong");
        if (strong) {
          tl.to(strong, {
            duration: 0.4,
            scale: 1.12,
            color: "var(--primary)",
            textShadow: "0 0 16px rgba(244, 63, 94, 0.6)",
            ease: "back.out(2)",
          });
        }

        // Reduced delay to ~1.8s for smooth, engaging reading flow
        tl.to(line, { duration: 0.5, ...LEAVE, ease: "power2.in" }, "+=1.8");
      });

      // Special last line (climax)
      if (specialLine) {
        tl.fromTo(
          specialLine,
          { opacity: 0, scale: 0.75, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.8)" }
        );

        tl.to(
          specialLine,
          {
            duration: 0.6,
            scale: 0.92,
            opacity: 0,
            y: -20,
            ease: "power2.in",
          },
          "+=2.4"
        );
      }

      // Hide header
      tl.to(header, { duration: 0.4, opacity: 0, y: -15 }, "-=0.3");

      // Big letters display (e.g. "24")
      if (bigLetters.length) {
        tl.fromTo(
          bigLetters,
          { scale: 2.2, opacity: 0, rotation: 10 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: "expo.out", stagger: 0.12 }
        ).to(
          bigLetters,
          {
            duration: 0.6,
            scale: 2.2,
            opacity: 0,
            rotation: -10,
            ease: "expo.in",
            stagger: 0.08,
          },
          "+=1.4"
        );
      }

      // Label at end of poem
      tl.addLabel("afterPoem");

      // Skip button functionality
      if (skipBtn) {
        skipBtn.onclick = (e) => {
          e.stopPropagation();
          // Fade out currently visible poem elements quickly and seek
          gsap.to(el.querySelectorAll(".idea-line, .ideas-header, .idea-big-letters"), {
            duration: 0.2,
            opacity: 0,
            onComplete: () => {
              tl.seek("afterPoem");
              tl.play();
            },
          });
        };
      }
    },

    exit(tl, el) {
      tl.to(el, {
        duration: 0.4,
        opacity: 0,
        onComplete: () => {
          el.style.pointerEvents = "none";
        },
      });
    },
  };
})();
