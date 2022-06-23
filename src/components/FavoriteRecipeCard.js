import { remove } from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FavoriteRecipeCard() {
  const [copied, setCopied] = useState(false);

  // const history = useHistory();
  // const path = history.location.pathname;
  const id = '52771';

  const index = '0';
  const urlFood = `http://localhost:3000/foods/${id}`;

  const handleShareButton = () => {
    navigator.clipboard.writeText(urlFood);
    setCopied(true);
  };

  const handleFavoriteInput = () => {
    remove.localStorage('foods');
  };

  return (
    <section className="recipeContainter">
      <Link to={ `/${type}/${id}` }>
        <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
      </Link>
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
            onClick={ handleShareButton }
            title="share icon"
          >
            <img src={ shareIcon } alt="share logo" />
          </button>
          {copied && <p>Link copied!</p>}
          <label
            htmlFor="favorite"
            data-testid="0-horizontal-favorite-btn"
          >
            <img src={ whiteHeart } alt="share logo" />
            <input id="favorite" type="checkbox" onChange={ handleFavoriteInput } />
          </label>
        </div>
      </div>
    </section>
  );
}

export default FavoriteRecipeCard;
