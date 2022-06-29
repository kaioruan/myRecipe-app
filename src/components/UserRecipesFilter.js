import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function UserRecipesFilter() {
  const { setUserRecipesFilter } = useContext(RecipesContext);

  const handleClickFilter = ({ target }) => {
    setUserRecipesFilter(target.name);
  };

  return (
    <header className="flex justify-center space-x-8 my-4 ml-1">
      <button
        data-testid="filter-by-all-btn"
        type="button"
        name="All"
        onClick={ handleClickFilter }
        className="bg-white py-1 px-3 rounded-lg"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        name="Food"
        onClick={ handleClickFilter }
        className="bg-white py-1 px-3 rounded-lg"
      >
        Foods
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        name="Drink"
        onClick={ handleClickFilter }
        className="bg-white py-1 px-3 rounded-lg"
      >
        Drinks
      </button>
    </header>
  );
}
