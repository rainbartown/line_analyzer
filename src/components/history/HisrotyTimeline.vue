<template>
  <v-timeline dense>
    <component
      v-for="(event, i) in historyEvents"
      :key="i"
      :is="getComponent(event)"
      :event="event"
    />
  </v-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import getHistoryEvents, { HistoryEvent } from '@/assets/js/line/history-event';
import { LineEvent } from '@/assets/js/line/line-event';
import historyItemComponents, { HistoryItemComponent } from './item';

type HistoryEventType = HistoryEvent['type'];

const historyItemComponentsMap = new Map<HistoryEventType, HistoryItemComponent>([
  ['change_group_name', 'LineChangeGroupNameEventHistoryItem'],
  ['first_event', 'LineFirstEventHistoryItem'],
  ['last_event', 'LineLastEventHistoryItem'],
]);

export default Vue.extend({
  name: 'HistoryTimeline',

  components: {
    ...historyItemComponents,
  },

  computed: {
    lineEvents(): LineEvent[] {
      return this.$store.getters['line/lineEvents'];
    },

    historyEvents(): HistoryEvent[] {
      const historyEvents = getHistoryEvents(this.lineEvents);
      return historyEvents;
    },
  },

  methods: {
    getComponent(event: HistoryEvent): HistoryItemComponent {
      const component = historyItemComponentsMap.get(event.type);
      if (component !== undefined) return component;
      throw new Error();
    },
  },
});
</script>
