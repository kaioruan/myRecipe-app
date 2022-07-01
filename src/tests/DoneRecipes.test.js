import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe.only('Testa o componente DoneRecipes', () => {
  it('Testa o botão de compartilhar da pagina DoneRecipes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52791');
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startRecipe);
    const FirstIngredient = await screen.findByTestId('0-ingredient-checkbox');
    const SecondIngredient = await screen.findByTestId('1-ingredient-checkbox');
    const ThirdIngredient = await screen.findByTestId('2-ingredient-checkbox');
    const FourthIngredient = await screen.findByTestId('3-ingredient-checkbox');
    const FifthIngredient = await screen.findByTestId('4-ingredient-checkbox');
    userEvent.click(FirstIngredient);
    userEvent.click(SecondIngredient);
    userEvent.click(ThirdIngredient);
    userEvent.click(FourthIngredient);
    userEvent.click(FifthIngredient);
    const finishBttn = await screen.findByTestId('finish-recipe-btn');
    userEvent.click(finishBttn);
    const bttnCopyLink = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(bttnCopyLink);
    const linkCopy = await screen.findByText('Link copied!');
    expect(linkCopy).toBeInTheDocument();
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
