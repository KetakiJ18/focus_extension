chrome.storage.local.get(["dailyStats"], (data) => {
  const stats = data.dailyStats || {};
  const heatmapDiv = document.getElementById("heatmap");

  const days = Object.keys(stats).slice(-7);

  days.forEach(day => {
    const div = document.createElement("div");

    const hours = (stats[day].productive / 60).toFixed(1);

    div.innerText = `${day}: ${hours} hrs`;
    heatmapDiv.appendChild(div);
  });
});