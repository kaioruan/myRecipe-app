import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Header.js />', () => {
  it('Testando icones de Perfil e Search na página de Foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const imgProfile = screen.getByRole('img', { name: /ProfileIcon/i });
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    expect(imgSearch).toBeDefined();
    expect(imgProfile).toBeDefined();
  });
  it('testando redirecionamento do icone de Perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
    const homeIcon = screen.getByRole('img', { name: /ProfileIcon/i });
    expect(homeIcon).toBeInTheDocument();
    userEvent.click(homeIcon);
    expect(history.location.pathname).toBe('/profile');
  });
  it('Testando inputs de busca', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const imgSearch = screen.getByAltText(/SearchIcon/i);
    let btnInputText = screen.queryByPlaceholderText(/Digite Aqui/i);
    expect(btnInputText).not.toBeInTheDocument();
    userEvent.click(imgSearch);
    btnInputText = screen.getByPlaceholderText(/Digite Aqui/i);
    expect(btnInputText).toBeInTheDocument();
  });
  it('Testando Filtro de buscas renderizados na Página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const ingredientEl = screen.getByText(/Ingredient/i);
    const nameEl = screen.getByText(/Name/i);
    const FirstLetterEl = screen.getByText(/First Letter/i);
    expect(ingredientEl).toBeDefined();
    expect(nameEl).toBeDefined();
    expect(FirstLetterEl).toBeDefined();
  });
  // it('Testando Categorias de buscas renderizados na Página', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const bttnAll = screen.getByRole('button', { name: /All/i });
  //   const bttnBeef = screen.getByRole('button', { name: /Beef/i });
  //   const bttnBreakfast = screen.getByRole('button', { name: /Breakfast/i });
  //   const bttnChicken = screen.getByRole('button', { name: /Chicken/i });
  //   const bttnDessert = screen.getByRole('button', { name: /Dessert/i });
  //   const bttnGoat = screen.getByRole('button', { name: /Goat/i });
  //   expect(bttnAll).toBeDefined();
  //   expect(bttnBeef).toBeInTheDocument();
  //   expect(bttnBreakfast).toBeInTheDocument();
  //   expect(bttnChicken).toBeInTheDocument();
  //   expect(bttnDessert).toBeInTheDocument();
  //   expect(bttnGoat).toBeInTheDocument();
  // });
});
