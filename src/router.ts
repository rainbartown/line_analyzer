import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import HomePage from '@/views/HomePage.vue';
import HistoryPage from '@/views/HistoryPage.vue';
import TablePage from '@/views/TablePage.vue';
import ChartPage from '@/views/ChartPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/history',
      name: 'HistoryPage',
      component: HistoryPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.hasData) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/table',
      name: 'TablePage',
      component: TablePage,
      beforeEnter: (to, from, next) => {
        if (store.getters.hasData) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/chart',
      name: 'ChartPage',
      component: ChartPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.hasData) {
          next();
        } else {
          next('/');
        }
      },
    },
  ],
});
