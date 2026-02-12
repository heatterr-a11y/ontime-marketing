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

/* -------------------------
   SVG TIMELINE INTERPOLATION
   ------------------------- */
const path = document.getElementById("timelinePath");
const nodes = {
  intent: document.getElementById("intent"),
  decision: document.getElementById("decision"),
  outcome: document.getElementById("outcome")
};

function moveNode(node, t) {
  const length = path.getTotalLength();
  const point = path.getPointAtLength(length * t);
  node.style.transform = `translate(${point.x - 30}px, ${point.y - 30}px)`;
}

if (timeRange && path) {
  timeRange.addEventListener("input", e => {
    const t = e.target.value / 100;

    moveNode(nodes.intent, t * 0.6);
    moveNode(nodes.decision, t * 0.8);
    moveNode(nodes.outcome, t);

    timeRange.setAttribute("aria-valuenow", e.target.value);
  });
}

  /* -------------------------
     INVESTOR MODE
     ------------------------- */
  const investorToggle = document.getElementById("investorToggle");

  if (investorToggle) {
    investorToggle.addEventListener("click", () => {
      document.body.classList.toggle("investor-mode");
      investorToggle.textContent =
        document.body.classList.contains("investor-mode")
          ? "Exit Investor Mode"
          : "Investor Mode";
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
