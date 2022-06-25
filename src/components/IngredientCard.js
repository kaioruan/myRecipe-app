import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { index, isFood, name, searchRecipes } = props;

  const getIngredientImage = () => (isFood
    ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);

  return (
    <button
      type="button"
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => searchRecipes(name) }
    >
      <img
        className="card-image"
        data-testid={ `${index}-card-img` }
        src={ getIngredientImage() }
        alt="ingredient thumb"
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </button>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  isFood: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  searchRecipes: PropTypes.func.isRequired,
};

export default IngredientCard;
