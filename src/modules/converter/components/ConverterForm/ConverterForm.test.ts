import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import ConverterForm from './ConverterForm.vue';

describe('ConverterForm', () => {
  afterEach(cleanup);

  it('should render all form fields', () => {
    render(ConverterForm);

    expect(
      screen.getByRole('spinbutton', { name: 'Platinum Pieces (PP)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Gold Pieces (GP)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Electrum Pieces (EP)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Silver Pieces (SP)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Copper Pieces (CP)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: 'Exclude Electrum' }),
    ).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Convert' });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('should show error message when user tries to submit form with empty fields', async () => {
    const user = userEvent.setup();

    render(ConverterForm);

    const submitButton = screen.getByRole('button', { name: 'Convert' });

    await user.click(submitButton);

    expect(
      screen.getByText('You need to fill at least one field'),
    ).toBeInTheDocument();
  });

  it('should call onSubmit event when user submits form', async () => {
    const user = userEvent.setup();

    const { emitted } = render(ConverterForm);

    const platinumPiecesInput = screen.getByRole('spinbutton', {
      name: 'Platinum Pieces (PP)',
    });

    const goldPiecesInput = screen.getByRole('spinbutton', {
      name: 'Gold Pieces (GP)',
    });

    const electrumPiecesInput = screen.getByRole('spinbutton', {
      name: 'Electrum Pieces (EP)',
    });

    const silverPiecesInput = screen.getByRole('spinbutton', {
      name: 'Silver Pieces (SP)',
    });

    const copperPiecesInput = screen.getByRole('spinbutton', {
      name: 'Copper Pieces (CP)',
    });

    const excludeElectrumCheckbox = screen.getByRole('checkbox', {
      name: 'Exclude Electrum',
    });

    await user.type(platinumPiecesInput, '10');
    await user.type(goldPiecesInput, '100');
    await user.type(electrumPiecesInput, '20');
    await user.type(silverPiecesInput, '30');
    await user.type(copperPiecesInput, '40');
    await user.click(excludeElectrumCheckbox);

    const submitButton = screen.getByRole('button', { name: 'Convert' });

    await user.click(submitButton);

    expect(emitted()).toHaveProperty('onSubmit');

    const [[submittedData]] = emitted<Array<unknown>>('onSubmit');

    expect(submittedData).toEqual({
      currencies: {
        copper: 40,
        electrum: 20,
        gold: 100,
        platinum: 10,
        silver: 30,
      },
      excludeElectrum: false,
    });
  });

  it('should treat unfilled fields as 0', async () => {
    const user = userEvent.setup();

    const { emitted } = render(ConverterForm);

    const platinumPiecesInput = screen.getByRole('spinbutton', {
      name: 'Platinum Pieces (PP)',
    });

    const submitButton = screen.getByRole('button', { name: 'Convert' });

    await user.type(platinumPiecesInput, '10');
    await user.click(submitButton);

    expect(emitted()).toHaveProperty('onSubmit');
    const [[submittedData]] = emitted<Array<unknown>>('onSubmit');

    expect(submittedData).toEqual({
      currencies: {
        copper: 0,
        electrum: 0,
        gold: 0,
        platinum: 10,
        silver: 0,
      },
      excludeElectrum: true,
    });
  });
});
