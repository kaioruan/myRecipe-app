import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FavoriteRecipeCard() {
  return (
    <section className="recipeContainter">
      <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
      <div className="infoRecipes">
        <div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            Texto Categoria
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            Texto Nome
          </p>
        </div>
        <div>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
          >
            {shareIcon}
          </button>
          <label htmlFor="favorite">
            {whiteHeart}
            <input id="favorite" type="checkbox" />
          </label>
        </div>
      </div>
    </section>
  );
}

export default FavoriteRecipeCard;
