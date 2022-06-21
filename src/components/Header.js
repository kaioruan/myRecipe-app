import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import { fetchMealByName,
  fetchMealsByIngredient,
  fetchMealsbyFirstLetter } from '../services/MealsAPI';
import { fetchDrinksByIngredient,
  fetchDrinkByName,
  fetchDrinksbyFirstLetter } from '../services/CocktailsAPI';

function Header() {
  const [iconSearch, setIconSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [inputFilter, setInputFilter] = useState('');

  const history = useHistory();
  const path = history.location.pathname;

  console.log(path);

  // if (path === '/foods')

  const handleChangeFilters = ({ target }) => {
    setInputFilter(target.id);
    console.log(target.id);
  };

  const handleIconSearch = () => {
    if (iconSearch) {
      setIconSearch(false);
    } else {
      setIconSearch(true);
    }
  };
  const handleChangeInputName = ({ target }) => {
    setSearchInput(target.value);
  };

  const clickRequestFoods = () => {
    if (searchInput.length > 1 && inputFilter === 'First-Letter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (searchInput.length === 1) {
      fetchMealsbyFirstLetter(searchInput);
    }
    if (inputFilter === 'Ingredient') {
      fetchMealsByIngredient(searchInput);
    }
    if (inputFilter === 'Name') {
      fetchMealByName(searchInput);
    }
  };

  const clickRequestDrinks = () => {
    if (searchInput.length > 1 && inputFilter === 'First-Letter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (searchInput.length === 1) {
      fetchDrinksbyFirstLetter(searchInput);
    }
    if (inputFilter === 'Ingredient') {
      fetchDrinksByIngredient(searchInput);
    }
    if (inputFilter === 'Name') {
      fetchDrinkByName(searchInput);
    }
  };

  const handleClickSearch = () => {
    if (path === '/foods') {
      clickRequestFoods();
    }
    if (path === '/drinks') {
      clickRequestDrinks();
    }
  };

  return (
    <div>
      <header>
        <nav>
          <Link
            to="/profile"
          >
            <img
              data-testid="profile-top-btn"
              src={ ProfileIcon }
              alt="ProfileIcon"
            />
          </Link>
        </nav>
        <button
          data-testid="page-title"
          type="button"
        >
          Page
        </button>

        <button
          data-testid="search-top-btn"
          type="button"
          onClick={ handleIconSearch }
        >
          <img src={ SearchIcon } alt="SearchIcon" />
        </button>
        <br />
        { iconSearch && (
          <input
            type="text"
            data-testid="search-input"
            name="searchInput"
            value={ searchInput }
            onChange={ handleChangeInputName }
          />
        )}
      </header>
      <br />
      <div>
        <label htmlFor="Ingredient">
          <input
            data-testid="ingredient-search-radio"
            id="Ingredient"
            type="radio"
            name="filter"
            value={ inputFilter }
            onChange={ handleChangeFilters }
          />
          Ingredient
        </label>
        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            id="Name"
            type="radio"
            name="filter"
            value={ inputFilter }
            onChange={ handleChangeFilters }
          />
          Name
        </label>
        <label htmlFor="First-Letter">
          <input
            data-testid="first-letter-search-radio"
            id="First-Letter"
            type="radio"
            name="filter"
            value={ inputFilter }
            onChange={ handleChangeFilters }
          />
          First letter
        </label>
        <br />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClickSearch }
        >
          Search
        </button>
      </div>

    </div>
  );
}

export default Header;
