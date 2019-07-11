import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


// ファイルを読み込む
const readFile = file => (
  new Promise((resolve, reject) => {
    // ファイルが選択されていなければエラー
    if (file === undefined) reject(new Error('ファイルが選択されていません'));
    // ファイル形式がテキストでなければエラー
    if (file.type !== 'text/plain') reject(new Error('ファイル形式が間違っています'));

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('ファイル読み込み中にエラーが発生しました'));
    reader.readAsText(file);
  })
);


const loadMessages = async (text) => {
  const messages = [];
  const speakerData = {};
  const lines = text.split('\n');
  const talkNamePattern = /^\[LINE\] (.*)のトーク履歴/; // 1行目のトーク名 "[LINE] 〇〇のトーク履歴"
  const datePattern = /^20[0-9][0-9]\/[0-1][0-9]\/[0-3][0-9]\(.\)/; // 日付 "2019/01/01(火)"
  const timePattern = /^[0-2][0-9]:[0-5][0-9]$/; // 時刻 "00:00"
  let speaker;
  let year;
  let month;
  let dayOfMonth;
  let hour;
  let minute;

  // トークルーム名
  const talkNameMatch = lines[0].match(talkNamePattern); // "[LINE] 〇〇のトーク履歴"
  if (talkNameMatch === null) throw new Error('トーク履歴ファイルが選択されていません');
  const talkName = talkNameMatch[1];
  // メッセージ
  lines.forEach((line) => {
    const col = line.split('\t');
    if (col.length === 1 && col[0].match(datePattern)) { // 日付 "2019/01/01(火)"
      [year, month, dayOfMonth] = col[0].slice(0, 9).split('/').map(el => parseInt(el, 10));
    } else if (col.length === 3 && col[0].match(timePattern)) { // 発言 "00:00\t太郎\tこんにちは"
      speaker = col[1];
      [hour, minute] = col[0].split(':').map(el => parseInt(el, 10));
      // メッセージと発言者を追加
      messages.push({
        speaker,
        datetime: new Date(year, month - 1, dayOfMonth, hour, minute, 30, 0),
      });
      if (!speakerData[speaker]) speakerData[speaker] = { name: speaker };
    }
  });

  return { talkName, messages, speakerData };
};


export default new Vuex.Store({
  state: {
    isLoading: true,
    talkName: '',
    messages: [],
    speakerData: {},
  },
  getters: {
    isLoading(state) { return state.isLoading; },
    talkName(state) { return state.talkName; },
    messages(state) { return state.messages; },
    speakers(state) { return Object.keys(state.speakerData); },
    speakerData(state) { return state.speakerData; },
  },
  mutations: {
    setLoading(state, loading) { state.isLoading = loading; },
    setTalkName(state, talkName) { state.talkName = talkName; },
    setMessages(state, messages) { state.messages = messages; },
    setSpeakerData(state, speakerData) { state.speakerData = speakerData; },
  },
  actions: {
    loading({ commit }, loading) { commit('setLoading', loading); },
    async read({ commit }, file) {
      try {
        const text = await readFile(file);
        const { talkName, messages, speakerData } = await loadMessages(text);
        commit('setTalkName', talkName);
        commit('setMessages', messages);
        commit('setSpeakerData', speakerData);
      } catch (err) {
        // console.error(err);
      }
    },
  },
});
