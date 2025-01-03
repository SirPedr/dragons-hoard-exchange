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

    expect(screen.getByText(/1 player/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        /gets 12 platinum, 3 gold, 4 silver, and 5 copper pieces/i,
      ),
    );
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

    expect(screen.getByText(/1 player/i)).toBeInTheDocument();
    expect(screen.getByText(/gets 1 platinum pieces/i)).toBeInTheDocument();
  });

  it('should ignore valid keys that cannot be converted', async () => {
    await renderResultPage({ copper: 'abobra', gold: 10 });

    expect(screen.getByText(/1 player/i)).toBeInTheDocument();
    expect(screen.getByText(/gets 1 platinum pieces/i)).toBeInTheDocument();
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

    expect(screen.getByText(/1 player/i)).toBeInTheDocument();
    expect(screen.getByText(/gets 6 silver pieces/i)).toBeInTheDocument();
  });

  it('should display section with total value in USD', async () => {
    await renderResultPage({
      copper: 60,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
      excludeElectrum: 'true',
    });

    expect(screen.getByText('Fun fact')).toBeInTheDocument();
    expect(
      screen.getByText('This is equivalent to approximately $60.00'),
    ).toBeInTheDocument();
  });

  it('should display different sections when players get different amount of currencies', async () => {
    await renderResultPage({
      platinum: 0,
      gold: 10,
      electrum: 0,
      silver: 5,
      copper: 17,
      partySize: 5,
    });

    expect(screen.getByText(/2 players/i)).toBeInTheDocument();
    expect(
      screen.getByText(/get 2 gold, 1 silver, and 4 copper pieces/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/3 players/i)).toBeInTheDocument();
    expect(
      screen.getByText(/get 2 gold, 1 silver, and 3 copper pieces/i),
    ).toBeInTheDocument();
  });
});
