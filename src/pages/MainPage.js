import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeFilterButtons from '../components/RecipeFilterButtons';
import MainRecipeList from '../components/MainRecipeList';
import {
  fetchAllDrinksCategories, fetchAllDrinks, fetchDrinksByCategory,
} from '../services/CocktailsAPI';
import {
  fetchAllMealsCategories, fetchAllMeals, fetchMealsByCategory,
} from '../services/MealsAPI';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import { trimArray } from '../services/Helpers';

const RECIPES_NUMBER = 12;
const CATEGORIES_NUMBER = 5;

function MainPage() {
  const {
    setRecipes, previousPath, setPreviousPath,
  } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = path === '/foods'
        ? await fetchAllMealsCategories()
        : await fetchAllDrinksCategories();

      let catArray = trimArray(categoriesData, CATEGORIES_NUMBER, path);
      catArray = catArray.map((cat) => cat.strCategory);
      catArray.unshift('All');
      setCategories(catArray);
    };

    const fetchRecipes = async () => {
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

      const recipesData = path === '/foods'
        ? await fetchMeals()
        : await fetchDrinks();

      setRecipes(trimArray(recipesData, RECIPES_NUMBER, path));
    };

    if (!previousPath.includes('explore')) fetchRecipes();
    fetchCategories();
  }, [path, selectedCategory, setRecipes, previousPath, setPreviousPath]);

  const onCategoryButtonClicked = ({ target }) => {
    const newCategory = target.innerText === selectedCategory ? 'All' : target.innerText;
    setPreviousPath(path);
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <Header />
      <section className="flex justify-center items-center">
        <RecipeFilterButtons
          categories={ categories }
          onButtonClicked={ onCategoryButtonClicked }
          path={ path }
        />
      </section>
      <main>
        <MainRecipeList />
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
