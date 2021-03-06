import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe('Teste User Profile Page', () => {
  it('A rota para esta página deve ser \'/profile\'', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se o elemento email está no documento.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
  });

  it('Verifica se ao clicar nos botões, é feito o redirecionamento.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const doneButton = screen.getByRole('button', { name: /Done Recipes/i });
    expect(doneButton).toBeInTheDocument();
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/profile');
    const favoriteButton = screen.getByRole('button', { name: /Favorite Recipes/i });
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');

    history.push('/profile');
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
