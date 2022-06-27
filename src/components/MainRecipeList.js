import React, { useContext } from 'react';
import DefaultRecipeCard from './DefaultRecipeCard';
import RecipesContext from '../context/RecipesContext';

function MainRecipeList() {
  const { recipes } = useContext(RecipesContext);
  return (
    <div className="recipes-list">
      { recipes && recipes.map((recipe, index) => (
        <DefaultRecipeCard
          key={ recipe.idDrink || recipe.idMeal }
          cardTestId={ `${index}-recipe-card` }
          titleTestId={ `${index}-card-name` }
          recipeId={ recipe.idDrink || recipe.idMeal }
          index={ index }
          thumb={ recipe.strDrinkThumb || recipe.strMealThumb }
          name={ recipe.strDrink || recipe.strMeal }
          category={ recipe.strCategory || '' }
        />))}
    </div>
  );
}

export default MainRecipeList;
