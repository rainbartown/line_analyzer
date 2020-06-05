<template>
  <v-data-table
    :headers="headers"
    :items="items"
    disable-pagination
    hide-default-footer
    no-data-text="データがありません"
    :mobile-breakpoint=0
  >
    <template v-slot:items="props">
      <td style="text-align: center">{{ props.item.name }}</td>
      <td style="text-align: right">{{ props.item.count }}</td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { countMessage } from '@/assets/js/data';

export default Vue.extend({
  name: 'DayOfWeekTable',
  data: () => ({
    headers: [
      {
        text: '曜日',
        value: 'name',
        sortable: false,
        align: 'center',
        class: 'grey lighten-2',
      },
      {
        text: '発言回数',
        value: 'count',
        sortable: true,
        align: 'center',
        class: 'grey lighten-2',
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
          (message) => this.daysOfWeek[message.datetime.getDay()]);
      }
      return Object.entries(counts).map(([dayOfWeek, count]) => ({ name: dayOfWeek, count }));
    },
  },
});
</script>
