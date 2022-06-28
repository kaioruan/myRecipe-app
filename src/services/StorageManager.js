const USER = 'user';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES = 'doneRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';

export const saveUser = (email) => {
  localStorage.setItem(USER, JSON.stringify({ email }));
};

export const loadUser = () => {
  const storedUser = JSON.parse(localStorage.getItem(USER));
  return storedUser || { email: '' };
};

export const saveMealsToken = (token) => {
  localStorage.setItem(MEALS_TOKEN, token);
};

export const loadMealsToken = () => JSON.parse(localStorage.getItem(MEALS_TOKEN)) || 1;

export const saveCocktailsToken = (token) => {
  localStorage.setItem(COCKTAILS_TOKEN, token);
};

export const loadCocktailsToken = () => JSON
  .parse(localStorage.getItem(COCKTAILS_TOKEN)) || 1;

export const loadFavoriteRecipes = () => JSON
  .parse(localStorage.getItem(FAVORITE_RECIPES)) || [];

export const saveFavoriteRecipe = (recipe) => {
  const doneRecipes = loadFavoriteRecipes();
  const recipeId = recipe.idMeal || recipe.idDrink;

  if (doneRecipes !== null && doneRecipes.some((r) => r.id === recipeId)) return;

  const formatedRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.idMeal ? 'food' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.idDrink ? recipe.strAlcoholic : '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  if (doneRecipes === null) {
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify([formatedRecipe]));
  } else {
    localStorage
      .setItem(FAVORITE_RECIPES, JSON.stringify([...doneRecipes, formatedRecipe]));
  }
};

export const removeFavoriteRecipe = (recipeId) => {
  const recipes = loadFavoriteRecipes();
  const filteredRecipes = recipes.filter((r) => r.id !== recipeId);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(filteredRecipes));
};

export const recipeIsFavorite = (recipeId) => {
  const favoriteRecipes = loadFavoriteRecipes();
  if (favoriteRecipes === null) return false;
  return favoriteRecipes.some((r) => r.id === recipeId);
};

export const loadInProgressRecipes = () => {
  const inProgressRecipes = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
  return inProgressRecipes || { cocktails: {}, meals: {} };
};

export const saveInProgressRecipe = (recipe, usedIngredients) => {
  const type = recipe.idMeal ? 'meals' : 'cocktails';
  const id = recipe.idMeal || recipe.idDrink;

  const inProgressRecipes = {
    ...loadInProgressRecipes(),
    [type]: {
      [id]: usedIngredients,
    },
  };

  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));
};

export const recipeIsInProgress = (recipeId) => {
  const recipes = loadInProgressRecipes();
  let allKeys = [];
  if (recipes.cocktails) allKeys = [...Object.keys(recipes.cocktails)];
  if (recipes.meals) allKeys = [...allKeys, ...Object.keys(recipes.meals)];
  const result = allKeys.includes(recipeId);
  return result;
};

export const removeInProgressRecipe = (recipe) => {
  const id = recipe.idMeal || recipe.idDrink;
  if (!recipeIsInProgress(id)) return;
  const recipes = loadInProgressRecipes();
  const isFood = recipe.idMeal !== undefined;

  if (isFood) {
    delete recipes.meals[id];
  } else delete recipes.cocktails[id];

  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(recipes));
};

const getEntries = (object) => (object ? Object.entries(object) : []);

export const loadInProgressRecipeIngredients = (recipeId) => {
  const { cocktails, meals } = loadInProgressRecipes();
  const allEntries = [...getEntries(cocktails), ...getEntries(meals)];
  const result = allEntries.find((entry) => entry[0] === recipeId);
  return result ? result[1] : [];
};

export const loadDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPES)) || [];

export const saveDoneRecipe = (recipe) => {
  const doneRecipes = loadDoneRecipes();
  const recipeId = recipe.idMeal || recipe.idDrink;

  removeInProgressRecipe(recipe);

  if (doneRecipes.some((r) => r.id === recipeId)) return;

  const date = new Date();
  const formatedRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.idMeal ? 'Food' : 'Drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.idDrink ? recipe.strAlcoholic : '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    tags: recipe.strTags || '',
  };

  localStorage.setItem(DONE_RECIPES, JSON.stringify([...doneRecipes, formatedRecipe]));
};

export const recipeIsDone = (recipeId) => {
  const doneRecipes = loadDoneRecipes();
  if (doneRecipes.length === 0) return false;
  return doneRecipes.some((r) => r.id === recipeId);
};
