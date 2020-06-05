<script lang="ts">
import Vue from 'vue';
import { Pie, mixins } from 'vue-chartjs';

export default Vue.extend({
  name: 'PieChart',
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
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
