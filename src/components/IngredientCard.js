import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { index, isFood, name } = props;

  const getIngredientImage = () => (isFood
    ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ getIngredientImage() }
        alt="ingredient thumb"
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  isFood: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientCard;
