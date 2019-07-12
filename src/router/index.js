import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import TablePage from '@/components/TablePage';
import ChartPage from '@/components/ChartPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
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
