<script lang="ts">
import Vue, { PropType } from 'vue';
import { Pie, mixins } from 'vue-chartjs';
import { ChartData, ChartOptions } from 'chart.js';

export default Vue.extend({
  name: 'PieChart',

  extends: Pie,

  mixins: [mixins.reactiveProp],

  props: {
    chartData: {
      type: Object as PropType<ChartData>,
      required: true,
    },

    options: {
      type: Object as PropType<ChartOptions>,
    },
  },

  mounted() {
    (this as unknown as Pie).renderChart(this.chartData, this.options);
  },

  watch: {
    chartData() {
      (this as unknown as Pie).renderChart(this.chartData, this.options);
    },

    options() {
      (this as unknown as Pie).renderChart(this.chartData, this.options);
    },
  },
});
</script>
