<template>
  <v-container>
    <v-layout wrap >
      <v-flex xs4>
        <select-list
          v-model="chartComponent"
          :items="selectListItems"
          label="キー"
        />
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <sender-pie-chart v-if="chartComponent === 'SenderPieChart'" />
        <hour-bar-chart v-if="chartComponent === 'HourBarChart'" />
        <day-of-week-bar-chart v-if="chartComponent === 'DayOfWeekBarChart'" />
        <time-series-line-chart v-if="chartComponent === 'TimeSeriesLineChart'" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SenderPieChart from '@/components/charts/SenderPieChart.vue';
import HourBarChart from '@/components/charts/HourBarChart.vue';
import DayOfWeekBarChart from '@/components/charts/DayOfWeekBarChart.vue';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart.vue';
import SelectList from '@/components/SelectList.vue';

const chartComponents = {
  SenderPieChart,
  HourBarChart,
  DayOfWeekBarChart,
  TimeSeriesLineChart,
} as const;

type ChartComponent = keyof typeof chartComponents;

interface SelectListItem {
  readonly text: string;
  readonly value: ChartComponent;
}

interface Data {
  readonly chartComponent: ChartComponent;
  readonly selectListItems: SelectListItem[];
}

export default Vue.extend({
  name: 'ChartPage',

  components: {
    SelectList,
    ...chartComponents,
  },

  data(): Data {
    return {
      chartComponent: 'SenderPieChart',

      selectListItems: [
        { text: '送信者', value: 'SenderPieChart' },
        { text: '時間帯', value: 'HourBarChart' },
        { text: '曜日', value: 'DayOfWeekBarChart' },
        { text: '時系列', value: 'TimeSeriesLineChart' },
      ],
    };
  },
});
</script>
