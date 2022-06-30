import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchIngredients, fetchRecipesByIngredient,
} from '../services/RecipesAPI';
import { trimArray } from '../services/Helpers';
import RecipesContext from '../context/RecipesContext';
import HeaderSimple from '../components/HeaderSimple';

const MAX_CARDS = 12;

function ExploreByIngredients() {
  const { setRecipes, setPreviousPath } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const isFood = path.includes('foods');

  useEffect(() => {
    const fecthAPI = async () => {
      const data = isFood
        ? await fetchIngredients(MEALS_TYPE)
        : await fetchIngredients(COCKTAILS_TYPE);

      const trimmedData = trimArray(data, MAX_CARDS, path);
      const ingredientsNames = trimmedData
        .map((element) => element.strIngredient || element.strIngredient1);
      setIngredients(ingredientsNames);
    };

    fecthAPI();
  }, [isFood, path]);

  const onClickIngredient = async (ingredient) => {
    const data = isFood
      ? await fetchRecipesByIngredient(MEALS_TYPE, ingredient)
      : await fetchRecipesByIngredient(COCKTAILS_TYPE, ingredient);
    setRecipes(trimArray(data, MAX_CARDS, path));
    setPreviousPath(path);
    history.push(isFood ? '/foods' : '/drinks');
  };

  return (
    <div>
      <HeaderSimple />
      <section
        className="flex flex-wrap mx-2 justify-center items-center mb-6 mt-4"
      >
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ `ingredient${index}` }
            index={ index }
            name={ ingredient }
            isFood={ isFood }
            searchRecipes={ onClickIngredient }
          />
        )) }
      </section>
      <Footer />
    </div>
  );
}

export default ExploreByIngredients;
