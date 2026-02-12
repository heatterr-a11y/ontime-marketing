/* =========================================================
   OnTime Marketing — Core Interaction Engine
   Works on GitHub Pages, no frameworks, no race conditions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     TIMESTAMP (Hero)
     ------------------------- */
  const timestamp = document.querySelector(".timestamp");
  if (timestamp) {
    const now = new Date();
    timestamp.textContent = `SYNCED · ${now.toLocaleTimeString()}`;
  }

  /* -------------------------
     THEME TOGGLE
     ------------------------- */
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light");
      themeToggle.setAttribute("aria-pressed", String(isLight));
    });
  }

  /* -------------------------
     LATENCY IMPACT SCORE
     ------------------------- */
  const delayInput = document.getElementById("delayInput");
  const scoreValue = document.getElementById("scoreValue");

  function calculateImpact(ms) {
    // Non-linear curve so small delays matter more
    const normalized = Math.min(ms, 1000) / 1000;
    return Math.max(0, Math.round((1 - Math.pow(normalized, 0.6)) * 100));
  }

  function updateLatencyScore() {
    if (!delayInput || !scoreValue) return;
    const ms = Number(delayInput.value) || 0;
    scoreValue.textContent = `${calculateImpact(ms)}% retained efficiency`;
  }

  if (delayInput) {
    delayInput.addEventListener("input", updateLatencyScore);
    updateLatencyScore();
  }

document.addEventListener("DOMContentLoaded", () => {

  const path = document.getElementById("timelinePath");
  const slider = document.getElementById("timeRange");

  const intent = document.getElementById("intent");
  const decision = document.getElementById("decision");
  const outcome = document.getElementById("outcome");

  if (!path || !slider || !intent || !decision || !outcome) return;

  // Wait for SVG layout
  requestAnimationFrame(() => {

    const length = path.getTotalLength();

    function move(node, progress) {
      const point = path.getPointAtLength(length * progress);
      node.style.transform =
        `translate(${point.x - 30}px, ${point.y - 20}px)`;
    }

    function update(value) {
      const t = value / 100;

      move(intent, t * 0.5);
      move(decision, t * 0.75);
      move(outcome, t);

      slider.setAttribute("aria-valuenow", value);
    }

    slider.addEventListener("input", e => {
      update(Number(e.target.value));
    });

    update(0);
  });

});

/* -------------------------
   INVESTOR MODE — COPY + METRICS
   ------------------------- */
const investorCopy = {
  on: {
    headline: "Predictive Temporal Infrastructure",
    subtitle: "Quantified latency advantage across synchronized networks."
  },
  off: {
    headline: "Make Time Obsolete.",
    subtitle: "OnTime Marketing synchronizes intent, decision, and action."
  }
};

const heroTitle = document.querySelector(".hero-content h1");
const heroSubtitle = document.querySelector(".subtitle");

if (investorToggle) {
  investorToggle.addEventListener("click", () => {
    const active = document.body.classList.toggle("investor-mode");
    investorToggle.textContent = active ? "Exit Investor Mode" : "Investor Mode";

    heroTitle.textContent = active
      ? investorCopy.on.headline
      : investorCopy.off.headline;

    heroSubtitle.textContent = active
      ? investorCopy.on.subtitle
      : investorCopy.off.subtitle;

    scoreValue.textContent = active
      ? "↑ 37% efficiency retention @ 250ms"
      : scoreValue.textContent;
  });
}

  /* -------------------------
     INVESTOR DECK EXPORT
     ------------------------- */
  const exportDeck = document.getElementById("exportDeck");
  const deckTemplate = document.getElementById("deckTemplate");

  if (exportDeck && deckTemplate) {
    exportDeck.addEventListener("click", () => {
      const slides = [...deckTemplate.content.querySelectorAll(".slide")];

      const deckWindow = window.open("", "_blank");
      if (!deckWindow) return;

      deckWindow.document.write(`
        <html>
        <head>
          <title>OnTime — Investor Deck</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              margin: 0;
              padding: 40px;
              background: #0a0a0a;
              color: #ffffff;
            }
            .slide {
              margin-bottom: 80px;
              page-break-after: always;
            }
            h1, h2 {
              color: #00f0ff;
            }
          </style>
        </head>
        <body>
          ${slides.map(slide => slide.outerHTML).join("")}
        </body>
        </html>
      `);

      deckWindow.document.close();
    });
  }

});
/* -------------------------
   VOICE NARRATION
   ------------------------- */
const slides = document.querySelectorAll("[data-narration]");
let currentUtterance = null;

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.rate = 0.9;
  currentUtterance.pitch = 1;
  speechSynthesis.speak(currentUtterance);
}

slides.forEach(slide => {
  slide.addEventListener("mouseenter", () => {
    speak(slide.dataset.narration);
  });
});
