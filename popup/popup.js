document.addEventListener("DOMContentLoaded", () => {
  setupDashboardButton();
  renderHeatmap();
});


// 🔘 Open Dashboard
function setupDashboardButton() {
  const btn = document.getElementById("openDashboard");

  if (!btn) return;

  btn.onclick = () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("dashboard/dashboard.html")
    });
  };
}


// 📊 Heatmap Renderer
function renderHeatmap() {
  chrome.storage.local.get(["dailyStats"], (data) => {
    const stats = data.dailyStats || {};
    const heatmap = document.getElementById("heatmap");

    if (!heatmap) return;

    heatmap.innerHTML = "";

    // 🧠 Sort dates properly
    const days = Object.keys(stats)
      .sort()
      .slice(-28);

    // 🟥 Empty state
    if (days.length === 0) {
      heatmap.innerHTML = "<p style='color: gray;'>No data yet</p>";
      return;
    }

    days.forEach(day => {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const hours = (stats[day]?.productive || 0) / 60;

      // 🎨 Smooth intensity scale
      const intensity = Math.min(hours / 4, 1); // cap at 4h

      cell.style.background = `rgba(34,197,94,${intensity})`;

      // 🧠 Tooltip (HUGE UX boost)
      cell.title = `${day} → ${hours.toFixed(1)} hrs`;

      heatmap.appendChild(cell);
    });
  });
}