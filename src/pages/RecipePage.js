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
  loadInProgressRecipeIngredients,
} from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RECOMMENDATIONS_NUMBER = 6;

const getCheckboxes = () => Array.from(document.querySelectorAll('.ingredient-checkbox'));

const getStartButtonInnerText = (inProgress) => (
  inProgress ? 'Continue Recipe' : 'Start Recipe');

const getRecipeCategoryText = (isFood, recipe) => (
  isFood ? recipe.strCategory : recipe.strAlcoholic);

const renderVideo = (isFood, url) => (isFood && (
  <div>
    <h3>Video</h3>
    <ReactPlayer data-testid="video" url={ url } />
  </div>));

function RecipePage() {
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
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

      const entries = Object.entries(recipeObject);
      const ingredientsNumber = entries.filter((e) => e[0].includes('Ingredient')).length;
      const list = [];
      for (let i = 1; i <= ingredientsNumber; i += 1) {
        list.push({
          ingredient: entries.find((e) => e[0].includes(`Ingredient${i}`))[1],
          measure: entries.find((e) => e[0].includes(`Measure${i}`))[1],
        });
      }

      setIngredientsList(list.filter((el) => el.ingredient));
      setUsedIngredients(loadInProgressRecipeIngredients(id));
      setHeartIcon(recipeIsFavorite(id) ? blackHeartIcon : whiteHeartIcon);
      setRecipe(recipeObject);
    };

    fetchAPI();
  }, [id, path, isFood, setIngredientsList]);

  const onClickShare = () => {
    const url = `http://localhost:3000${path.split('/in')[0]}`;
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
    history.push('/done-recipes');
  };

  const handleProgressChange = () => {
    const checkedIngredients = getCheckboxes()
      .filter((box) => box.checked)
      .map((box) => box.name);
    saveInProgressRecipe(recipe, checkedIngredients);
    setUsedIngredients(checkedIngredients);
  };

  const areAllIngredientsChecked = () => getCheckboxes()
    .every((box) => usedIngredients.includes(box.name));

  const renderIngredientsList = () => {
    if (isInProgressPath) {
      return (
        <ul>
          {ingredientsList.map((el, index) => (
            <li
              key={ `${el.ingredient}${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                name={ el.ingredient }
                className="ingredient-checkbox"
                type="checkbox"
                defaultChecked={ usedIngredients.includes(el.ingredient) }
                onChange={ handleProgressChange }
              />
              { `${el.ingredient} - ${el.measure}` }
            </li>
          ))}
        </ul>);
    }
    return (
      <ul>
        {ingredientsList.map((el, index) => (
          <li
            key={ `${el.ingredient}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${el.ingredient} - ${el.measure}` }
          </li>
        ))}
      </ul>);
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
      {renderIngredientsList()}
      <h3>Instructions</h3>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {!isInProgressPath && (
        <div>
          {renderVideo(isFood, recipe.strYoutube)}

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
          disabled={ !areAllIngredientsChecked() }
        >
          Finish Recipe
        </button>)}
    </div>
  );
}

export default RecipePage;
