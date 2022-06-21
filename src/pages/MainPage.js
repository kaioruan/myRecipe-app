import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainPageRecipeCard from '../components/MainPageRecipeCard';

const RECIPES_NUMBER = 12;
const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;

  const getURL = (pathname) => {
    if (pathname === '/foods') return MEALS_URL;
    return DRINKS_URL;
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const trimFetchedArray = (data) => {
        if (path === '/foods') return data.meals.slice(0, RECIPES_NUMBER);
        return data.drinks.slice(0, RECIPES_NUMBER);
      };

      const correctURL = getURL(path);
      const response = await fetch(correctURL);
      const data = await response.json();
      console.log(data);
      setRecipes(trimFetchedArray(data));
    };
    fetchAPI();
  }, [path]);

  return (
    <section>
      {path === '/foods'
        ? (
          recipes.map((recipe, index) => (
            <MainPageRecipeCard
              key={ recipe.idMeal }
              index={ index }
              thumb={ recipe.strMealThumb }
              name={ recipe.strMeal }
            />))
        ) : (
          recipes.map((recipe, index) => (
            <MainPageRecipeCard
              key={ recipe.idDrink }
              index={ index }
              thumb={ recipe.strDrinkThumb }
              name={ recipe.strDrink }
            />))
        )}
    </section>
  );
}

export default MainPage;
