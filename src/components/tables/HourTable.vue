<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableItems"
    disable-pagination
    hide-default-footer
    no-data-text="データがありません"
    :mobile-breakpoint="0"
  >
    <!--
    <template v-slot:items="props">
      <td style="text-align: center">{{ props.item.name }}</td>
      <td style="text-align: right">{{ props.item.count }}</td>
    </template>
    -->
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import * as group from '@/assets/js/common/group';
import { hourRanges } from '@/assets/js/common/time';
import { LineMessageEvent } from '@/assets/js/line/line-event';

const getCountRecords = (events: LineMessageEvent[]): group.CountRecord<string>[] => {
  const groupMap = group.groupBy(events, (event) => hourRanges[event.datetime.getHours()]);
  const countRecords = group.getCountRecords(hourRanges, groupMap);

  return countRecords;
};

export default Vue.extend({
  name: 'HourTable',

  data: () => ({
    tableHeaders: [
      {
        text: '時刻',
        value: 'key',
        sortable: false,
        align: 'center',
        class: 'grey lighten-2',
      },
      {
        text: 'メッセージ数',
        value: 'count',
        sortable: true,
        align: 'center',
        class: 'grey lighten-2',
      },
    ],
  }),

  computed: {
    lineMessageEvents(): LineMessageEvent[] {
      return this.$store.getters['line/lineMessageEvents'];
    },

    tableItems(): group.CountRecord<string>[] {
      const countRecords = getCountRecords(this.lineMessageEvents);

      return countRecords;
    },
  },
});

export {
  getCountRecords,
};
</script>
