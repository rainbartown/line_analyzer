import { ActionTree } from 'vuex';
import { readTextFile } from '@/assets/js/common/file';
import parseTalkFile from '@/assets/js/line/parser/parse-talk-file';
import { RootState } from '@/store/state';
import { LineState } from './state';


const actions: ActionTree<LineState, RootState> = {
  /**
   * トークファイルを解析し、Vuexストアに登録する。
   */
  loadTalkFile: async ({ commit }, file: File): Promise<void> => {
    try {
      if (file.type !== 'text/plain') throw new Error('LINEのトーク履歴ファイルを選択してください');

      const text = await readTextFile(file);
      const {
        talkName, members, lineEvents, exportDatetime,
      } = parseTalkFile(text);

      commit('setTalkName', talkName);
      commit('setMembers', members);
      commit('setLineEvents', lineEvents);
      commit('setExportDatetime', exportDatetime);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) alert(error.message); // eslint-disable-line no-alert
    }
  },
};


export default actions;
