(function () {
  window.Components = window.Components || {};

  window.Components.chatbox = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-chatbox";

      const senderName = section.sender || "Glorius Paskan Danu";
      const btnText = section.buttonText || "Kirim 💌";

      div.innerHTML = `
        <div class="text-box">
          <div class="chat-header">
            <span class="chat-avatar">💌</span>
            <div class="chat-sender-info">
              <span class="chat-sender-name">${senderName}</span>
              <span class="chat-status">mengetik pesan manis...</span>
            </div>
          </div>
          <p class="hbd-chatbox"></p>
          <button class="fake-btn" type="button">${btnText}</button>
        </div>
      `;

      // Split message into spans preserving whitespace & linebreaks
      const chatbox = div.querySelector(".hbd-chatbox");
      const msg = section.message || "Selamat Ulang Tahun!";
      
      let html = "";
      for (let i = 0; i < msg.length; i++) {
        const char = msg[i];
        if (char === "\n") {
          html += "<br/>";
        } else if (char === " ") {
          html += `<span class="char-space">&nbsp;</span>`;
        } else {
          html += `<span class="char">${char}</span>`;
        }
      }
      chatbox.innerHTML = html;

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const chars = el.querySelectorAll(".hbd-chatbox span");
      const textBox = el.querySelector(".text-box");
      const fakeBtn = el.querySelector(".fake-btn");
      const status = el.querySelector(".chat-status");

      // Dynamic duration based on character count (approx 20 chars per second for pleasant typing)
      const typeDuration = Math.min(Math.max(chars.length * 0.03, 1.8), 3.5);
      // Reading pause based on message length (at least 3.5s up to 6.5s)
      const readPause = Math.min(Math.max(chars.length * 0.035, 3.5), 7.0);

      tl.from(textBox, {
        duration: 0.7,
        scale: 0.8,
        opacity: 0,
        y: 30,
        ease: "back.out(1.5)",
      })
        .from(
          fakeBtn,
          {
            duration: 0.4,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .to(chars, {
          duration: typeDuration,
          visibility: "visible",
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          onComplete: () => {
            if (status) status.textContent = "terkirim dengan cinta ❤️";
          },
        })
        .to(
          fakeBtn,
          {
            duration: 0.3,
            backgroundColor: "var(--primary)",
            scale: 1.05,
          },
          `+=${readPause}`
        )
        .to(fakeBtn, {
          duration: 0.2,
          scale: 1,
        })
        .to(
          textBox,
          {
            duration: 0.6,
            scale: 0.85,
            opacity: 0,
            y: -60,
            ease: "power2.in",
          },
          "+=0.8"
        );
    },

    exit(tl, el) {
      // Handled in animate
    },
  };
})();
