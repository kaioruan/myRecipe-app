import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainPageRecipeCard(props) {
  const history = useHistory();
  const { pathname } = history.location;
  const { recipeId, index, thumb, name } = props;

  return (
    <Link
      data-testid={ `${index}-recipe-card` }
      to={ `${pathname}/${recipeId}` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt="card thumb"
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </Link>
  );
}

MainPageRecipeCard.propTypes = {
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MainPageRecipeCard;
