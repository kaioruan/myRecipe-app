import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import { loadFavoriteRecipes, saveFavoriteRecipe } from '../services/StorageManager';
import RecipesContext from '../context/RecipesContext';

export default function RecipesHeader() {
  const history = useHistory();
  const path = history.location.pathname;
  // const [filter, setFilter] = useState('All');
  const { setRenderFavorites } = useContext(RecipesContext);

  const handleClickFilter = ({ target }) => {
    setRenderFavorites(target.name);
    // console.log(filter);
  };

  return (
    <header>
      <h1>
        {path === '/favorite-recipes' ? 'Favorite Recipes' : 'Done Recipes'}
      </h1>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        name="All"
        onClick={ handleClickFilter }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        name="Food"
        onClick={ handleClickFilter }
      >
        Foods
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        name="Drink"
        onClick={ handleClickFilter }
      >
        Drinks
      </button>
    </header>
  );
}
