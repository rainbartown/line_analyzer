<script lang="ts">
import Vue from 'vue';
import { Line, mixins } from 'vue-chartjs';

export default Vue.extend({
  name: 'LineChart',
  extends: Line,
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
