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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlay = document.getElementById("focus-overlay");
    if (overlay) overlay.remove();
  }
});

function allowAccess() {
  setMode("productive");
  document.getElementById("focus-overlay").remove();
}

function delayAccess() {
  let seconds = 5;
  const countdown = document.getElementById("countdown");

  const interval = setInterval(() => {
    countdown.innerText = `Wait ${seconds}s...`;
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      setMode("mindless");
      document.getElementById("focus-overlay").remove();
    }
  }, 1000);
}

function setMode(type) {
  chrome.runtime.sendMessage({
    type: "SET_MODE",
    value: type
  });
}