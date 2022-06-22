import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import { fetchMealByName,
  fetchMealsByIngredient,
  fetchMealsbyFirstLetter } from '../services/MealsAPI';
import { fetchDrinksByIngredient,
  fetchDrinkByName,
  fetchDrinksbyFirstLetter } from '../services/CocktailsAPI';
import RecipesContext from '../context/RecipesContext';

const RECIPES_NUMBER = 12;
const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

function Header() {
  const [iconSearch, setIconSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [inputFilter, setInputFilter] = useState('');
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const { recipes, setRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    if (dataDrinks?.length === 1) { // se dataDrinks for null, não faz a checagem
      history.push(`/drinks/${dataDrinks[0].idDrink}`);
    }
    if (recipes === null) {
      global.alert(ERROR_MESSAGE);
    }
    if (dataMeals?.length === 1) {
      history.push(`/foods/${dataMeals[0].idMeal}`);
    }
  }, [dataDrinks, dataMeals, history, recipes]);

  // useEffect(() => {
  //   if (recipes.length === 0) {
  //     global.alert(ERROR_MESSAGE);
  //   }
  // });

  const handleChangeFilters = ({ target }) => {
    setInputFilter(target.id);
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

  const trimArray = (data, size) => {
    if (path === '/foods' && !data.meals) return data.meals;
    if (path === '/drinks' && !data.drinks) return data.drinks;
    if (path === '/foods') return data.meals.slice(0, size);
    return data.drinks.slice(0, size);
  };

  const clickRequestFoods = async () => {
    if (searchInput.length > 1 && inputFilter === 'First-Letter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (searchInput.length === 1) {
      await fetchMealsbyFirstLetter(searchInput);
    }
    if (inputFilter === 'Ingredient') {
      await fetchMealsByIngredient(searchInput);
    }
    if (inputFilter === 'Name') {
      const response = await fetchMealByName(searchInput);
      setDataMeals(response.meals);
      setRecipes(trimArray(response, RECIPES_NUMBER));
    }
  };

  const clickRequestDrinks = async () => {
    if (searchInput.length > 1 && inputFilter === 'First-Letter') {
      global.alert('Your search must have only 1 (one) character');
    }
    if (searchInput.length === 1) {
      await fetchDrinksbyFirstLetter(searchInput);
    }
    if (inputFilter === 'Ingredient') {
      await fetchDrinksByIngredient(searchInput);
    }
    if (inputFilter === 'Name') {
      const response = await fetchDrinkByName(searchInput);
      setDataDrinks(response.drinks);
      setRecipes(trimArray(response, RECIPES_NUMBER));
    }
  };

  const handleClickSearch = async () => {
    if (path === '/foods') {
      await clickRequestFoods();
    }
    if (path === '/drinks') {
      await clickRequestDrinks();
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
