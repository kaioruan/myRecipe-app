import React from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import DoneRecipeCard from '../components/DoneRecipeCard';
import RecipesHeader from '../components/RecipesHeader';

function UserRecipes() {
  const history = useHistory();
  const path = history.location.pathname;

  // console.log(path);

  return (
    <div>
      <RecipesHeader />
      {path === '/favorite-recipes' ? <FavoriteRecipeCard /> : <DoneRecipeCard /> }
    </div>
  );
}

export default UserRecipes;
