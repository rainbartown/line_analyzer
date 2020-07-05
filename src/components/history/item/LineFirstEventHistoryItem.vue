<!-- トーク履歴のはじまり -->

<template>
  <v-timeline-item
    color="grey"
    icon="mdi-clock-start"
    fill-dot>

    <history-item-card :datetime="event.datetime">
      トーク履歴のはじまり
    </history-item-card>

  </v-timeline-item>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { LineFirstEvent } from '@/assets/js/line/history-event';
import HistoryItemCard from './HistoryItemCard.vue';

export default Vue.extend({
  name: 'LineFirstEventHistoryItem',

  components: {
    HistoryItemCard,
  },

  props: {
    event: {
      type: Object as PropType<LineFirstEvent>,
      required: true,
    },
  },
});
</script>
