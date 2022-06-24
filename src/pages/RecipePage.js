import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { fetchMealById, fetchAllMeals } from '../services/MealsAPI';
import { fetchDrinkById, fetchAllDrinks } from '../services/CocktailsAPI';
import DefaultRecipeCard from '../components/DefaultRecipeCard';
import {
  recipeIsDone, recipeIsInProgress, recipeIsFavorite,
  saveFavoriteRecipe, saveInProgressRecipe, saveDoneRecipe,
  removeFavoriteRecipe,
} from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RECOMMENDATIONS_NUMBER = 6;

const getStartButtonInnerText = (inProgress) => (
  inProgress ? 'Continue Recipe' : 'Start Recipe');

const getRecipeCategoryText = (isFood, recipe) => (
  isFood ? recipe.strCategory : recipe.strAlcoholic);

function RecipePage() {
  const [copied, setCopied] = useState(false);
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [recipe, setRecipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const params = useParams();
  const id = params.foodId || params.drinkId;
  const isFood = path.includes('/foods');
  const isInProgressPath = path.includes('/in-progress');

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

      setRecommendations(isFood
        ? recommendationsData.drinks.slice(0, RECOMMENDATIONS_NUMBER)
        : recommendationsData.meals.slice(0, RECOMMENDATIONS_NUMBER));

      setHeartIcon(recipeIsFavorite(id) ? blackHeartIcon : whiteHeartIcon);
      setRecipe(recipeObject);
    };

    fetchAPI();
  }, [id, path, isFood]);

  const ingredients = Object.entries(recipe)
    .filter((obj) => obj[0].includes('Ingredient') && obj[1]);

  const measures = Object.entries(recipe)
    .filter((obj) => obj[0].includes('Measure') && obj[1] !== ' ');

  const onClickShare = () => {
    const url = `http://localhost:3000${path}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const onClickFavorite = () => {
    if (recipeIsFavorite(id)) {
      removeFavoriteRecipe(id);
      setHeartIcon(whiteHeartIcon);
    } else {
      saveFavoriteRecipe(recipe);
      setHeartIcon(blackHeartIcon);
    }
  };

  const onClickStart = () => {
    if (!recipeIsInProgress(id)) {
      saveInProgressRecipe(recipe, []);
    }
    history.push(`${path}/in-progress`);
  };

  const onClickFinish = () => {
    saveDoneRecipe(recipe);
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
        <img src={ shareIcon } alt="share icon" />
      </button>

      {copied && <p>Link copied!</p>}

      <button type="button" onClick={ onClickFavorite }>
        <img data-testid="favorite-btn" src={ heartIcon } alt="favorite icon" />
      </button>

      <p data-testid="recipe-category">
        {getRecipeCategoryText(isFood, recipe)}
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
      {!isInProgressPath && (
        <div>
          {isFood && (
            <div>
              <h3>Video</h3>
              <ReactPlayer data-testid="video" url={ recipe.strYoutube } />
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
                category={ isFood ? rec.strAlcoholic : rec.strCategory }
              />))}
          </div>
          {isInProgressPath && <div>icon</div>}
          {isInProgressPath && <div>icon</div>}
          {isInProgressPath && <div>icon</div>}
          {isInProgressPath && <div>icon</div>}
          {isInProgressPath && <div>icon</div>}
        </div>)}
      {!recipeIsDone(id) && !isInProgressPath
      && (
        <button
          className="details-button"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ onClickStart }
        >
          { getStartButtonInnerText(recipeIsInProgress(id)) }
        </button>)}

      {isInProgressPath && (
        <button
          className="details-button"
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ onClickFinish }
        >
          Finish Recipe
        </button>)}
    </div>
  );
}

export default RecipePage;
