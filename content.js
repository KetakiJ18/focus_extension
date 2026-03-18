const distractingSites = [
  "youtube.com",
  "instagram.com",
  "twitter.com",
  "facebook.com",
  "reddit.com"
];

function isDistractingSite(url) 
{
  return distractingSites.some(site => url.includes(site));
}

if (isDistractingSite(window.location.href)) {
  showOverlay();
}

function showOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "focus-overlay";

    overlay.innerHTML = `
    <div class="focus-box">
        <h1>Pause.</h1>
        <p class="subtitle">Why are you opening this?</p>

        <div class="buttons">
        <button class="primary" id="learn">Learn</button>
        <button class="primary" id="work">Work</button>
        <button class="danger" id="scroll">Just Scrolling</button>
        </div>

        <p id="countdown" class="countdown"></p>
    </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("learn").onclick = allowAccess;
    document.getElementById("work").onclick = allowAccess;
    document.getElementById("scroll").onclick = delayAccess;
}

function allowAccess() {
  document.getElementById("focus-overlay").remove();
  updateStats("productive");
}

function delayAccess() {
  let seconds = 5;
  const countdown = document.getElementById("countdown");

  const interval = setInterval(() => {
    countdown.innerText = `Wait ${seconds}s...`;
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      document.getElementById("focus-overlay").remove();
      updateStats("mindless");
    }
  }, 1000);
}

function updateStats(type) {
  const today = new Date().toISOString().split("T")[0];

  chrome.storage.local.get(["dailyStats"], (data) => {
    let stats = data.dailyStats || {};

    if (!stats[today]) {
      stats[today] = { productive: 0, mindless: 0 };
    }

    stats[today][type] += 5; // assume 5 min session (MVP shortcut)

    chrome.storage.local.set({ dailyStats: stats });
  });
}