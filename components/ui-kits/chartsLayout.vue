<template>
  <div>
    <canvas id="chart" width="350" height="350"></canvas>
  </div>
</template>

<script setup>
import { Chart } from "chart.js/auto";

const data = {
  labels: ["Todo", "In Progress", "Done"],
  datasets: [
    {
      data: [40, 40, 20],
      backgroundColor: ["#F17105", "#FDCA40", "#4E3EC8"],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "pie",
  data: data,
};

onMounted(() => {
  const myChart = new Chart(document.getElementById("chart"), config);
});
</script>
