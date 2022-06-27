import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Header.js />', () => {
  it('testando icone de Perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const homeIcon = screen.getByRole('link');
    userEvent.click(homeIcon);
    expect(history.location.pathname).toBe('/profile');
  });
  it('Testando icones de Perfil e Search', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const imgProfile = screen.getByRole('img', { name: /ProfileIcon/i });
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    expect(imgProfile).toBeinTheDocument();
    expect(imgSearch).toBeinTheDocument();
  });
});
