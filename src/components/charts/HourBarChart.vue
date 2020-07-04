<template>
  <bar-chart :chartData="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from 'chart.js';
import Color from 'color';
import { LineMessageEvent } from '@/assets/js/line/line-event';
import BarChart from '@/components/charts/base/BarChart.vue';
import { getCountRecords } from '@/components/tables/HourTable.vue';

export default Vue.extend({
  name: 'HourBarChart',

  components: {
    BarChart,
  },

  data: () => ({
    chartOptions: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    } as Chart.ChartOptions,
  }),

  computed: {
    lineMessageEvents(): LineMessageEvent[] {
      return this.$store.getters['line/lineMessageEvents'];
    },

    chartData(): Chart.ChartData {
      const countRecords = getCountRecords(this.lineMessageEvents);
      const color = Color(this.$vuetify.theme.currentTheme.primary).darken(0.5).string();

      const chartData: Chart.ChartData = {
        labels: countRecords.map((record) => record.key),
        datasets: [{
          label: 'メッセージ数',
          data: countRecords.map((record) => record.count),
          backgroundColor: color,
        }],
      };

      return chartData;
    },
  },
});
</script>
