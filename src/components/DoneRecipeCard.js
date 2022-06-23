import React from 'react';
import RecipesHeader from './RecipesHeader';

function DoneRecipeCard() {
  return (
    <div>
      <RecipesHeader />
      <main>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ thumb }
          alt="card thumb"
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          Texto Categoria
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          Texto Nome
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          Texto Data que foi feito
        </p>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          type="button"
        >
          Share
        </button>
      </main>
    </div>
  );
}

export default DoneRecipeCard;
