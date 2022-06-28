import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeFilterButtons from '../components/RecipeFilterButtons';
import MainRecipeList from '../components/MainRecipeList';
// import {
//   fetchAllDrinksCategories, fetchAllDrinks, fetchDrinksByCategory,
// } from '../services/CocktailsAPI';
// import {
//   fetchAllMealsCategories, fetchAllMeals, fetchMealsByCategory,
// } from '../services/MealsAPI';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchCategories, fetchAllRecipes, fetchRecipesByCategory,
} from '../services/RecipesAPI';

import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import { trimArray } from '../services/Helpers';

const RECIPES_NUMBER = 12;
const CATEGORIES_NUMBER = 5;

function MainPage() {
  const {
    // recipes,
    setRecipes, previousPath, setPreviousPath,
  } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    const fetchCategoriesLocal = async () => {
      const categoriesData = path === '/foods'
        ? await fetchCategories(MEALS_TYPE)
        : await fetchCategories(COCKTAILS_TYPE);

      let categoriesList = trimArray(categoriesData, CATEGORIES_NUMBER, path);
      categoriesList = categoriesList.map((cat) => cat.strCategory);
      categoriesList.unshift('All');
      setCategories(categoriesList);
    };

    const fetchRecipes = async () => {
      const fetchMeals = async () => (
        selectedCategory === 'All'
          ? fetchAllRecipes(MEALS_TYPE)
          : fetchRecipesByCategory(MEALS_TYPE, selectedCategory)
      );

      const fetchDrinks = async () => (
        selectedCategory === 'All'
          ? fetchAllRecipes(COCKTAILS_TYPE)
          : fetchRecipesByCategory(COCKTAILS_TYPE, selectedCategory)
      );

      const recipesData = path === '/foods'
        ? await fetchMeals()
        : await fetchDrinks();

      setRecipes(trimArray(recipesData, RECIPES_NUMBER, path));
    };

    if (!previousPath.includes('explore')) fetchRecipes();
    fetchCategoriesLocal();
  }, [path, selectedCategory, setRecipes, previousPath, setPreviousPath]);

  const onCategoryButtonClicked = ({ target }) => {
    const newCategory = target.innerText === selectedCategory ? 'All' : target.innerText;
    setPreviousPath(path);
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <Header />
      <section className="main-page-content">
        <RecipeFilterButtons
          categories={ categories }
          onButtonClicked={ onCategoryButtonClicked }
        />
        <MainRecipeList />
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
