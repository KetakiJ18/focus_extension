const input = document.getElementById("search");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = input.value;
    window.location.href =
      "https://www.google.com/search?q=" + encodeURIComponent(query);
  }
});

const today = new Date().toISOString().split("T")[0];

chrome.storage.local.get(["dailyStats"], (data) => {
  const stats = data.dailyStats || {};
  const todayStats = stats[today] || { productive: 0, mindless: 0 };

  document.getElementById("wasted").innerText =
    `Wasted: ${(todayStats.mindless / 60).toFixed(1)}h`;

  document.getElementById("focused").innerText =
    `Focus: ${(todayStats.productive / 60).toFixed(1)}h`;
});