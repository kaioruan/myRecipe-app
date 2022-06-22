import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchMealById, fetchAllMeals } from '../services/MealsAPI';
import { fetchDrinkById, fetchAllDrinks } from '../services/CocktailsAPI';
import DefaultRecipeCard from '../components/DefaultRecipeCard';

const RECOMMENDATIONS_NUMBER = 6;

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const params = useParams();
  const id = params.foodId || params.drinkId;
  const isFood = path.includes('/foods');

  useEffect(() => {
    const fetchAPI = async () => {
      const recipeData = isFood
        ? await fetchMealById(id)
        : await fetchDrinkById(id);

      const recipeObject = isFood
        ? recipeData.meals[0]
        : recipeData.drinks[0];

      const recommendationsData = isFood
        ? await fetchAllDrinks()
        : await fetchAllMeals();

      // let rec = [];

      // if (isFood) {
      //   rec = [recommendationsData.drinks[0], recommendationsData.drinks[1]];
      // } else {
      //   rec = [recommendationsData.meals[0], recommendationsData.meals[1]];
      // }

      // setRecommendations(rec);

      // setRecommendations(isFood
      //   ? [recommendationsData.drinks[0], recommendationsData.drinks[1]]
      //   : [recommendationsData.meals[0], recommendationsData.meals[1]]);

      setRecommendations(isFood
        ? recommendationsData.drinks.slice(0, RECOMMENDATIONS_NUMBER)
        : recommendationsData.meals.slice(0, RECOMMENDATIONS_NUMBER));

      setRecipe(recipeObject);
    };

    fetchAPI();
  }, [id, path, isFood]);

  const ingredients = Object.entries(recipe)
    .filter((obj) => obj[0].includes('Ingredient') && obj[1]);

  const measures = Object.entries(recipe)
    .filter((obj) => obj[0].includes('Measure') && obj[1] !== ' ');

  const onClickShare = () => {

  };

  const onClickFavorite = () => {

  };

  const onClickStart = () => {

  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipe thumb"
      />
      <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onClickShare }
      >
        Share
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ onClickFavorite }
      >
        Favorite
      </button>

      <p data-testid="recipe-category">
        { isFood && recipe.strCategory }
        { !isFood && recipe.strAlcoholic }
      </p>
      <h3>Ingredients</h3>

      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={ `${ingredient}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient[1]} - ${measures[index][1]}` }
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {isFood && (
        <div>
          <h3>Video</h3>
          <p data-testid="video" />
        </div>
      )}

      <h3>Recommended</h3>
      <div className="recommendations">
        {recommendations.map((rec, index) => (
          <DefaultRecipeCard
            cardTestId={ `${index}-recomendation-card` }
            titleTestId={ `${index}-recomendation-title` }
            key={ rec.idDrink || rec.idMeal }
            recipeId={ rec.idDrink || rec.idMeal }
            index={ index }
            thumb={ rec.strDrinkThumb || rec.strMealThumb }
            name={ rec.strDrink || rec.strMeal }
            category={ isFood ? rec.strCategory : rec.strAlcoholic }
          />))}
      </div>
      <button
        id="details-start-button"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ onClickStart }
      >
        Start
      </button>

    </div>
  );
}

export default RecipeDetails;
