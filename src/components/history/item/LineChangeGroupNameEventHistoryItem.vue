<!-- グループ名の変更 -->

<template>
  <v-timeline-item
    color="orange"
    icon="mdi-autorenew"
    fill-dot>

    <history-item-card :datetime="event.datetime">
      {{ event.changer }}がグループ名を<br>
      <strong class="orange--text">
        {{ event.newGroupName }}
      </strong><br>
      に変更
    </history-item-card>

  </v-timeline-item>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { LineChangeGroupNameEvent } from '@/assets/js/line/history-event';
import HistoryItemCard from './HistoryItemCard.vue';

export default Vue.extend({
  name: 'LineLastEventHistoryItem',

  components: {
    HistoryItemCard,
  },

  props: {
    event: {
      type: Object as PropType<LineChangeGroupNameEvent>,
      required: true,
    },
  },
});
</script>
