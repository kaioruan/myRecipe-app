import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MEALS_TYPE, COCKTAILS_TYPE, fetchRandomRecipe } from '../services/RecipesAPI';

function ExploreCategories() {
  const history = useHistory();
  const path = history.location.pathname;
  const isFood = path.includes('food');

  const onClickToIngredients = () => {
    const newPath = path === '/explore/foods'
      ? '/explore/foods/ingredients'
      : '/explore/drinks/ingredients';
    history.push(newPath);
  };

  const onClickToNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const getRandomId = async () => {
    const random = isFood
      ? await fetchRandomRecipe(MEALS_TYPE)
      : await fetchRandomRecipe(COCKTAILS_TYPE);
    return isFood ? random.meals[0].idMeal : random.drinks[0].idDrink;
  };

  const onClickToSurprise = async () => {
    const id = await getRandomId();
    const newPath = isFood ? `/foods/${id}` : `/drinks/${id}`;
    history.push(newPath);
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
