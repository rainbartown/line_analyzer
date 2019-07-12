<template>
  <v-data-table
    :pagination.sync="pagination"
    :headers="headers"
    :items="items"
    :hide-actions="true"
    disable-initial-sort
    no-data-text="データがありません"
  >
    <template v-slot:items="props">
      <td style="text-align: center">{{ props.item.name }}</td>
      <td style="text-align: right">{{ props.item.count }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
import { countMessage } from '@/modules/data';

export default {
  name: 'DayOfWeekTable',
  data: () => ({
    pagination: {
      rowsPerPage: -1,
    },
    headers: [
      {
        text: '曜日',
        value: 'name',
        sortable: false,
        align: 'center',
      },
      {
        text: '発言回数',
        value: 'count',
        sortable: true,
        width: '20%',
        align: 'center',
      },
    ],
  }),
  computed: {
    ...mapGetters([
      'messages',
      'daysOfWeek',
    ]),
    items() {
      let counts = {};
      if (this.messages.length) {
        counts = countMessage(this.messages, this.daysOfWeek,
          message => this.daysOfWeek[message.datetime.getDay()]);
      }
      return Object.entries(counts).map(([dayOfWeek, count]) => ({ name: dayOfWeek, count }));
    },
  },
};
</script>
