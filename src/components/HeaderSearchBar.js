import React, { useState } from 'react';

export default function SearchBar() {
  const [inputFilter, setInputFilter] = useState('');

  const handleInputChange = ({ target }) => {
    setInputFilter(target.value);
  };

  return (
    <div>
      <label htmlFor="Ingredient">
        <input
          id="Ingredient"
          type="radio"
          name="filter"
          value={ inputFilter }
          onChange={ handleInputChange }
        />
        Ingredient
      </label>
      <label htmlFor="Name">
        <input
          id="Name"
          type="radio"
          name="filter"
          value={ inputFilter }
          onChange={ handleInputChange }
        />
        Name
      </label>
      <label htmlFor="First-Letter">
        <input
          id="First-Letter"
          type="radio"
          name="filter"
          value={ inputFilter }
          onChange={ handleInputChange }
        />
        First letter
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>

  );
}
