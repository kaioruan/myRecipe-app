const USER_KEY = 'user';
const MEALS_TOKEN_KEY = 'mealsToken';
const COCKTAILS_TOKEN_KEY = 'cocktailsToken';

export const saveUser = (email) => {
  localStorage.setItem(USER_KEY, { email });
};

export const loadUser = () => localStorage.getItem(USER_KEY);

export const saveMealsToken = (token) => {
  localStorage.setItem(MEALS_TOKEN_KEY, token);
};

export const loadMealsToken = () => localStorage.getItem(MEALS_TOKEN_KEY) || 1;

export const saveCocktailsToken = (token) => {
  localStorage.setItem(COCKTAILS_TOKEN_KEY, token);
};

export const loadCocktailsToken = () => localStorage.getItem(COCKTAILS_TOKEN_KEY) || 1;
