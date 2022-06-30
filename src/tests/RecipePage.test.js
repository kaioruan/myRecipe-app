import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

const recipePath = '/drinks/15254';
const startButtonId = 'start-recipe-btn';

describe('Testa os elementos de RecipePage.', () => {
  it('Verifica se os elementos existem na página.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(recipePath);

    const startButton = screen.getByTestId(startButtonId);
    expect(startButton).toBeInTheDocument();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('Verifica o botão Start Recipe funciona.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(recipePath);

    const startButton = screen.getByTestId(startButtonId);
    userEvent.click(startButton);
    expect(history.location.pathname.includes('in-progress')).toBe(true);
  });

  it('Verifica o botão Share funciona.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(recipePath);

    const shareButton = screen.getByTestId('share-btn');
    userEvent.click(shareButton);

    const text = await screen.findByText(/Link Copied/i);
    expect(text).toBeInTheDocument();
  });

  it('Verifica o botão Favorite Recipe funciona.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(recipePath);

    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
  });

  it('Verifica o comportamento da página de receita em progresso.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(recipePath);

    const startButton = screen.getByTestId(startButtonId);
    userEvent.click(startButton);

    const boxes = await screen.findAllByTestId(/ingredient-checkbox/i);
    boxes.forEach((box) => userEvent.click(box));

    const finishButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishButton);
  });
  it('Testando coloração do button Favoritar', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52791');
    const favoriteBttn = await screen.findByAltText('favorite icon');
    expect(favoriteBttn.src.includes('whiteHeartIcon')).toBe(true);
    userEvent.click(favoriteBttn);
    expect(favoriteBttn.src.includes('whiteHeartIcon')).not.toBe(true);
    expect(favoriteBttn.src.includes('blackHeartIcon')).toBe(true);
  });
});
