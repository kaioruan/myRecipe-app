import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Heart } from 'phosphor-react';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchRecipeById, fetchAllRecipes,
} from '../services/RecipesAPI';
import DefaultRecipeCard from '../components/DefaultRecipeCard';
import {
  recipeIsDone, recipeIsInProgress, recipeIsFavorite,
  saveFavoriteRecipe, saveInProgressRecipe, saveDoneRecipe,
  removeFavoriteRecipe, loadInProgressRecipeIngredients,
} from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';

const RECOMMENDATIONS_NUMBER = 6;
const getCheckboxes = () => Array.from(document.querySelectorAll('.ingredient-checkbox'));
const getStartButtonInnerText = (inProgress) => (
  inProgress ? 'Continue Recipe' : 'Start Recipe');

const getRecipeCategoryText = (isFood, recipe) => (
  isFood ? recipe.strCategory : recipe.strAlcoholic);

const renderVideo = (isFood, url) => (isFood && (
  <>
    <div className="flex flex-col justified-center my-3">
      <h3 className="text-center font-bold">Video</h3>
    </div>
    <ReactPlayer data-testid="video" url={ url } width="23rem" />
  </>
));
const getHeartState = (id) => ({
  color: recipeIsFavorite(id) ? 'red' : 'black',
  weight: recipeIsFavorite(id) ? 'fill' : 'regular',
});

function RecipePage() {
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const params = useParams();
  const id = params.foodId || params.drinkId;
  const isFood = path.includes('/foods');
  const isInProgressPath = path.includes('/in-progress');
  const [heartColor, setHeartColor] = useState(getHeartState(id).color);
  const [heartWeight, setHeartWeight] = useState(getHeartState(id).weight);

  useEffect(() => {
    const fetchAPI = async () => {
      const recipeData = isFood
        ? await fetchRecipeById(MEALS_TYPE, id)
        : await fetchRecipeById(COCKTAILS_TYPE, id);

      const recipeObject = isFood
        ? recipeData.meals[0]
        : recipeData.drinks[0];

      const recommendationsData = isFood
        ? await fetchAllRecipes(COCKTAILS_TYPE)
        : await fetchAllRecipes(MEALS_TYPE);

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
      setRecipe(recipeObject);
    };
    fetchAPI();
  }, [id, path, isFood, setIngredientsList]);

  const onClickShare = () => {
    const url = `http://localhost:3000${path.split('/in')[0]}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    setCopied(true);
  };
  const onClickFavorite = () => {
    if (recipeIsFavorite(id)) {
      removeFavoriteRecipe(id);
      setHeartColor('black');
      setHeartWeight('regular');
    } else {
      saveFavoriteRecipe(recipe);
      setHeartColor('red');
      setHeartWeight('fill');
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
                className="mr-1 mt-2"
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
    <main className="mx-2">
      <div className="flex justify-center mt-3 border-2 border-black">
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="recipe thumb"
          className="w-full"
        />
      </div>
      <header className=" mt-3">
        <h2
          data-testid="recipe-title"
          className="text-center font-bold"
        >
          { recipe.strMeal || recipe.strDrink }
        </h2>
        <p data-testid="recipe-category" className="text-center text-red-700 font-bold">
          {getRecipeCategoryText(isFood, recipe)}
        </p>
      </header>
      <section className="flex justify-center space-x-40 mt-1">
        <button type="button" data-testid="share-btn" onClick={ onClickShare }>
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button type="button" onClick={ onClickFavorite }>
          <Heart size={ 31 } color={ heartColor } weight={ heartWeight } />
        </button>
      </section>
      {copied && <p className="text-center italic">Link copied!</p>}
      <article className="mb-4">
        <h3 className="text-center font-bold mt-3">Ingredients</h3>
        {renderIngredientsList()}
        <h3 className="font-bold mt-3">Instructions:</h3>
        <p
          data-testid="instructions"
          className="text-justify"
        >
          { recipe.strInstructions }
        </p>
      </article>
      {!isInProgressPath && (
        <div>
          <section>
            <div className="w-full">
              {renderVideo(isFood, recipe.strYoutube)}
            </div>
            <div>
              {!recipeIsDone(id) && !isInProgressPath
      && (
        <div className="flex items-center justify-center">
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ onClickStart }
            className="bg-white font-bold rounded-lg p-1 w-[18rem] my-3 flex items-center
          justify-center"
          >
            { getStartButtonInnerText(recipeIsInProgress(id)) }
          </button>
        </div>
      )}
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
          </section>
          <h3 className="mt-3 font-bold">Recommended:</h3>
          <nav className="recommendations">
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
          </nav>
        </div>
      )}
    </main>
  );
}
export default RecipePage;
