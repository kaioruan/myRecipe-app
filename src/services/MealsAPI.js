const BASE_API = 'https://www.themealdb.com/api/json/v1/1';

export const fetchMealById = async (id) => {
  const URL = `${BASE_API}/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealByName = async (name) => {
  const URL = `${BASE_API}/search.php?s=${name}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealsbyFirstLetter = async (letter) => {
  const URL = `${BASE_API}/search.php?f=${letter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealsByIngredient = async (ingredient) => {
  const URL = `${BASE_API}/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealsByCategory = async (category) => {
  const URL = `${BASE_API}/filter.php?c=${category}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealsByArea = async (area) => {
  const URL = `${BASE_API}/filter.php?a=${area}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchListAllNationalities = async () => {
  const URL = `${BASE_API}/list.php?a=list`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchRandomMeal = async () => {
  const URL = `${BASE_API}/random.php`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchAllMealsCategories = async () => {
  const URL = `${BASE_API}/list.php?c=list`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchAllMeals = async () => {
  const URL = `${BASE_API}/search.php?s=`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchMealsIngredients = async () => {
  const URL = `${BASE_API}/list.php?i=list`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
