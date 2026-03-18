chrome.storage.local.get(["dailyStats"], (data) => {
  const stats = data.dailyStats || {};
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
});