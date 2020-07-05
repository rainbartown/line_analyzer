import { GetterTree } from 'vuex';
import * as levent from '@/assets/js/line/line-event';
import { RootState } from '@/store/state';
import { LineState } from './state';


const getters: GetterTree<LineState, RootState> = {
  // トーク名
  talkName: (state) => state.talkName,

  // トークの参加メンバー
  members: (state) => state.members,

  // トークのイベント
  lineEvents: (state) => state.lineEvents,

  // メッセージ
  lineMessageEvents: (state) => state.lineEvents.filter(levent.isLineMessageEvent),

  // テキストメッセージ
  lineTextMessageEvents: (state) => state.lineEvents.filter(levent.isLineTextMessageEvent),

  // グループ名の変更
  lineChangeTalkNameEvents: (state) => state.lineEvents.filter(levent.isLineChangeGroupNameEvent),

  // トーク履歴の保存日時
  exportDatetime: (state) => state.exportDatetime,

  // 読み込んだデータがあるか
  hasData: (state) => state.exportDatetime !== null,
};


export default getters;
