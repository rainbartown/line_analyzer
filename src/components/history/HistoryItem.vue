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

<script lang="ts">
import Vue from 'vue';
import { formatDatetime } from '@/assets/js/common/time';

export default Vue.extend({
  name: 'HistoryItem',
  props: ['datetime'],
  methods: {
    format(datetime: Date) {
      return formatDatetime(datetime, 'yyyy/MM/dd HH:mm');
    },
  },
});
</script>
