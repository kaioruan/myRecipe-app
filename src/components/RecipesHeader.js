import React from 'react';
// import { useHistory } from 'react-router-dom';

export default function RecipesHeader() {
  // // const path = history.location.pathname;
  // console.log(path);

  return (
    <header>
      <h1>
        Done Recipes
      </h1>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
    </header>
  );
}
