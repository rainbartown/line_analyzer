import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ChartPage from '@/views/ChartPage.vue';
import HistoryPage from '@/views/HistoryPage.vue';
import HomePage from '@/views/HomePage.vue';
import TablePage from '@/views/TablePage.vue';
import { jumpToRootIfNoData } from './guards';


Vue.use(VueRouter);


const routes: RouteConfig[] = [
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
];


const router = new VueRouter({
  routes,
});


router.beforeEach(jumpToRootIfNoData);


export default router;
