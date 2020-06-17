import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import state, { RootState } from '@/store/state';
import lineModule from './line';


Vue.use(Vuex);


const store: StoreOptions<RootState> = {
  state,
  modules: {
    line: lineModule,
  },
};


export default new Vuex.Store<RootState>(store);
