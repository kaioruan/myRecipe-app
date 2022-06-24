import React from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import DoneRecipeCard from '../components/DoneRecipeCard';
import RecipesHeader from '../components/RecipesHeader';
import Header from '../components/Header';

function UserRecipes() {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div>
      <RecipesHeader />
      <Header />
      {path === '/favorite-recipes' ? <FavoriteRecipeCard /> : <DoneRecipeCard /> }
    </div>
  );
}

export default UserRecipes;
