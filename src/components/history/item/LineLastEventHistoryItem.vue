<!-- トーク履歴のおわり -->

<template>
  <v-timeline-item
    color="grey"
    icon="mdi-clock-end"
    fill-dot>

    <history-item-card :datetime="event.datetime">
      トーク履歴のおわり
    </history-item-card>

  </v-timeline-item>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { LineLastEvent } from '@/assets/js/line/history-event';
import HistoryItemCard from './HistoryItemCard.vue';

export default Vue.extend({
  name: 'LineLastEventHistoryItem',

  components: {
    HistoryItemCard,
  },

  props: {
    event: {
      type: Object as PropType<LineLastEvent>,
      required: true,
    },
  },
});
</script>
