import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'phosphor-react';
import PropTypes from 'prop-types';
import { removeFavoriteRecipe } from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipeCard({ favoriteRecipe, index }) {
  const [copied, setCopied] = useState(false);
  const cardId = `favoriteCard${index}`;

  const handleShareButton = (type, id) => {
    setCopied(true);
    const URL = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard?.writeText(URL);
  };

  const onClickFavorite = (id) => {
    removeFavoriteRecipe(id);
    const cardElement = document.querySelector(`#${cardId}`);
    cardElement.remove();
  };

  return (
    <section id={ cardId } className="my-4">
      <Link
        to={ favoriteRecipe.type === 'food'
          ? `/foods/${favoriteRecipe.id}`
          : `/drinks/${favoriteRecipe.id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ favoriteRecipe.image }
          alt={ favoriteRecipe.name }
          className="w-[18rem]
          shadow-2xl
          rounded-lg"
        />
      </Link>

      <div className="flex flex-col items-center my-2">
        <Link
          to={ favoriteRecipe.type === 'food'
            ? `/foods/${favoriteRecipe.id}`
            : `/drinks/${favoriteRecipe.id}` }
        >
          <p
            data-testid={ `${index}-horizontal-name` }
            className="font-bold text-red-700"
          >
            {favoriteRecipe.name}
          </p>
        </Link>
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
      </div>
      <div className="flex justify-center space-x-40">
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
          <Heart size={ 31 } color="red" weight="fill" />
        </button>
      </div>
      {copied && <p className="text-center italic mb-2">Link copied!</p>}
    </section>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  favoriteRecipe: PropTypes.shape.isRequired,
};

export default FavoriteRecipeCard;
