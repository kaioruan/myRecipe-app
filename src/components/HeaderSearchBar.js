import React from 'react';

export default function HeaderSearchBar() {
  return (
    <div>
      Ingredient
      <input
        type="radio"
        data-testid="ingredient-search-radio"
      />
      Name
      <input
        type="radio"
        data-testid="name-search-radio"
      />
      First Letter
      <input
        type="radio"
        data-testid="first-letter-search-radio"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>

  );
}
