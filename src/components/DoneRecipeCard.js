import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard() {
  const index = '0';
  const thumb = 'teste';
  const tagName = 'teste';

  return (
    <section>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ thumb }
        alt="card thumb"
      />
      <div className="recipeInfoContainer">
        <p data-testid={ `${index}-horizontal-top-text` }>
          Texto Categoria
        </p>
        <p data-testid={ `${index}-horizontal-name` }>
          Texto Nome
        </p>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
        >
          {shareIcon}
        </button>
        <p data-testid={ `${index}-horizontal-done-date` }>
          Texto Data que foi feito
        </p>
      </div>
      <div className="tagContainer">
        <p data-testid={ `${index}-${tagName}-horizontal-tag` }>texto</p>
      </div>
    </section>
  );
}

export default DoneRecipeCard;
