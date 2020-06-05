<script lang="ts">
import Vue from 'vue';
import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default Vue.extend({
  name: 'BarChart',
  extends: Bar,
  mixins: [reactiveProp],
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
