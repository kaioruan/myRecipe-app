import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

const exploreFoods = '/explore/foods';

describe('Testa a página de explorar por categorias.', () => {
  it('Verifica se os botões de filtro existem no path explore/foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoods);
    const byIngredient = screen.getByText(/ingredient/i);
    const byNationality = screen.getByText(/nationality/i);
    const supriseMe = screen.getByText(/surprise/i);

    expect(byIngredient).toBeInTheDocument();
    expect(byNationality).toBeInTheDocument();
    expect(supriseMe).toBeInTheDocument();
  });

  it('Verifica se o botão By Ingredients funciona em foods.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoods);
    const button = screen.getByText(/ingredient/i);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('Verifica se o botão By Nationality funciona.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoods);
    const button = screen.getByText(/nationality/i);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('Verifica se o botão Surprise Me funciona em foods.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(exploreFoods);
    const button = screen.getByText(/surprise/i);
    userEvent.click(button);
    expect(history.location.pathname.includes('foods')).toBe(true);
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  it('Verifica se o botão By Ingredients funciona em drinks.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const button = screen.getByText(/ingredient/i);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it('Verifica se o botão Surprise Me funciona em drinks.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const button = screen.getByText(/surprise/i);
    userEvent.click(button);
    expect(history.location.pathname.includes('drinks')).toBe(true);
  });
});
