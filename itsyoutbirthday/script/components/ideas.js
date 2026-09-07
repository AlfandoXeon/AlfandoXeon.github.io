(function () {
  window.Components = window.Components || {};

  const ENTER = { opacity: 0, y: 30, rotationX: 10, scale: 0.95 };
  const LEAVE = { opacity: 0, y: -30, rotationX: -10, scale: 1.05 };

  window.Components.ideas = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-ideas";

      const title = section.title || "Kamu Dirayakan Olehku";
      const titleEl = document.createElement("div");
      titleEl.className = "ideas-header";
      titleEl.innerHTML = `<span class="ideas-badge">📜 Untaian Rasa</span><h3 class="ideas-main-title">${title}</h3>`;
      div.appendChild(titleEl);

      const lines = section.lines || [];
      const versesContainer = document.createElement("div");
      versesContainer.className = "ideas-verses-container";

      lines.forEach((line, i) => {
        const isLast = i === lines.length - 1;
        const p = document.createElement("div");
        p.className = isLast ? "idea-line idea-special" : "idea-line";
        p.innerHTML = `<div class="idea-line-inner">${line}</div>`;
        versesContainer.appendChild(p);
      });

      div.appendChild(versesContainer);

      // Big letters / highlight (e.g. "24" or "7")
      if (section.bigLetters) {
        const p = document.createElement("div");
        p.className = "idea-big-letters";
        p.innerHTML = section.bigLetters
          .split("")
          .map((ch) => `<span>${ch}</span>`)
          .join("");
        div.appendChild(p);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const header = el.querySelector(".ideas-header");
      const regularLines = el.querySelectorAll(".idea-line:not(.idea-special)");
      const specialLine = el.querySelector(".idea-special");
      const bigLetters = el.querySelectorAll(".idea-big-letters span");

      // Show header
      tl.fromTo(
        header,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
      );

      // Display each poetry verse
      regularLines.forEach((line) => {
        tl.fromTo(
          line,
          { ...ENTER },
          { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.8, ease: "power2.out" }
        );

        const strong = line.querySelector("strong");
        if (strong) {
          tl.to(strong, {
            duration: 0.5,
            scale: 1.15,
            color: "var(--primary)",
            textShadow: "0 0 16px rgba(244, 63, 94, 0.6)",
            ease: "back.out(2)",
          });
        }

        // Reading duration - 3 seconds per verse
        tl.to(line, { duration: 0.6, ...LEAVE, ease: "power2.in" }, "+=3.0");
      });

      // Special last line (climax)
      if (specialLine) {
        tl.fromTo(
          specialLine,
          { opacity: 0, scale: 0.7, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "back.out(1.8)" }
        );

        const heartOrSpan = specialLine.querySelector("span");
        if (heartOrSpan) {
          tl.to(heartOrSpan, {
            duration: 0.6,
            scale: 1.3,
            repeat: 3,
            yoyo: true,
            ease: "power1.inOut",
          });
        }

        tl.to(
          specialLine,
          {
            duration: 0.7,
            scale: 0.9,
            opacity: 0,
            y: -20,
            ease: "power2.in",
          },
          "+=3.5"
        );
      }

      // Hide header
      tl.to(header, { duration: 0.5, opacity: 0, y: -20 }, "-=0.4");

      // Big letters display
      if (bigLetters.length) {
        tl.fromTo(
          bigLetters,
          { scale: 2.5, opacity: 0, rotation: 12 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "expo.out", stagger: 0.15 }
        ).to(
          bigLetters,
          {
            duration: 0.7,
            scale: 2.5,
            opacity: 0,
            rotation: -12,
            ease: "expo.in",
            stagger: 0.1,
          },
          "+=1.8"
        );
      }
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.4, opacity: 0 });
    },
  };
})();
