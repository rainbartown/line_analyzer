import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import HistoryPage from '@/views/HistoryPage.vue';
import TablePage from '@/views/TablePage.vue';
import ChartPage from '@/views/ChartPage.vue';

Vue.use(Router);

export default new Router({
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
    },
    {
      path: '/table',
      name: 'TablePage',
      component: TablePage,
    },
    {
      path: '/chart',
      name: 'ChartPage',
      component: ChartPage,
    },
  ],
});
