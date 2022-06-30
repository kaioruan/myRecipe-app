import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';
import mock from './Helpers/testData';

const localStorage = {
  favoriteRecipes: [mock.recipesData.meals[0]],
};

describe('Testa a página UserRecipes', () => {
  it('Testa o caminho até a página /favorite-recipes', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInputEl = screen.getByPlaceholderText('E-mail');
    const passwordInputEl = screen.getByPlaceholderText('Password');
    const buttonEl = screen.getByRole('button', { name: 'Enter' });
    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();

    userEvent.type(emailInputEl, 'tryber@teste.com');
    userEvent.type(passwordInputEl, '1234567');
    userEvent.click(buttonEl);

    expect(history.location.pathname).toBe('/foods');

    const recipeNameEl = await screen.findByRole('heading', { name: 'Corba' });
    expect(recipeNameEl).toBeInTheDocument();

    userEvent.click(recipeNameEl);
    expect(history.location.pathname).toBe('/foods/52977');

    const favoriteBtnEl = screen.getAllByRole('button', { type: 'button' });
    expect(favoriteBtnEl[1]).toBeInTheDocument();

    userEvent.click(favoriteBtnEl[1]);
    expect(localStorage.favoriteRecipes[0]).toBe(mock.recipesData.meals[0]);
  });

  it('Testa se os botões de filtro da página são renderizados.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-food-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(allButton);

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
});
