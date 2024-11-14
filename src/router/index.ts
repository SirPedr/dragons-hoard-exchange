import ConverterPage from '@/modules/converter/pages/ConverterPage/ConverterPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ConverterPage,
    },
  ],
});

export default router;
