import { MutationTree } from 'vuex';
import { LineEvent } from '@/assets/js/line/line-event';
import { LineState } from './state';


const mutations: MutationTree<LineState> = {
  setTalkName: (state, talkName: string) => {
    state.talkName = talkName;
  },

  setMembers: (state, members: Set<string>) => {
    state.members = members;
  },

  setLineEvents: (state, lineEvents: LineEvent[]) => {
    state.lineEvents = lineEvents;
  },

  setExportDatetime: (state, datetime: Date) => {
    state.exportDatetime = datetime;
  },
};


export default mutations;
