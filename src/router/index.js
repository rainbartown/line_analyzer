import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const HomePage = { template: '<div>HomePage</div>' };
const TablePage = { template: '<div>TablePage</div>' };
const ChartPage = { template: '<div>ChartPage</div>' };

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
