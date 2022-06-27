import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ index, doneRecipe, handleShareButton }) {
  const isFood = doneRecipe.type.toLowerCase() === 'food';

  const tagsArray = Array.isArray(doneRecipe.tags)
    ? doneRecipe.tags : doneRecipe.tags.split(',');

  const topText = isFood
    ? `${doneRecipe.nationality} - ${doneRecipe.category}`
    : doneRecipe.alcoholicOrNot;

  return (
    <section>
      <Link
        to={ isFood
          ? `/foods/${doneRecipe.id}`
          : `/drinks/${doneRecipe.id}` }
      >
        <img
          className="card-image"
          data-testid={ `${index}-horizontal-image` }
          src={ doneRecipe.image }
          alt="card thumb"
        />
      </Link>

      <div className="recipeInfoContainer">
        <p data-testid={ `${index}-horizontal-top-text` }>
          { topText }
        </p>
        <Link
          to={ isFood
            ? `/foods/${doneRecipe.id}`
            : `/drinks/${doneRecipe.id}` }
        >
          <p data-testid={ `${index}-horizontal-name` }>
            {doneRecipe.name}
          </p>
        </Link>
        <button
          // data-testid={ `${index}-horizontal-share-btn` }
          onClick={
            () => handleShareButton(doneRecipe.type.toLowerCase(), doneRecipe.id)
          }
          type="button"
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            className="card-image"
            src={ shareIcon }
            alt="done recipe thumb"
          />
        </button>
        <p data-testid={ `${index}-horizontal-done-date` }>
          {doneRecipe.doneDate}
        </p>
      </div>
      <div className="tagContainer">
        {tagsArray.map((tag) => (
          <span
            key={ `tag${tag}${index}` }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </span>
        ))}
      </div>
    </section>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  doneRecipe: PropTypes.shape.isRequired,
  handleShareButton: PropTypes.func.isRequired,
};

export default DoneRecipeCard;
