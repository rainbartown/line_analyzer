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
            v-for="(event, i) in historyEvents"
            :key="i"
            :color="historyItemStyles[event.type].color"
            :icon="historyItemStyles[event.type].icon"
            fill-dot
          >
            <history-item
              :datetime="event.datetime"
            >
              <!-- グループ名の変更 -->
              <div v-if="isLineChangeGroupNameEvent(event)">
                {{ event.changer }}がグループ名を<br>
                <strong :class="historyItemStyles[event.type].textColor">
                  {{ event.newGroupName }}
                </strong><br>
                に変更
              </div>
              <!-- 履歴の始まり -->
              <div v-else-if="isLineFirstEvent(event)">
                トーク履歴のはじまり
              </div>
              <!-- 履歴の終わり -->
              <div v-else-if="isLineLastEvent(event)">
                トーク履歴のおわり
              </div>
            </history-item>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import getHistoryEvents, {
  HistoryEvent,
  isLineFirstEvent,
  isLineLastEvent,
  isLineChangeGroupNameEvent,
} from '@/assets/js/line/history-event';
import { LineEvent } from '@/assets/js/line/line-event';
import HistoryItem from '@/components/history/HistoryItem.vue';

// 歴史イベントのtypeに指定できる文字列
type historyEventTypes = HistoryEvent['type'];

// 歴史イベントの表示スタイル定義のインタフェース
interface HistoryItemStyle {
  icon: string;
  color: string;
  textColor: string;
}

// 歴史イベントの表示スタイル
const historyItemStyles: { [type in historyEventTypes]: HistoryItemStyle } = {
  'first_event': { // eslint-disable-line quote-props
    icon: 'mdi-clock-start',
    color: 'grey',
    textColor: 'grey--text',
  },
  'last_event': { // eslint-disable-line quote-props
    icon: 'mdi-clock-end',
    color: 'grey',
    textColor: 'grey--text',
  },
  'change_group_name': { // eslint-disable-line quote-props
    icon: 'mdi-autorenew',
    color: 'orange',
    textColor: 'orange--text',
  },
};

export default Vue.extend({
  name: 'HistoryPage',

  components: {
    HistoryItem,
  },

  data() {
    return {
      historyItemStyles,
    };
  },

  methods: {
    isLineFirstEvent,
    isLineLastEvent,
    isLineChangeGroupNameEvent,
  },

  computed: {
    talkName(): string { return this.$store.getters['line/talkName']; },

    lineEvents(): LineEvent[] { return this.$store.getters['line/lineEvents']; },

    historyEvents(): HistoryEvent[] {
      return getHistoryEvents(this.lineEvents);
    },
  },
});
</script>
