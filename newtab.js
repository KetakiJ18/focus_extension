const today = new Date().toISOString().split("T")[0];

chrome.storage.local.get(["dailyStats"], (data) => {
    const stats = data.dailyStats || {};
    const todayStats = stats[today] || { productive: 0, mindless: 0 };

    const wasted = (todayStats.mindless / 60).toFixed(1);
    const focused = (todayStats.productive / 60).toFixed(1);

    document.getElementById("wasted").innerText =
        `${wasted} hrs wasted today`;

    document.getElementById("focused").innerText =
        `${focused} hrs focused`;
});