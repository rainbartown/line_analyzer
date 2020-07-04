<template>
  <pie-chart :chartData="chartData" />
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from 'chart.js';
import { getPieChartCountRecords, getPieChartColors } from '@/assets/js/line/chart/pie-chart';
import { LineMessageEvent } from '@/assets/js/line/line-event';
import PieChart from '@/components/charts/base/PieChart.vue';
import { getCountRecords } from '@/components/tables/SenderTable.vue';

export default Vue.extend({
  name: 'SenderPieChart',

  components: {
    PieChart,
  },

  computed: {
    members(): Set<string> {
      return this.$store.getters['line/members'];
    },

    lineMessageEvents(): LineMessageEvent[] {
      return this.$store.getters['line/lineMessageEvents'];
    },

    chartData(): Chart.ChartData {
      const countRecords = getCountRecords(this.lineMessageEvents, this.members);
      const pieChartCountRecords = getPieChartCountRecords(countRecords, 10);
      const colors = getPieChartColors(pieChartCountRecords);

      const chartData = {
        labels: pieChartCountRecords.map((record) => record.key),
        datasets: [{
          data: pieChartCountRecords.map((record) => record.count),
          backgroundColor: colors,
        }],
      };

      return chartData;
    },
  },
});
</script>
