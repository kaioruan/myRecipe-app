import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DefaultRecipeCard(props) {
  const history = useHistory();
  const { pathname } = history.location;
  const {
    cardTestId,
    titleTestId,
    recipeId,
    index,
    name,
    thumb,
    category,
  } = props;

  const destination = pathname.includes('food')
    ? `/foods/${recipeId}`
    : `/drink/${recipeId}`;

  return (
    <Link
      className="recipe-card"
      data-testid={ cardTestId }
      to={ destination }
    >
      <img
        className="card-image"
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt="card thumb"
      />
      <p>{ category }</p>
      <h3 data-testid={ titleTestId }>{ name }</h3>
    </Link>
  );
}

DefaultRecipeCard.propTypes = {
  cardTestId: PropTypes.string.isRequired,
  titleTestId: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default DefaultRecipeCard;
