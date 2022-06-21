import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainPageRecipeCard(props) {
  const history = useHistory();
  const { recipeId, index, thumb, name } = props;

  const onCardClicked = () => {
    const { pathname } = history.location;
    console.log(history.location.pathname);
    console.log(recipeId);
    const newPath = `${pathname}/${recipeId}`;
    console.log(newPath);
    history.push(newPath);
  };

  return (
    <button
      data-testid={ `${index}-recipe-card` }
      type="button"
      onClick={ onCardClicked }
    >
      <img data-testid={ `${index}-card-image` } src={ thumb } alt="card thumb" />
      <p>{ name }</p>
    </button>
  );
}

MainPageRecipeCard.propTypes = {
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MainPageRecipeCard;
