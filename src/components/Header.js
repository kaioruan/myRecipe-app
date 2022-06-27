import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MagnifyingGlass, User } from 'phosphor-react';
import RecipesContext from '../context/RecipesContext';
import { fetchMealByName,
  fetchMealsByIngredient,
  fetchMealsbyFirstLetter, fetchListAllNationalities } from '../services/MealsAPI';
import { fetchDrinksByIngredient,
  fetchDrinkByName,
  fetchDrinksbyFirstLetter } from '../services/CocktailsAPI';
import { trimArray, verifyPageTitle } from '../services/Helpers';

const RECIPES_NUMBER = 12;
const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

function Header() {
  const [iconSearch, setIconSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [inputFilter, setInputFilter] = useState('');
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [renderIconSearch, setRenderIconSearch] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [renderSelect, setRenderSelect] = useState(false);
  const [nationalitiesList, setNationalitiesList] = useState([]);
  const { recipes, setRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const path = history.location.pathname;
  const nationalitiesPath = '/explore/foods/nationalities';

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

  const fetchNationalities = async () => {
    const response = await fetchListAllNationalities();
    setNationalitiesList(response.meals);
  };

  useEffect(() => {
    if (path === '/foods'
    || path === '/drinks'
    || path === nationalitiesPath) setRenderIconSearch(true);
    if (path === '/explore/foods/nationalities') {
      setRenderSelect(true);
      fetchNationalities();
    }
  }, [path]);

  useEffect(() => {
    verifyPageTitle(path, setPageTitle);
  }, [path]);

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
      setRecipes(trimArray(response, RECIPES_NUMBER, path));
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
      setRecipes(trimArray(response, RECIPES_NUMBER, path));
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
    <header className="bg-red-600 flex flex-col justify-center items-center">
      <div>
        <section className="flex space-x-[8rem] mt-1">
          <Link
            to="/profile"
          >
            <User size={ 35 } className="text-white" />
          </Link>
          <h2
            data-testid="page-title"
            className="mt-2
          text-white font-bold"
          >
            {pageTitle}
          </h2>
          {renderIconSearch && (
            <button
              type="button"
              onClick={ handleIconSearch }
            >
              <MagnifyingGlass size={ 35 } className="text-white" />
            </button>)}
          {renderSelect && (
            <select type="dropdown">
              {nationalitiesList
                .map((area, i) => <option key={ i }>{area.strArea}</option>)}
            </select>
          )}
          {iconSearch && (
            <input
              type="text"
              data-testid="search-input"
              name="searchInput"
              value={ searchInput }
              onChange={ handleChangeInputName }
            />
          )}
        </section>
        <br />
      </div>
      <br />
      <div>
        {renderIconSearch && (
          <div>
            <section className="space-x-5 text-white font-semibold">
              <label
                htmlFor="Ingredient"
              >
                <input
                  data-testid="ingredient-search-radio"
                  id="Ingredient"
                  type="radio"
                  name="filter"
                  value={ inputFilter }
                  onChange={ handleChangeFilters }
                  className="mr-3"
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
                  className="mr-3"
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
                  className="mr-3"
                />
                First letter
              </label>
            </section>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClickSearch }
              className="ml-[8.6rem]
              mt-1.5 mb-2 bg-gray-300
              px-5
              rounded-md
              flex items-center justify-center"
            >
              Search
            </button>
          </div>
        )}
      </div>

    </header>
  );
}

export default Header;
