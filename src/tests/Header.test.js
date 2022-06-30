import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

const NUMBER = 30000;
const EXEC_SEARCH_BTN = 'exec-search-btn';
const O_CARD_IMG = '0-card-img';
const FIRST_LETTER = 'First letter';
describe('Teste o componente <Header.js />', () => {
  jest.setTimeout(NUMBER);
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
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
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
    // jest.spyOn(global, 'fetch')
    //   .mockResolvedValue({
    //     json: jest.fn()
    //       .mockResolvedValue(mock.categoriesData)
    //       .mockResolvedValueOnce(mock.recipesData),
    //   });
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
  });

  it('Testando Categorias de buscas renderizados na Página de bebidas', async () => {
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
  });

  it('Testa se os botões de filtro da pesquisa funcionam.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const ingredientFilter = screen.getByText('Ingredient');
    const firstLetterFilter = screen.getByText(FIRST_LETTER);
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    userEvent.click(imgSearch);
    const inputField = screen.queryByPlaceholderText(/Digite Aqui/i);
    userEvent.click(ingredientFilter);
    userEvent.type(inputField, 'Salmon');
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
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
    const blackBerryImg = await screen.findByTestId(O_CARD_IMG);
    expect(blackBerrySearch).toBeInTheDocument();
    expect(blackBerryImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg');
  });
  it('Testando Filtro de busca, Primeira Letra da página Principal', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const firstLetterFilter = screen.getByText(FIRST_LETTER);
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    userEvent.click(imgSearch);
    const inputField = screen.queryByPlaceholderText(/Digite Aqui/i);
    userEvent.click(firstLetterFilter);
    userEvent.type(inputField, 'e');
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchButton);
    const etonMessSearch = await screen.findByRole(
      'heading', { name: /Eton Mess/i, level: 3 },
    );
    const etonMessImg = await screen.findByTestId(O_CARD_IMG);
    expect(etonMessSearch).toBeInTheDocument();
    expect(etonMessImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg');
  });
  it('Alerta de receita não encontrada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    userEvent.click(imgSearch);
    const firstLetterFilter = screen.getByText('First letter');
    userEvent.click(firstLetterFilter);
    const inputField = screen.queryByPlaceholderText(/Digite Aqui/i);
    userEvent.type(inputField, 'z');
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchButton);
  });
  it('Procurar apenas uma receita, redirecionar a pagina de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const imgSearch = screen.getByRole('img', { name: /SearchIcon/i });
    userEvent.click(imgSearch);
    const ingredientFilter = screen.getByText('Ingredient');
    userEvent.click(ingredientFilter);
    const inputField = screen.queryByPlaceholderText(/Digite Aqui/i);
    userEvent.click(inputField);
    userEvent.type(inputField, 'Potato');
    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchButton);
    const foodName = await screen.findByText(/Lamb tomato/i);
    expect(foodName).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods/52782');
  });
});
