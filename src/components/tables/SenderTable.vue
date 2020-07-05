<template>
  <base-table
    :headers="tableHeaders"
    :items="tableItems"
    sort-by="count"
    sort-desc
  />
</template>

<script lang="ts">
import Vue from 'vue';
import * as group from '@/assets/js/common/group';
import { LineMessageEvent } from '@/assets/js/line/line-event';
import BaseTable from './BaseTable.vue';

const getCountRecords = (events: LineMessageEvent[], members: Set<string>):
  group.CountRecord<string>[] => {
  const groupMap = group.groupBy(events, (event) => event.sender);
  const countRecords = group.getCountRecords(Array.from(members), groupMap);

  return countRecords;
};

export default Vue.extend({
  name: 'SenderTable',

  components: {
    BaseTable,
  },

  data: () => ({
    tableHeaders: [
      {
        text: '送信者',
        value: 'key',
        sortable: true,
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
    members(): Set<string> {
      return this.$store.getters['line/members'];
    },

    lineMessageEvents(): LineMessageEvent[] {
      return this.$store.getters['line/lineMessageEvents'];
    },

    tableItems(): group.CountRecord<string>[] {
      const countRecords = getCountRecords(this.lineMessageEvents, this.members);

      return countRecords;
    },
  },
});

export {
  getCountRecords,
};
</script>
