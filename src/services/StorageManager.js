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
  const storedUser = localStorage.getItem(USER);
  return storedUser ? JSON.parse(storedUser) : '';
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

const getAlcoholicString = (recipe) => {
  if (recipe.idDrink) return recipe.strAlcoholic;
  return '';
};

export const loadFavoriteRecipes = () => JSON
  .parse(localStorage.getItem(FAVORITE_RECIPES));

export const saveFavoriteRecipe = (recipe) => {
  const doneRecipes = loadFavoriteRecipes();
  const recipeId = recipe.idMeal || recipe.idDrink;

  if (doneRecipes !== null && doneRecipes.some((r) => r.id === recipeId)) return;

  const formatedRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.idMeal ? 'Food' : 'Drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: getAlcoholicString(recipe),
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strMealDrink,
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
  if (inProgressRecipes === null) return { cocktails: {}, meals: {} };
  return inProgressRecipes;
};

export const saveInProgressRecipe = (recipe, usedIngredients) => {
  let inProgressRecipes = loadInProgressRecipes();
  const isFood = recipe.idMeal !== undefined;
  const id = recipe.idMeal || recipe.idDrink;

  if (isFood) {
    inProgressRecipes = {
      meals: {
        ...inProgressRecipes.meals,
        [id]: usedIngredients,
      },
      cocktails: {
        ...inProgressRecipes.cocktails,
      },
    };
  } else {
    inProgressRecipes = {
      meals: {
        ...inProgressRecipes.meals,
      },
      cocktails: {
        ...inProgressRecipes.cocktails,
        [id]: usedIngredients,
      },
    };
  }

  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));
};

export const recipeIsInProgress = (recipeId) => {
  const recipes = loadInProgressRecipes();
  const allKeys = [...Object.keys(recipes.meals), ...Object.keys(recipes.cocktails)];
  const result = allKeys.includes(recipeId);
  return result;
};

export const removeInProgressRecipe = (recipe) => {
  const recipes = loadInProgressRecipes();
  const isFood = recipe.idMeal !== undefined;
  const id = recipe.idMeal || recipe.idDrink;

  if (isFood) {
    if (recipes.meals[id] !== undefined) delete recipes.meals[id];
  } else if (recipes.cocktails[id] !== undefined) delete recipes.cocktails[id];

  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(recipes));
};

// export const loadInProgressRecipeById = (recipeId) => {

// };

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
    alcoholicOrNot: getAlcoholicString(recipe),
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strMealDrink,
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
