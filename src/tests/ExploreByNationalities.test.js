import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
// import mock from './Helpers/testData';

describe('Testa a página Explore Nationalities', () => {
  it('Testa se a página de nacionalidades é renderizada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    const main = screen.getByTestId('nationalities-page');
    expect(main).toBeInTheDocument();
  });
});
