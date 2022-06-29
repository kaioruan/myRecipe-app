import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Testa o componente Footer', () => {
  it('Testa se o componente contém três ícones', () => {
    renderWithRouter(<Footer />);

    const totalImg = 3;
    const img = screen.getAllByRole('img');

    expect(img.length).toBe(totalImg);
  });

  it(`Testa se os ícones levam às rotas:
   /drinks, /explore, /foods respectivamente`, () => {
    const { history } = renderWithRouter(<Footer />);

    const buttonImgDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(buttonImgDrinks);
    expect(history.location.pathname).toBe('/drinks');

    const buttonImgExplore = screen.getByTestId('explore-bottom-btn');
    userEvent.click(buttonImgExplore);
    expect(history.location.pathname).toBe('/explore');

    const buttonImgFoods = screen.getByTestId('food-bottom-btn');
    userEvent.click(buttonImgFoods);
    expect(history.location.pathname).toBe('/foods');
  });
});
