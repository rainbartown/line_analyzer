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
        <LineChart :chartData="chartData" :options="options"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Color from 'color';
import LineChart from '@/components/charts/base/LineChart.vue';
import { Message, generateTimeSequence } from '@/assets/js/data';
import { UnitType, DateTimeUnit } from '@/assets/js/date-time';
import { ChartDataSets, ChartScales } from 'chart.js';

interface TimeSeriesChartPoint {
  t: Date;
  y: number;
}

/**
 * 時系列データを作成
 */
const generateTimeSeriesData = (messages: Message[], unit: UnitType) => {
  // 時系列シーケンスを生成
  const start = messages[0].datetime;
  const end = messages[messages.length - 1].datetime;
  const sequence = generateTimeSequence(start, end, unit);
  // データを初期化
  const data: {[time: number]: TimeSeriesChartPoint} = {};
  sequence.forEach((datetime) => {
    const time = datetime.getTime();
    data[time] = { t: datetime, y: 0 };
  });
  // カウント
  messages.forEach((message) => {
    const time = (new DateTimeUnit(message.datetime, unit)).datetime.getTime();
    data[time].y += 1;
  });
  return Object.values(data);
};

interface UnitListItem {
  label: string;
  value: UnitType;
}

export default Vue.extend({
  name: 'TimeSeriesLineChart',
  components: {
    LineChart,
  },
  data(): { selectedUnit: UnitListItem; units: UnitListItem[] } {
    return {
      selectedUnit: { label: '月', value: 'month' },
      units: [
        { label: '年', value: 'year' },
        { label: '月', value: 'month' },
        { label: '日', value: 'day' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'messages',
    ]),
    chartData(): { datasets: ChartDataSets[] } {
      return {
        datasets: [{
          label: '発言回数',
          data: generateTimeSeriesData(this.messages, this.selectedUnit.value),
          lineTension: 0,
          borderColor: Color(this.$vuetify.theme.currentTheme.primary).darken(0.5).string(),
          backgroundColor: Color(this.$vuetify.theme.currentTheme.primary).alpha(0.1).string(),
        }],
      };
    },
    options(): { scales: ChartScales } {
      return {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: this.selectedUnit.value,
              displayFormats: {
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
