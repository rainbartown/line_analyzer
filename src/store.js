import Vue from 'vue';
import Vuex from 'vuex';
import { readFile, loadFile } from '@/assets/js/file-loader';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    isLoading: true,
    talkName: '',
    history: [],
    messages: [],
    speakersData: {},
    hours: [...Array(24).keys()]
      .map(hour => `${`0${hour}`.slice(-2)}時台`),
    hoursData: [...Array(24).keys()]
      .map(hour => `${`0${hour}`.slice(-2)}時台`)
      .reduce((data, hour) => {
        data[hour] = { name: hour }; // eslint-disable-line no-param-reassign
        return data;
      }, {}),
    daysOfWeek: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ],
    daysOfWeekData: {
      日曜日: { name: '日曜日' },
      月曜日: { name: '月曜日' },
      火曜日: { name: '火曜日' },
      水曜日: { name: '水曜日' },
      木曜日: { name: '木曜日' },
      金曜日: { name: '金曜日' },
      土曜日: { name: '土曜日' },
    },
  },
  getters: {
    isLoading(state) { return state.isLoading; },
    talkName(state) { return state.talkName; },
    history(state) { return state.history; },
    messages(state) { return state.messages; },
    speakers(state) { return Object.keys(state.speakersData); },
    speakersData(state) { return state.speakersData; },
    hours(state) { return state.hours; },
    hoursData(state) { return state.hoursData; },
    daysOfWeek(state) { return state.daysOfWeek; },
    daysOfWeekData(state) { return state.daysOfWeekData; },
  },
  mutations: {
    setLoading(state, loading) { state.isLoading = loading; },
    setTalkName(state, talkName) { state.talkName = talkName; },
    setHistory(state, history) { state.history = history; },
    setMessages(state, messages) { state.messages = messages; },
    setSpeakersData(state, speakersData) { state.speakersData = speakersData; },
  },
  actions: {
    loading({ commit }, loading) { commit('setLoading', loading); },
    async read({ commit }, file) {
      try {
        const text = await readFile(file);
        const {
          talkName,
          history,
          messages,
          speakersData,
        } = await loadFile(text);
        commit('setTalkName', talkName);
        commit('setHistory', history);
        commit('setMessages', messages);
        commit('setSpeakersData', speakersData);
      } catch (err) {
        // console.error(err);
      }
    },
  },
});
