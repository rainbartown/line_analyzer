<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="count"
      sort-desc
      hide-default-footer
      disable-pagination
      no-data-text="データがありません"
      :mobile-breakpoint=0
    >
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { countMessage } from '@/assets/js/data';

export default Vue.extend({
  name: 'SpeakerTable',
  data: () => ({
    headers: [
      {
        text: '名前',
        value: 'name',
        sortable: true,
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
      'speakers',
    ]),
    items() {
      const counts = countMessage(this.messages, this.speakers, (message) => message.speaker);
      return Object.entries(counts).map(([name, count]) => ({ name, count }));
    },
  },
});
</script>
