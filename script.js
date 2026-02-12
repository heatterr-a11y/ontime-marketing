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
     TEMPORAL ENGINE (TIMELINE)
     ------------------------- */
  const timeRange = document.getElementById("timeRange");
  const intent = document.getElementById("intent");
  const decision = document.getElementById("decision");
  const outcome = document.getElementById("outcome");

  function syncTimeline(value) {
    const base = value * 2;

    intent.style.transform = `translateX(${base}px)`;
    decision.style.transform = `translateX(${base * 1.4}px)`;
    outcome.style.transform = `translateX(${base * 1.9}px)`;
  }

  if (timeRange && intent && decision && outcome) {
    timeRange.addEventListener("input", e => {
      const value = Number(e.target.value);
      syncTimeline(value);
      timeRange.setAttribute("aria-valuenow", value);
    });

    syncTimeline(0);
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
