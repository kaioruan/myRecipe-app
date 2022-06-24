import React from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

function UserRecipes() {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div>
      <Header />
      {path === '/favorite-recipes' ? <FavoriteRecipeCard /> : <DoneRecipeCard /> }
    </div>
  );
}

export default UserRecipes;
