import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';
import mealsRecipes from './Helpers/mealsRecipesData';

// const URL = 'http://localhost:3000/drinks/15997';

const localStorage = {
  favoriteRecipes: [mealsRecipes[0]],
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
    expect(localStorage.favoriteRecipes[0]).toBe(mealsRecipes[0]);
  });
});
