<template>
  <v-container>

    <!-- タイトル -->
    <v-layout wrap>
      <v-flex>
        <title-text class="text-center">
          {{ talkName }}の歴史
        </title-text>
      </v-flex>
    </v-layout>

    <!-- 歴史イベントのタイムライン -->
    <v-layout wrap>
      <v-flex xs12>
        <history-timeline />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import HistoryTimeline from '@/components/history/HisrotyTimeline.vue';
import { TitleText } from '@/components/text';

export default Vue.extend({
  name: 'HistoryPage',

  components: {
    HistoryTimeline,
    TitleText,
  },

  computed: {
    talkName(): string {
      return this.$store.getters['line/talkName'];
    },
  },
});
</script>
