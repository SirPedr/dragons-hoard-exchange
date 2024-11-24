import App from '@/App.vue';
import { cleanup, render, screen } from '@testing-library/vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import {
  createMemoryHistory,
  createRouter,
  type LocationQueryRaw,
} from 'vue-router';
import ResultPage from './ResultPage.vue';

const renderResultPage = async (query?: LocationQueryRaw) => {
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
      { path: '/result', component: ResultPage, name: 'result' },
    ],
  });

  render(App, { global: { plugins: [router] } });

  await router.isReady();
  await router.push({
    name: 'result',
    query: query,
  });
};

describe('ResultPage', () => {
  beforeEach(cleanup);

  it('should redirect to home page when query params are not present', async () => {
    await renderResultPage();

    expect(
      screen.getByRole('heading', { name: /optimal distribution/i }),
    ).toBeInTheDocument();

    await screen.findByText(/home/i);
  });

  it('should show converted values', async () => {
    await renderResultPage({
      copper: 12345,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
      excludeElectrum: 'false',
    });

    expect(screen.getByLabelText(/copper 5/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/silver 4/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/electrum 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gold 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/platinum 12/i)).toBeInTheDocument();
  });

  it('should redirect to home page when query params are all invalid', async () => {
    await renderResultPage({ parameter: 'd10br4ndo' });

    expect(
      screen.getByRole('heading', { name: /optimal distribution/i }),
    ).toBeInTheDocument();

    await screen.findByText(/home/i);
  });

  it('should consider remaining values as 0 when not present and at least one value is present', async () => {
    await renderResultPage({ gold: 10 });

    expect(screen.getByLabelText(/copper 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/silver 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/electrum 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gold 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/platinum 1/i)).toBeInTheDocument();
  });

  it('should ignore valid keys that cannot be converted', async () => {
    await renderResultPage({ copper: 'abobra', gold: 10 });

    expect(screen.getByLabelText(/copper 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/silver 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/electrum 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gold 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/platinum 1/i)).toBeInTheDocument();
  });

  it('should show converted values with excluded electrum', async () => {
    await renderResultPage({
      copper: 60,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
      excludeElectrum: 'true',
    });

    expect(screen.getByLabelText(/copper 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/silver 6/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/electrum 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gold 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/platinum 0/i)).toBeInTheDocument();
  });

  it.todo('should display section with total value in USD');
});
