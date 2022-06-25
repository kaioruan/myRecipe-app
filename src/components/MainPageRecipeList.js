import React from 'react';
import PropTypes from 'prop-types';
import DefaultRecipeCard from './DefaultRecipeCard';

function MainPageRecipeList({ recipes }) {
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

MainPageRecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MainPageRecipeList;
