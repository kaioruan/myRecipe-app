import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import { fetchRandomMeal } from '../services/MealsAPI';
// import { fetchRandomDrink } from '../services/CocktailsAPI';
import { MEALS_TYPE, COCKTAILS_TYPE, fetchRandomRecipe } from '../services/RecipesAPI';

function ExploreCategories() {
  const history = useHistory();
  const path = history.location.pathname;

  const onClickToIngredients = () => {
    const newPath = path === '/explore/foods'
      ? '/explore/foods/ingredients'
      : '/explore/drinks/ingredients';
    history.push(newPath);
  };

  const onClickToNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const onClickToSurprise = async () => {
    const randomRecipes = path === '/explore/drinks'
      ? await fetchRandomRecipe(COCKTAILS_TYPE)
      : await fetchRandomRecipe(MEALS_TYPE);
    if (randomRecipes.drinks) {
      const idRandom = randomRecipes.drinks[0].idDrink;
      history.push(`/drinks/${idRandom}`);
    } else {
      const idRandom = randomRecipes.meals[0].idMeal;
      history.push(`/foods/${idRandom}`);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ onClickToIngredients }
        >
          By Ingredient
        </button>
        {path === '/explore/foods'
        && (
          <button
            data-testid="explore-by-nationality"
            type="button"
            onClick={ onClickToNationality }
          >
            By Nationality

          </button>)}
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ onClickToSurprise }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreCategories;
