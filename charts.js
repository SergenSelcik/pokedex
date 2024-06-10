/**
 * Creates a bar chart using the Chart.js library.
 *
 * @param {number} i - The index of the Pokemon to display stats for.
 * @return {Promise<void>} A Promise that resolves when the chart is created.
 */
async function createChart(i) {
  let [hp, attack, defense, specialAttack, specialDefense, speed] = await loadPokemonStatsPopup(i);
  let ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["HP:", "Attack:", "Defense:", "Sp. Atk:", "Sp. Def:", "Speed:"],
      datasets: [
        {
          label: "Pokemon Stats",
          data: [hp, attack, defense, specialAttack, specialDefense, speed],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          barThickness: 13,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          ticks: {
            stepSize: 50,
          },
        },
      },
    },
  });
}
