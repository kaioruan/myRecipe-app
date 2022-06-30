import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
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
