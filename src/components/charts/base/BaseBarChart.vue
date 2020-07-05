<script lang="ts">
import Vue, { PropType } from 'vue';
import { Bar, mixins } from 'vue-chartjs';
import { ChartData, ChartOptions } from 'chart.js';

const { reactiveProp } = mixins;

export default Vue.extend({
  name: 'BaseBarChart',

  extends: Bar,

  mixins: [reactiveProp],

  props: {
    chartData: {
      type: Object as PropType<ChartData>,
      required: true,
    },

    options: {
      type: Object as PropType<ChartOptions>,
    },
  },

  mounted(): void {
    (this as unknown as Bar).renderChart(this.chartData, this.options);
  },

  watch: {
    data(): void {
      (this as unknown as Bar).renderChart(this.chartData, this.options);
    },

    options(): void {
      (this as unknown as Bar).renderChart(this.chartData, this.options);
    },
  },
});
</script>
