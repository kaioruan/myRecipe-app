import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import DefaultRecipeCard from '../components/DefaultRecipeCard';
import {
  fetchAllDrinksCategories, fetchAllDrinks, fetchDrinksByCategory,
} from '../services/CocktailsAPI';
import {
  fetchAllMealsCategories, fetchAllMeals, fetchMealsByCategory,
} from '../services/MealsAPI';
import RecipesContext from '../context/RecipesContext';

const RECIPES_NUMBER = 12;
const CATEGORIES_NUMBER = 5;

function MainPage() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  console.log(recipes);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    const fetchAPI = async () => {
      const fetchMeals = async () => (
        selectedCategory === 'All'
          ? fetchAllMeals()
          : fetchMealsByCategory(selectedCategory)
      );

      const fetchDrinks = async () => (
        selectedCategory === 'All'
          ? fetchAllDrinks()
          : fetchDrinksByCategory(selectedCategory)
      );

      const trimArray = (data, size) => {
        if (path === '/foods') return data.meals.slice(0, size);
        return data.drinks.slice(0, size);
      };

      const categoriesData = path === '/foods'
        ? await fetchAllMealsCategories()
        : await fetchAllDrinksCategories();

      const recipesData = path === '/foods'
        ? await fetchMeals()
        : await fetchDrinks();

      setRecipes(trimArray(recipesData, RECIPES_NUMBER));

      let catArray = trimArray(categoriesData, CATEGORIES_NUMBER);
      catArray = catArray.map((cat) => cat.strCategory);
      catArray.unshift('All');
      setCategories(catArray);
    };
    fetchAPI();
  }, [path, selectedCategory, setRecipes]);

  const onCategoryButtonClicked = ({ target }) => {
    const newCategory = target.innerText === selectedCategory ? 'All' : target.innerText;
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <Header />
      <section>
        <nav>
          {categories.map((cat, index) => (
            <button
              data-testid={ `${cat}-category-filter` }
              key={ index }
              type="button"
              onClick={ onCategoryButtonClicked }
            >
              { cat }

            </button>))}
        </nav>
        <div className="main-page-recipes">
          { recipes.map((recipe, index) => (
            <DefaultRecipeCard
              key={ recipe.idDrink || recipe.idMeal }
              cardTestId={ `${index}-recipe-card` }
              titleTestId={ `${index}-card-name` }
              recipeId={ recipe.idDrink || recipe.idMeal }
              index={ index }
              thumb={ recipe.strDrinkThumb || recipe.strMealThumb }
              name={ recipe.strDrink || recipe.strMeal }
              category={ recipe.strCategory }
            />))}
        </div>
      </section>
    </div>
  );
}

export default MainPage;
