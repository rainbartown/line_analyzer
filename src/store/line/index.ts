/**
 * LINEトークに関するVuexストア
 */


import { Module } from 'vuex';
import { RootState } from '@/store/state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state, { LineState } from './state';


const lineModule: Module<LineState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};


export default lineModule;
