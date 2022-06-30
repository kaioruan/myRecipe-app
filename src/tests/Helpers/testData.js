import mealsRecipes from './mealsRecipesData';
import cocktailsRecipes from './cocktailsRecipesData';

const recipesData = {
  meals: mealsRecipes,
  drinks: cocktailsRecipes,
};

const categoriesData = {
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

const mealsAreasData = {
  meals: [
    { strArea: 'American' },
    { strArea: 'British' },
    { strArea: 'Canadian' },
    { strArea: 'Chinese' },
    { strArea: 'Croatian' },
    { strArea: 'Dutch' },
    { strArea: 'Egyptian' },
    { strArea: 'French' },
    { strArea: 'Greek' },
    { strArea: 'Indian' },
    { strArea: 'Irish' },
    { strArea: 'Italian' },
    { strArea: 'Jamaican' },
    { strArea: 'Japanese' },
    { strArea: 'Kenyan' },
    { strArea: 'Malaysian' },
    { strArea: 'Mexican' },
    { strArea: 'Moroccan' },
    { strArea: 'Polish' },
    { strArea: 'Portuguese' },
    { strArea: 'Russian' },
    { strArea: 'Spanish' },
    { strArea: 'Thai' },
    { strArea: 'Tunisian' },
    { strArea: 'Turkish' },
    { strArea: 'Unknown' },
    { strArea: 'Vietnamese' },
  ],
};

const favoriteRecipes = [
  {
    id: '52977',
    type: 'food',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '52978',
    type: 'food',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Kumpir',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  },
  {
    id: '13501',
    type: 'drink',
    nationality: '',
    category: 'Shot',
    alcoholicOrNot: 'Alcoholic',
    name: 'ABC',
    image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
  },
];

const localStorage = {
  favoriteRecipes,
};

export default { recipesData, categoriesData, mealsAreasData, localStorage };
