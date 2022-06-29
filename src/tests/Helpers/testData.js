import mealsRecipes from './mealsRecipesData';
import cocktailsRecipes from './cocktailsRecipesData';

const recipesResponse = {
  meals: mealsRecipes,
  drinks: cocktailsRecipes,
};

const cateogiresReponse = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
  ],
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Other/Unknown' },
    { strCategory: 'Cocoa' },
  ],
};

module.exports = { recipesResponse, cateogiresReponse };
