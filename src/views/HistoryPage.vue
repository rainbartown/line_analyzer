<template>
  <v-container>
    <v-layout wrap>
      <v-flex>
        <h1 class="title font-weight-bold text-center">
          {{ talkName }}の歴史
        </h1>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-timeline dense>
          <v-timeline-item
            v-for="(event, i) in history"
            :key="i"
            :color="historyEventStyle[event.type].color"
            :icon="historyEventStyle[event.type].icon"
            fill-dot
          >
            <HistoryItem
              :datetime="event.datetime"
            >
              <!-- 履歴の始まり -->
              <div v-if="event.type === 'START_TALK'">
                トーク履歴のはじまり
              </div>
              <!-- 履歴の終わり -->
              <div v-else-if="event.type === 'END_TALK'">
                トーク履歴のおわり
              </div>
              <!-- グループ名の変更 -->
              <div v-else-if="event.type === 'CHANGE_TALK_NAME'">
                {{ event.actor }}がグループ名を<br>
                <strong :class="historyEventStyle[event.type].textColor">
                  {{ event.newTalkName }}
                </strong><br>
                に変更
              </div>
            </HistoryItem>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import HistoryItem from '@/components/HistoryItem.vue';

export default Vue.extend({
  name: 'HistoryPage',
  components: {
    HistoryItem,
  },
  data: () => ({
    historyEventStyle: {
      START_TALK: {
        icon: 'mdi-clock-start',
        color: 'grey',
        textColor: 'grey--text',
      },
      END_TALK: {
        icon: 'mdi-clock-end',
        color: 'grey',
        textColor: 'grey--text',
      },
      CHANGE_TALK_NAME: {
        icon: 'mdi-autorenew',
        color: 'orange',
        textColor: 'orange--text',
      },
    },
  }),
  computed: {
    ...mapGetters([
      'talkName',
      'history',
    ]),
  },
});
</script>
