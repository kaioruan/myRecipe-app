import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainPageRecipeCard(props) {
  // const history = useHistory();
  const { key, index, thumb, name } = props;

  const onCardClicked = ({ target }) => {
    console.log(target);
    console.log(key);
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
  key: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MainPageRecipeCard;
