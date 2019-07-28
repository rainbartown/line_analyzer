<template>
  <PieChart :chartData="chartData" :options="options"/>
</template>

<script>
import { mapGetters } from 'vuex';
import palette from 'google-palette';
import PieChart from '@/components/charts/base/PieChart.vue';
import { countMessage, sortCounts } from '@/assets/js/data';

export default {
  name: 'SpeakerPieChart',
  components: {
    PieChart,
  },
  computed: {
    ...mapGetters([
      'messages',
      'speakers',
    ]),
    chartData() {
      const counts = sortCounts(
        Object.entries(countMessage(this.messages, this.speakers, message => message.speaker))
          .map(([name, count]) => ({ name, count })),
        10,
      );
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
