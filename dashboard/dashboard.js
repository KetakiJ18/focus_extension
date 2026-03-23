// 📅 GET TODAY
const today = new Date().toISOString().split("T")[0];

// 📊 LOAD STATS
chrome.storage.local.get(["dailyStats"], (data) => {
  const stats = data.dailyStats || {};
  const todayStats = stats[today] || { productive: 0, mindless: 0 };

  document.getElementById("focusTime").innerText =
    `Focus: ${(todayStats.productive / 60).toFixed(1)} hrs`;

  document.getElementById("wasteTime").innerText =
    `Wasted: ${(todayStats.mindless / 60).toFixed(1)} hrs`;

  renderHeatmap(stats);
});

// 🔥 HEATMAP
function renderHeatmap(stats) {
  const heatmap = document.getElementById("heatmap");
  const days = Object.keys(stats).slice(-28);

  days.forEach(day => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    const hours = stats[day].productive / 60;

    if (hours > 3) cell.style.background = "#4caf50";
    else if (hours > 1) cell.style.background = "#81c784";
    else if (hours > 0) cell.style.background = "#c8e6c9";

    heatmap.appendChild(cell);
  });
}

// 🌐 LOAD SITES
chrome.storage.local.get(["sites"], (data) => {
  const sites = data.sites || [
    "youtube.com",
    "instagram.com",
    "twitter.com"
  ];

  renderSites(sites);
});

// ➕ ADD SITE
document.getElementById("addSite").onclick = () => {
  const input = document.getElementById("siteInput");
  const newSite = input.value.trim();

  if (!newSite) return;

  chrome.storage.local.get(["sites"], (data) => {
    let sites = data.sites || [];

    if (!sites.includes(newSite)) {
      sites.push(newSite);
      chrome.storage.local.set({ sites });
      renderSites(sites);
    }
  });

  input.value = "";
};

// 🗑 REMOVE SITE
function renderSites(sites) {
  const list = document.getElementById("siteList");
  list.innerHTML = "";

  sites.forEach(site => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${site} 
      <button data-site="${site}">Remove</button>
    `;

    li.querySelector("button").onclick = () => {
      const updated = sites.filter(s => s !== site);
      chrome.storage.local.set({ sites: updated });
      renderSites(updated);
    };

    list.appendChild(li);
  });
}