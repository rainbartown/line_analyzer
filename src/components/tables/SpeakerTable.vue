<template>
  <v-data-table
    :pagination.sync="pagination"
    :headers="headers"
    :items="items"
    :hide-actions="true"
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
  name: 'SpeakerTable',
  data: () => ({
    pagination: {
      sortBy: 'count',
      descending: true,
      rowsPerPage: -1,
    },
    headers: [
      {
        text: '名前',
        value: 'name',
        sortable: true,
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
      'speakers',
      'speakersData',
    ]),
    items() {
      const counts = countMessage(this.messages, this.speakers, message => message.speaker);
      return Object.entries(counts).map(([speaker, count]) => ({ name: speaker, count }));
    },
  },
};
</script>
