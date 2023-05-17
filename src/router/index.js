import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../views/LoginPage';
import DetailPage from '../views/DetailPage';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  {
    path: '/detail/:username',
    name: 'DetailPage',
    component: DetailPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
