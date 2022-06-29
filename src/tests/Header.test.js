import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
import mock from './Helpers/testData';

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
    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
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

  it('Testando Categorias de buscas renderizados na Página de comidas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn()
          .mockResolvedValue(mock.categoriesData)
          .mockResolvedValueOnce(mock.recipesData),
      });

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const bttnAll = await screen.findByRole('button', { name: /All/i });
    const bttnBeef = await screen.findByRole('button', { name: /Beef/i });
    const bttnBreakfast = await screen.findByRole('button', { name: /Breakfast/i });
    const bttnChicken = await screen.findByRole('button', { name: /Chicken/i });
    const bttnDessert = await screen.findByRole('button', { name: /Dessert/i });
    const bttnGoat = await screen.findByRole('button', { name: /Goat/i });
    expect(bttnAll).toBeInTheDocument();
    expect(bttnBeef).toBeInTheDocument();
    expect(bttnBreakfast).toBeInTheDocument();
    expect(bttnChicken).toBeInTheDocument();
    expect(bttnDessert).toBeInTheDocument();
    expect(bttnGoat).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('Testando Categorias de buscas renderizados na Página de bebidas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn()
          .mockResolvedValue(mock.categoriesData)
          .mockResolvedValueOnce(mock.recipesData),
      });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const bttnAll = await screen.findByRole('button', { name: /All/i });
    const bttnOrdinary = await screen.findByRole('button', { name: /Ordinary Drink/i });
    const bttnCocktail = await screen.findByRole('button', { name: /Cocktail/i });
    const bttnShake = await screen.findByRole('button', { name: /Shake/i });
    const bttnOther = await screen.findByRole('button', { name: /Other/i });
    const bttnCocoa = await screen.findByRole('button', { name: /Cocoa/i });
    expect(bttnAll).toBeInTheDocument();
    expect(bttnOrdinary).toBeInTheDocument();
    expect(bttnCocktail).toBeInTheDocument();
    expect(bttnShake).toBeInTheDocument();
    expect(bttnOther).toBeInTheDocument();
    expect(bttnCocoa).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('Testa se os botões de filtro da pesquisa funcionam.', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn()
          .mockResolvedValue(mock.categoriesData)
          .mockResolvedValueOnce(mock.recipesData),
      });
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const ingredientFilter = screen.getByText('Ingredient');
    const firstLetterFilter = screen.getByText('First letter');
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    userEvent.click(imgSearch);
    const inputField = screen.queryByPlaceholderText(/Digite Aqui/i);
    userEvent.click(ingredientFilter);
    userEvent.type(inputField, 'Salmon');
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);

    const recipes = await screen.findAllByAltText('card thumb');
    recipes.forEach((recipe) => {
      expect(recipe).toBeInTheDocument();
    });

    jest.spyOn(global, 'alert');
    userEvent.click(firstLetterFilter);
    userEvent.type(inputField, 'Corba');

    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalled();
    const nameEl = screen.getByLabelText(/Name/i);
    userEvent.click(nameEl);
    userEvent.type(inputField, 'blackberry');
    userEvent.click(searchButton);
    const blackBerrySearch = await screen.findByRole(
      'heading', { name: /BlackBerry Fool/i, level: 3 },
    );
    const blackBerryImg = await screen.findByTestId('0-card-img');
    expect(blackBerrySearch).toBeInTheDocument();
    expect(blackBerryImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg');
    userEvent.click(firstLetterFilter);
    userEvent.type(inputField, 'e');
    userEvent.click(searchButton);
    const etonMessSearch = await screen.findByRole(
      'heading', { name: /Eton Mess/i, level: 3 },
    );
    const etonMessImg = await screen.findByTestId('0-card-img');
    expect(etonMessSearch).toBeInTheDocument();
    expect(etonMessImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg');
    jest.restoreAllMocks();
  });
  it('Testando Categorias de buscas renderizados na Página de bebidas', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn()
          .mockResolvedValue(mock.categoriesData)
          .mockResolvedValueOnce(mock.recipesData),
      });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    jest.restoreAllMocks();
  });
});
