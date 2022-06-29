import { loadCocktailsToken, loadMealsToken } from './StorageManager';

export const MEALS_TYPE = 'meals';
export const COCKTAILS_TYPE = 'cocktails';

const MEALS_BASE_API = `https://www.themealdb.com/api/json/v1/${loadMealsToken()}`;
const COCKTAILS_BASE_API = `https://www.thecocktaildb.com/api/json/v1/${loadCocktailsToken()}`;

const getBaseURL = (type) => (type === MEALS_TYPE
  ? MEALS_BASE_API : COCKTAILS_BASE_API);

const fetchBase = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchAllRecipes = async (type) => (
  fetchBase(`${getBaseURL(type)}/search.php?s=`));

export const fetchRecipeById = async (type, id) => (
  fetchBase(`${getBaseURL(type)}/lookup.php?i=${id}`));

export const fetchRecipesByName = async (type, name) => (
  fetchBase(`${getBaseURL(type)}/search.php?s=${name}`));

export const fetchRecipesByFirstLetter = async (type, letter) => (
  fetchBase(`${getBaseURL(type)}/search.php?f=${letter}`));

export const fetchRecipesByIngredient = async (type, ingredient) => (
  fetchBase(`${getBaseURL(type)}/filter.php?i=${ingredient}`));

export const fetchRecipesByCategory = async (type, category) => (
  fetchBase(`${getBaseURL(type)}/filter.php?c=${category}`));

export const fetchCategories = async (type) => (
  fetchBase(`${getBaseURL(type)}/list.php?c=list`));

export const fetchIngredients = async (type) => (
  fetchBase(`${getBaseURL(type)}/list.php?i=list`));

export const fetchRandomRecipe = async (type) => (
  fetchBase(`${getBaseURL(type)}/random.php`));

export const fetchAllMealsAreas = async () => (
  fetchBase(`${getBaseURL(MEALS_TYPE)}/list.php?a=list`));

export const fetchMealsByArea = async (area) => (
  fetchBase(`${getBaseURL(MEALS_TYPE)}/filter.php?a=${area}`));
