<template>
  <v-container>
    <v-layout wrap >
      <v-flex xs4>
        <v-select
          v-model="selectedKey"
          item-text="label"
          item-value="value"
          :items="keys"
          label="キー"
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <sender-pie-chart v-if="selectedKey.value === 'sender'" />
        <hour-bar-chart v-if="selectedKey.value === 'hour'" />
        <day-of-week-bar-chart v-if="selectedKey.value === 'dayOfWeek'" />
        <time-series-line-chart v-if="selectedKey.value === 'timeSeries'" />
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

export default Vue.extend({
  name: 'ChartPage',

  components: {
    SenderPieChart,
    HourBarChart,
    DayOfWeekBarChart,
    TimeSeriesLineChart,
  },

  data: () => ({
    selectedKey: { label: '送信者', value: 'sender' },
    keys: [
      { label: '送信者', value: 'sender' },
      { label: '時間帯', value: 'hour' },
      { label: '曜日', value: 'dayOfWeek' },
      { label: '時系列', value: 'timeSeries' },
    ],
  }),
});
</script>
