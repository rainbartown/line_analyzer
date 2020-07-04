<template>
  <v-container class="pa-0 ma-0">
    <v-layout wrap>
      <v-flex xs4>
        <v-select
          v-model="selectedUnit"
          item-text="label"
          item-value="value"
          :items="units"
          label="時間単位"
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <line-chart :chartData="chartData" :options="chartOptions" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from 'chart.js';
import Color from 'color';
import { generateTimeSequence } from '@/assets/js/common/time-sequence';
import { TimeUnit, floorTime } from '@/assets/js/common/time-unit';
import * as group from '@/assets/js/common/group';
import { LineMessageEvent } from '@/assets/js/line/line-event';
import LineChart from '@/components/charts/base/LineChart.vue';

interface UnitListItem {
  label: string;
  value: TimeUnit;
}

const getCountRecords = (events: LineMessageEvent[], unit: TimeUnit):
  group.CountRecord<number>[] => {
  const groupMap = group.groupBy(events, (event) => floorTime(event.datetime, unit).getTime());

  const start = events[0].datetime;
  const end = events[events.length - 1].datetime;
  const datetimeSequence = generateTimeSequence(start, end, unit);
  const timeSequence = datetimeSequence.map((datetime) => datetime.getTime());
  const countRecords = group.getCountRecords(timeSequence, groupMap);

  return countRecords;
};

const transformToChartPoints = (countRecords: group.CountRecord<number>[]): Chart.ChartPoint[] => {
  const data = countRecords.map(({ key: time, count }) => ({ t: time, y: count }));

  return data;
};

export default Vue.extend({
  name: 'TimeSeriesLineChart',

  components: {
    LineChart,
  },

  data() {
    return {
      selectedUnit: { label: '月', value: 'month' } as UnitListItem,
      units: [
        { label: '年', value: 'year' },
        { label: '月', value: 'month' },
        { label: '日', value: 'day' },
      ] as UnitListItem[],
    };
  },

  computed: {
    lineMessageEvents(): LineMessageEvent[] {
      return this.$store.getters['line/lineMessageEvents'];
    },

    chartData(): Chart.ChartData {
      const unit = this.selectedUnit.value;
      const countRecords = getCountRecords(this.lineMessageEvents, unit);

      return {
        datasets: [{
          label: 'メッセージ数',
          data: transformToChartPoints(countRecords),
          lineTension: 0,
          borderColor: Color(this.$vuetify.theme.currentTheme.primary).darken(0.5).string(),
          backgroundColor: Color(this.$vuetify.theme.currentTheme.primary).alpha(0.1).string(),
        }],
      };
    },

    chartOptions(): Chart.ChartOptions {
      return {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: this.selectedUnit.value,
              displayFormats: {
                year: 'YYYY',
                month: 'YYYY/MM',
                day: 'MM/DD',
              },
            },
            ticks: {
              source: 'auto',
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      };
    },
  },
});
</script>
