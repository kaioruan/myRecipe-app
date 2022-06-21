import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainPageRecipeCard from '../components/MainPageRecipeCard';

const RECIPES_NUMBER = 12;
const CATEGORIES_NUMBER = 5;
const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CAT_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CAT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;

  const getURL = (pathname) => {
    if (pathname === '/foods') return MEALS_URL;
    return DRINKS_URL;
  };

  const getCategoryURL = (pathname) => {
    if (pathname === '/foods') return MEALS_CAT_URL;
    return DRINKS_CAT_URL;
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const trimArray = (data, size) => {
        if (path === '/foods') return data.meals.slice(0, size);
        return data.drinks.slice(0, size);
      };

      const categoriesURL = getCategoryURL(path);
      const categoriesResponse = await fetch(categoriesURL);
      const categoriesData = await categoriesResponse.json();

      const recipesURL = getURL(path);
      const recipesResponse = await fetch(recipesURL);
      const recipesData = await recipesResponse.json();

      setRecipes(trimArray(recipesData, RECIPES_NUMBER));
      let catArray = trimArray(categoriesData, CATEGORIES_NUMBER);
      catArray = catArray.map((cat) => cat.strCategory);
      catArray.unshift('All');
      setCategories(catArray);
    };
    fetchAPI();
  }, [path]);

  return (
    <section>
      <nav>
        {categories.map((cat, index) => (
          <button
            data-testid={ `${cat}-category-filter` }
            key={ index }
            type="button"
          >
            { cat }

          </button>))}
      </nav>
      <div>
        { recipes.map((recipe, index) => (
          <MainPageRecipeCard
            key={ recipe.idDrink || recipe.idMeal }
            recipeId={ recipe.idDrink || recipe.idMeal }
            index={ index }
            thumb={ recipe.strDrinkThumb || recipe.strMealThumb }
            name={ recipe.strDrink || recipe.strMeal }
          />))}
      </div>
    </section>
  );
}

export default MainPage;
