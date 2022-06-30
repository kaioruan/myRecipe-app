import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de Login', () => {
  it('Testa se a página vai para a rota "/foods após o login"', () => {
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
  });
});
