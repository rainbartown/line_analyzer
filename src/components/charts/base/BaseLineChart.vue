<script lang="ts">
import Vue, { PropType } from 'vue';
import { Line, mixins } from 'vue-chartjs';
import { ChartData, ChartOptions } from 'chart.js';

export default Vue.extend({
  name: 'BaseLineChart',

  extends: Line,

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
    (this as unknown as Line).renderChart(this.chartData, this.options);
  },

  watch: {
    data() {
      (this as unknown as Line).renderChart(this.chartData, this.options);
    },

    options() {
      (this as unknown as Line).renderChart(this.chartData, this.options);
    },
  },
});
</script>
