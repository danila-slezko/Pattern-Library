// File#: _4_stats-card
// Usage: codyhouse.co/license
(function () {
  var statsCard = document.getElementById("stats-card-chart-1");
  if (statsCard) {
    new Chart({
      element: statsCard,
      type: "area",
      xAxis: {
        labels: false,
        guides: false,
      },
      yAxis: {
        labels: false,
        range: [0, 16], // 16 is the max value in the chart data
        step: 1,
      },
      datasets: [
        {
          data: [1, 2, 3, 12, 8, 7, 10, 4, 9, 5, 16, 3],
        },
      ],
      tooltip: {
        enabled: true,
      },
      padding: 6,
      animate: true,
    });
  }
})();
