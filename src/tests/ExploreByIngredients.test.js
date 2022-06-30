import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
// import mock from './Helpers/testData';

describe('Testa a página ExploreByIngredients', () => {
  it('Testa se os cards de ingredientes são renderizados.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const cards = await screen.findAllByTestId(/ingredient-card/i);
    cards.forEach((card) => expect(card).toBeInTheDocument());
    userEvent.click(cards[0]);
    const foodName = await screen.findByText(/brown stew chicken/i);
    expect(foodName).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods');
  });
});
