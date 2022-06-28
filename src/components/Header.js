import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchRecipesByName, fetchRecipesByIngredient,
  fetchRecipesByFirstLetter, fetchAllRecipes,
} from '../services/RecipesAPI';
import { trimArray, verifyPageTitle } from '../services/Helpers';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import DropDownMenu from './DropDownMenu';

const RECIPES_NUMBER = 12;
const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';
const getType = (path) => (path.includes('food') ? MEALS_TYPE : COCKTAILS_TYPE);
const getNewPath = (path, recipe) => (path.includes('food')
  ? `/foods/${recipe.idMeal}`
  : `/drinks/${recipe.idDrink}`);

function Header() {
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [serchFilter, setSearchFilter] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const { recipes, setRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;
  const renderDropDown = path.includes('nationalities');
  const renderSearchIcon = path === '/foods' || path === '/drinks' || renderDropDown;

  useEffect(() => {
    const fetchAPI = async () => {
      if (!recipes || recipes.length === 0) {
        const data = await fetchAllRecipes(getType(path));
        setRecipes(trimArray(data, RECIPES_NUMBER, path));
      }
    };
    fetchAPI();
  }, [path, recipes, setRecipes]);

  useEffect(() => {
    verifyPageTitle(path, setPageTitle);
  }, [path]);

  const handleChangeFilters = ({ target }) => {
    setSearchFilter(target.id);
  };

  const handleSearchIcon = () => {
    setRenderSearchBar(!renderSearchBar);
  };

  const handleInputBarChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const onClickSearch = async () => {
    if (searchInput.length > 1 && serchFilter === 'First-Letter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let data;

    switch (serchFilter) {
    case 'Ingredient':
      data = await fetchRecipesByIngredient(getType(path), searchInput);
      break;
    case 'Name':
      data = await fetchRecipesByName(getType(path), searchInput);
      break;
    case 'First-Letter':
      data = await fetchRecipesByFirstLetter(getType(path), searchInput);
      break;
    default:
      data = await fetchAllRecipes(getType(path));
      break;
    }

    const newRecipes = trimArray(data, RECIPES_NUMBER, path);

    if (!newRecipes || (newRecipes && newRecipes.length === 0)) {
      global.alert(ERROR_MESSAGE);
      return;
    }

    if (newRecipes && newRecipes.length === 1) {
      history.push(getNewPath(path, newRecipes[0]));
    } else {
      setRecipes(newRecipes);
    }
  };

  return (
    <header>
      <div>
        <section>
          <Link
            to="/profile"
          >
            <img
              data-testid="profile-top-btn"
              src={ ProfileIcon }
              alt="ProfileIcon"
            />
          </Link>
          <h2 data-testid="page-title">{pageTitle}</h2>
          {renderSearchIcon && (
            <button
              type="button"
              onClick={ handleSearchIcon }
            >
              <img data-testid="search-top-btn" src={ SearchIcon } alt="SearchIcon" />
            </button>)}
          {renderSearchBar && (
            <input
              type="text"
              data-testid="search-input"
              name="searchInput"
              value={ searchInput }
              onChange={ handleInputBarChange }
            />
          )}
          {renderDropDown && <DropDownMenu />}
        </section>
        <br />
      </div>
      <br />
      <div>
        {renderSearchIcon && (
          <section>
            <label htmlFor="Ingredient">
              <input
                data-testid="ingredient-search-radio"
                id="Ingredient"
                type="radio"
                name="filter"
                value={ serchFilter }
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
                value={ serchFilter }
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
                value={ serchFilter }
                onChange={ handleChangeFilters }
              />
              First letter
            </label>
            <br />
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ onClickSearch }
            >
              Search
            </button>
          </section>
        )}
      </div>

    </header>
  );
}

export default Header;
