<template>
  <PieChart :chartData="chartData" :options="options"/>
</template>

<script>
import { mapGetters } from 'vuex';
import palette from 'google-palette';
import PieChart from '@/components/charts/base/PieChart';
import { countMessage } from '@/modules/data';

export default {
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
        message => this.daysOfWeek[message.datetime.getDay()]))
        .map(([name, count]) => ({ name, count }));
      return {
        labels: counts.map(el => el.name),
        datasets: [{
          data: counts.map(el => el.count),
          backgroundColor: palette('tol-rainbow', counts.length, -1).reverse().map(hex => `#${hex}`),
        }],
      };
    },
    options: () => ({}),
  },
};
</script>
