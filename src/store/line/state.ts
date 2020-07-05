import { LineEvent } from '@/assets/js/line/line-event';


interface LineState {
  talkName: string; // トーク名
  exportDatetime: Date | null; // トーク名
  members: Set<string>; // トークの参加メンバー
  lineEvents: LineEvent[]; // トークのイベント
}


const state: LineState = {
  talkName: '',
  exportDatetime: null,
  members: new Set(),
  lineEvents: [],
};


export default state;

export {
  LineState,
};
