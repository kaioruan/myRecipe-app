import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({
  ingredientsList, handleProgressChange, usedIngredients, isInProgressPath }) {
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
            <span className="text-red-700 font-bold tracking-wide">
              { `${el.ingredient}`}
            </span>
            {' '}
            -
            {' '}
            {`${el.measure}` }
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul>
      {ingredientsList.map((el, index) => (
        <li
          key={ `${el.ingredient}${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          <span className="text-red-700 font-bold tracking-wide">
            { `${el.ingredient}`}
          </span>
          {' '}
          -
          {' '}
          {`${el.measure}` }
        </li>
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  handleProgressChange: PropTypes.func.isRequired,
  ingredientsList: PropTypes.arrayOf.isRequired,
  isInProgressPath: PropTypes.bool.isRequired,
  usedIngredients: PropTypes.arrayOf.isRequired,
};

export default IngredientList;
