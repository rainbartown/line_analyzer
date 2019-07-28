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
      <v-flex xs12>
        <SpeakerTable v-if="selectedKey.value === 'speaker'"/>
        <HourTable v-if="selectedKey.value === 'hour'"/>
        <dayOfWeekTable v-if="selectedKey.value === 'dayOfWeek'"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SpeakerTable from '@/components/tables/SpeakerTable.vue';
import HourTable from '@/components/tables/HourTable.vue';
import dayOfWeekTable from '@/components/tables/DayOfWeekTable.vue';

export default {
  name: 'TablePage',
  components: {
    SpeakerTable,
    HourTable,
    dayOfWeekTable,
  },
  data: () => ({
    selectedKey: { label: '発言者', value: 'speaker' },
    keys: [
      { label: '発言者', value: 'speaker' },
      { label: '時間帯', value: 'hour' },
      { label: '曜日', value: 'dayOfWeek' },
    ],
  }),
};
</script>
