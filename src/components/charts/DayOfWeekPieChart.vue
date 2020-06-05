<template>
  <PieChart :chartData="chartData" :options="options"/>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import palette from 'google-palette';
import PieChart from '@/components/charts/base/PieChart.vue';
import { countMessage } from '@/assets/js/data';

export default Vue.extend({
  name: 'DayOfWeekPieChart',
  components: {
    PieChart,
  },
  computed: {
    ...mapGetters([
      'messages',
      'daysOfWeek',
    ]),
    chartData() {
      const counts = Object.entries(countMessage(this.messages, this.daysOfWeek,
        (message) => this.daysOfWeek[message.datetime.getDay()]))
        .map(([name, count]) => ({ name, count }));
      return {
        labels: counts.map((el) => el.name),
        datasets: [{
          data: counts.map((el) => el.count),
          backgroundColor: palette('tol-rainbow', counts.length, -1).reverse().map((hex: string) => `#${hex}`),
        }],
      };
    },
    options: () => ({}),
  },
});
</script>
