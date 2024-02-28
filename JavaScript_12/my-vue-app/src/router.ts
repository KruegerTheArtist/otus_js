// router.ts
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './components/MainPage.vue';
import TaskPage from './components/TaskPage.vue';
import UserStats from './components/UserStats.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/task/:id',
    name: 'task',
    component: TaskPage,
    props: true
  },
  { path: '/user-stats', component: UserStats },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;