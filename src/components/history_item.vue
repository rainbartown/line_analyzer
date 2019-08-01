<template>
  <v-card class="elevation-1">
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <div class="caption grey--text">{{ format(datetime) }}</div>
        </v-flex>
        <v-flex xs12>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { formatDateTime } from '@/assets/js/date-time';

export default {
  name: 'HistoryItem',
  props: ['datetime'],
  methods: {
    format(datetime) {
      return formatDateTime(datetime, 'yyyy/MM/dd HH:mm');
    },
  },
};
</script>
