import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { removeFavoriteRecipe } from '../services/StorageManager';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipeCard({ favoriteRecipe, index, handleShareButton }) {
  const cardId = `favoriteCard${index}`;

  const onClickFavorite = (id) => {
    removeFavoriteRecipe(id);
    const cardElement = document.querySelector(`#${cardId}`);
    cardElement.remove();
  };

  return (
    <section id={ cardId }>
      <Link
        to={ favoriteRecipe.type === 'food'
          ? `/foods/${favoriteRecipe.id}`
          : `/drinks/${favoriteRecipe.id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          className="card-image"
          src={ favoriteRecipe.image }
          alt={ favoriteRecipe.name }
        />
      </Link>

      <div>
        {favoriteRecipe.type === 'food'
          ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${favoriteRecipe.nationality} - ${favoriteRecipe.category}`}
            </p>)
          : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {favoriteRecipe.alcoholicOrNot}
            </p>
          )}
        <Link
          to={ favoriteRecipe.type === 'food'
            ? `/foods/${favoriteRecipe.id}`
            : `/drinks/${favoriteRecipe.id}` }
        >
          <h4 data-testid={ `${index}-horizontal-name` }>{favoriteRecipe.name}</h4>
        </Link>
      </div>
      <div>
        <button
          id={ favoriteRecipe.id }
          name={ favoriteRecipe.type }
          type="button"
          onClick={ () => handleShareButton(favoriteRecipe.type, favoriteRecipe.id) }
          title="share icon"
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share logo"
          />
        </button>
        <button
          id={ favoriteRecipe.id }
          type="button"
          onClick={ () => onClickFavorite(favoriteRecipe.id) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="favorite icon"
          />
        </button>
      </div>
    </section>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  favoriteRecipe: PropTypes.shape.isRequired,
  handleShareButton: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
