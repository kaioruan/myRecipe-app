import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

const FAVORITE_RECIPES = '/favorite-recipes';
describe.only('Testa o componente FavoriteRecipesCard', () => {
  it('Testar renderização de itens favoritados e remoção deles', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52791');
    const bttnFavorite = await screen.findByAltText('favorite icon');
    userEvent.click(bttnFavorite);
    history.push(FAVORITE_RECIPES);
    expect(history.location.pathname).toBe(FAVORITE_RECIPES);
    const etonMessSearch = await screen.findByTestId('0-horizontal-name');
    const etonMessImg = await screen.findByTestId('0-horizontal-image');
    expect(etonMessSearch).toBeInTheDocument();
    expect(etonMessImg).toBeInTheDocument();
    const bttnFavoriteSearch = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(bttnFavoriteSearch);
    expect(etonMessSearch).not.toBeInTheDocument();
    expect(etonMessImg).not.toBeInTheDocument();
  });
  it('Testar button de compartilhar da pagina Favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52791');
    const bttnFavorite = await screen.findByAltText('favorite icon');
    userEvent.click(bttnFavorite);
    history.push(FAVORITE_RECIPES);
    const bttnCopyLink = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(bttnCopyLink);
    const linkCopy = await screen.findByText('Link copied!');
    expect(linkCopy).toBeInTheDocument();
  });
});
