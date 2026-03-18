let activeTab = null;
let startTime = null;
let currentType = null; // productive or mindless

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  trackEnd();

  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleNewTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackEnd();
    handleNewTab(tab);
  }
});

function handleNewTab(tab) {
  if (!tab.url) return;

  const distractingSites = [
    "youtube.com",
    "instagram.com",
    "twitter.com",
    "facebook.com",
    "reddit.com"
  ];

  const isDistracting = distractingSites.some(site =>
    tab.url.includes(site)
  );

  if (isDistracting) {
    activeTab = tab.id;
    startTime = Date.now();
  }
}

function trackEnd() {
  if (!startTime || !currentType) return;

  const duration = Math.floor((Date.now() - startTime) / 60000);

  const today = new Date().toISOString().split("T")[0];

  chrome.storage.local.get(["dailyStats"], (data) => {
    let stats = data.dailyStats || {};

    if (!stats[today]) {
      stats[today] = { productive: 0, mindless: 0 };
    }

    stats[today][currentType] += duration;

    chrome.storage.local.set({ dailyStats: stats });
  });

  startTime = null;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SET_MODE") {
    currentType = msg.value;
  }
});