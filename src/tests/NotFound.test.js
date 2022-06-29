import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
// import mock from './Helpers/testData';

describe('Testa a página NotFound', () => {
  it('Testa se o texto Not Found é renderizado.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
