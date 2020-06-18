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
        <sender-table v-if="selectedKey.value === 'sender'" />
        <hour-table v-else-if="selectedKey.value === 'hour'" />
        <day-of-week-table v-else-if="selectedKey.value === 'dayOfWeek'" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SenderTable from '@/components/tables/SenderTable.vue';
import HourTable from '@/components/tables/HourTable.vue';
import dayOfWeekTable from '@/components/tables/DayOfWeekTable.vue';

export default Vue.extend({
  name: 'TablePage',

  components: {
    SenderTable,
    HourTable,
    dayOfWeekTable,
  },

  data: () => ({
    selectedKey: { label: '送信者', value: 'sender' },
    keys: [
      { label: '送信者', value: 'sender' },
      { label: '時間帯', value: 'hour' },
      { label: '曜日', value: 'dayOfWeek' },
    ],
  }),
});
</script>
