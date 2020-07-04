<template>
  <v-container class="pa-0 ma-0">
    <v-layout wrap>
      <v-flex xs4>
        <select-list
          v-model="timeUnit"
          :items="selectListItems"
          label="時間単位"
        />
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
import SelectList from '@/components/SelectList.vue';

interface SelectListItem {
  readonly text: string;
  readonly value: TimeUnit;
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

interface Data {
  timeUnit: TimeUnit;
  selectListItems: SelectListItem[];
}

export default Vue.extend({
  name: 'TimeSeriesLineChart',

  components: {
    SelectList,
    LineChart,
  },

  data: (): Data => ({
    timeUnit: 'month',

    selectListItems: [
      { text: '年', value: 'year' },
      { text: '月', value: 'month' },
      { text: '日', value: 'day' },
    ],
  }),

  computed: {
    lineMessageEvents(): LineMessageEvent[] {
      return this.$store.getters['line/lineMessageEvents'];
    },

    chartData(): Chart.ChartData {
      const unit = this.timeUnit;
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
              unit: this.timeUnit,
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
