export const verifyPageTitle = (path, setPageTitle) => {
  switch (path) {
  case '/foods':
    setPageTitle('Foods');
    break;
  case '/drinks':
    setPageTitle('Drinks');
    break;
  case '/explore':
    setPageTitle('Explore');
    break;
  case '/explore/foods':
    setPageTitle('Explore Foods');
    break;
  case '/explore/drinks':
    setPageTitle('Explore Drinks');
    break;
  case '/explore/foods/ingredients':
    setPageTitle('Explore Ingredients');
    break;
  case '/explore/drinks/ingredients':
    setPageTitle('Explore Ingredients');
    break;
  case '/explore/foods/nationalities':
    setPageTitle('Explore Nationalities');
    break;
  case '/profile':
    setPageTitle('Profile');
    break;
  case '/done-recipes':
    setPageTitle('Done Recipes');
    break;
  case '/favorite-recipes':
    setPageTitle('Favorite Recipes');
    break;
  default:
    break;
  }
};

export const trimArray = (data, size, path) => {
  if (path.includes('foods') && !data.meals) return data.meals;
  if (path.includes('drinks') && !data.drinks) return data.drinks;
  if (path.includes('foods')) return data.meals.slice(0, size);
  return data.drinks.slice(0, size);
};
