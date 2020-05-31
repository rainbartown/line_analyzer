<template>
  <BarChart :chartData="chartData" :options="options"/>
</template>

<script>
import { mapGetters } from 'vuex';
import Color from 'color';
import BarChart from '@/components/charts/base/BarChart.vue';
import { countMessage } from '@/assets/js/data';

export default {
  name: 'HourBarChart',
  components: {
    BarChart,
  },
  computed: {
    ...mapGetters([
      'messages',
      'hours',
    ]),
    chartData() {
      const counts = Object.entries(countMessage(this.messages, this.hours,
        (message) => this.hours[message.datetime.getHours()]))
        .map(([name, count]) => ({ name, count }));
      return {
        labels: counts.map((el) => el.name),
        datasets: [{
          label: '発言回数',
          data: counts.map((el) => el.count),
          backgroundColor: Color(this.$vuetify.theme.currentTheme.primary).darken(0.5).string(),
        }],
      };
    },
    options: () => ({
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    }),
  },
};
</script>
