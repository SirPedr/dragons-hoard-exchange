import App from '@/App.vue';
import { render, screen } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import ConverterPage from './ConverterPage.vue';

describe('ConverterPage', () => {
  it('should fill form with query string values if present', async () => {
    const EmptyComponent = defineComponent({
      template: '<div>Home</div>',
    });

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          component: EmptyComponent,
          name: 'home',
        },
        {
          path: '/form',
          component: ConverterPage,
          name: 'form',
        },
      ],
    });

    render(App, { global: { plugins: [router] } });

    await router.isReady();
    await router.push({
      name: 'form',
      query: {
        copper: '15',
        silver: '31',
        electrum: '47',
        gold: '3',
        platinum: '8',
      },
    });

    expect(screen.getByLabelText(/copper pieces/i)).toHaveValue(15);
    expect(screen.getByLabelText(/silver pieces/i)).toHaveValue(31);
    expect(screen.getByLabelText(/electrum pieces/i)).toHaveValue(47);
    expect(screen.getByLabelText(/gold pieces/i)).toHaveValue(3);
    expect(screen.getByLabelText(/platinum pieces/i)).toHaveValue(8);
  });
});
