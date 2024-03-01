import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './components/MainPage.vue';
import TaskPage from './components/TaskPage.vue';
import UserStats from './components/UserStats.vue';
import UserProfile from './components/UserProfile.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';

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
  { path: '/profile', component: UserProfile },
  { path: '/sign-up', component: SignUp },
  { path: '/sign-in', component: SignIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;