import ConverterPage from '@/modules/converter/pages/ConverterPage/ConverterPage.vue';
import ResultPage from '@/modules/converter/pages/ResultPage/ResultPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ConverterPage,
      children: [
        {
          path: 'result',
          name: 'result',
          component: ResultPage,
        },
      ],
    },
  ],
});

export default router;
