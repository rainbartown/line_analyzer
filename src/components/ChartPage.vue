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
    <v-layout
      v-if="hasData"
      wrap
      >
      <v-flex xs12>
        <SpeakerPieChart v-if="selectedKey.value === 'speaker'"/>
        <DayOfWeekBarChart v-if="selectedKey.value === 'dayOfWeek'"/>
        <TimeSeriesLineChart v-if="selectedKey.value === 'timeSeries'"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SpeakerPieChart from '@/components/charts/SpeakerPieChart';
import DayOfWeekBarChart from '@/components/charts/DayOfWeekBarChart';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';

export default {
  name: 'ChartPage',
  components: {
    SpeakerPieChart,
    DayOfWeekBarChart,
    TimeSeriesLineChart,
  },
  data: () => ({
    selectedKey: { label: '発言者', value: 'speaker' },
    keys: [
      { label: '発言者', value: 'speaker' },
      { label: '曜日', value: 'dayOfWeek' },
      { label: '時系列', value: 'timeSeries' },
    ],
  }),
  computed: {
    ...mapGetters([
      'messages',
    ]),
    hasData() {
      return (this.messages.length > 0);
    },
  },
};
</script>
