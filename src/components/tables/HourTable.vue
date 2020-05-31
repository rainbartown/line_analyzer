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

<script>
import { mapGetters } from 'vuex';
import { countMessage } from '@/assets/js/data';

export default {
  name: 'HourTable',
  data: () => ({
    headers: [
      {
        text: '時刻',
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
      'hours',
    ]),
    items() {
      let counts = {};
      if (this.messages.length) {
        counts = countMessage(this.messages, this.hours,
          (message) => this.hours[message.datetime.getHours()]);
      }
      return Object.entries(counts).map(([hour, count]) => ({ name: hour, count }));
    },
  },
};
</script>
