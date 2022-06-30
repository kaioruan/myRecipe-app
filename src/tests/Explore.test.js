import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe('Teste Explore Page', () => {
  it('A rota para esta página deve ser \'/explore\'', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    expect(history.location.pathname).toBe('/explore');
  });

  it('Verifica se os botões são renderizados corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const foodsButton = screen.getByRole('button', {
      name: /Explore Foods/i });
    expect(foodsButton).toBeInTheDocument();
    const drinksButton = screen.getByRole('button', {
      name: /Explore Drinks/i });
    expect(drinksButton).toBeInTheDocument();
  });

  it('Verifica se ao clicar nos botões, é feito o redirecionamento', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const foodsButton = screen.getByText('Explore Foods');
    userEvent.click(foodsButton);
    expect(history.location.pathname).toBe('/explore/foods');

    history.push('/explore');
    const drinksButton = screen.getByText('Explore Drinks');
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
