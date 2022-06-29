import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
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
      <HeaderSimple />
      <section
        className="flex justify-center items-center space-x-4
      my-8 mx-2 "
      >
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ onClickToIngredients }
          className="bg-white px-2 rounded-md "
        >
          By Ingredient
        </button>
        {path === '/explore/foods'
        && (
          <button
            data-testid="explore-by-nationality"
            type="button"
            onClick={ onClickToNationality }
            className="bg-white  px-2 rounded-md"
          >
            By Nationality

          </button>)}
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ onClickToSurprise }
          className="bg-white  px-2 rounded-md"
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreCategories;
