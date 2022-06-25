import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchDrinksIngredients } from '../services/CocktailsAPI';
import { fetchMealsIngredients } from '../services/MealsAPI';
import { trimArray } from '../services/Helpers';

const INGREDIENTS_NUMBER = 12;

function ExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const isFood = path.includes('foods');

  useEffect(() => {
    const fecthAPI = async () => {
      const data = isFood
        ? await fetchMealsIngredients()
        : await fetchDrinksIngredients();

      const trimmedData = trimArray(data, INGREDIENTS_NUMBER, path);
      const ingredientsNames = trimmedData
        .map((element) => element.strIngredient || element.strIngredient1);
      setIngredients(ingredientsNames);
    };

    fecthAPI();
  }, [isFood, path]);

  return (
    <div>
      <Header />
      {ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ `ingredient${index}` }
          index={ index }
          name={ ingredient }
          isFood={ isFood }
        />
      )) }
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
