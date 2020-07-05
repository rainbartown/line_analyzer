<!-- 歴史イベントの詳細を示すカード -->

<template>
  <v-card class="elevation-1">
    <v-container>
      <v-layout wrap>

        <!-- 日時 -->
        <v-flex xs12>
          <div class="caption grey--text">
            {{ format(datetime) }}
          </div>
        </v-flex>

        <!-- コンテンツ -->
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
  name: 'HistoryItemCard',

  props: {
    datetime: {
      type: Date,
      required: true,
    },
  },

  methods: {
    format(datetime: Date) {
      return formatDatetime(datetime, 'yyyy/MM/dd HH:mm');
    },
  },
});
</script>
