import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/focus',
      name: 'focus',
      component: () => import('../views/FocusDemoView.vue'),
    },
    {
      path: '/click-outside',
      name: 'click-outside',
      component: () => import('../views/ClickOutsideDemoView.vue'),
    },
    {
      path: '/copy',
      name: 'copy',
      component: () => import('../views/CopyDemoView.vue'),
    },
    {
      path: '/debounce',
      name: 'debounce',
      component: () => import('../views/DebounceDemoView.vue'),
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('../views/LifecycleDemoView.vue'),
    },
  ],
});

export default router;
