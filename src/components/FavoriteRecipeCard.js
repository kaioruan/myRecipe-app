import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { removeFavoriteRecipe } from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
// import Footer from './Footer';

function FavoriteRecipeCard() {
  const [copied, setCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [heartIcon, setHeartIcon] = useState(blackHeartIcon);
  const { renderFavorites } = useContext(RecipesContext);

  useEffect(() => {
    const favFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favFromStorage) {
      const favoriteFilter = favFromStorage.filter(
        (el) => el.type.toLowerCase() === renderFavorites.toLowerCase(),
      );
      switch (renderFavorites) {
      case 'All':
        setFavoriteRecipes(favFromStorage);
        break;
      default:
        setFavoriteRecipes(favoriteFilter);
        break;
      }
    }
  }, [renderFavorites]);

  const handleShareButton = (nameBtn, id) => {
    setCopied(true);
    const URL = `http://localhost:3000/${nameBtn}s/${id}`;
    navigator.clipboard.writeText(URL);
  };

  const onClickFavorite = (id) => {
    removeFavoriteRecipe(id);
    setHeartIcon(whiteHeartIcon);
    const favFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favFromStorage);
    setHeartIcon(blackHeartIcon);
  };

  return (
    <section className="recipeContainter">
      <div className="infoRecipes">
        {favoriteRecipes && favoriteRecipes.map((recipe, index) => (
          <section key={ recipe.id }>
            <Link
              to={ recipe.type === 'food'
                ? `/foods/${recipe.id}`
                : `/drinks/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                className="card-image"
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>

            <div>
              {recipe.type === 'food'
                ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>)
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>
                )}
              <Link
                to={ recipe.type === 'food'
                  ? `/foods/${recipe.id}`
                  : `/drinks/${recipe.id}` }
              >
                <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
              </Link>
            </div>
            <div>
              <button
                id={ recipe.id }
                name={ recipe.type }
                type="button"
                onClick={ () => handleShareButton(recipe.type, recipe.id) }
                title="share icon"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share logo"
                />
              </button>
              {copied && <p>Link copied!</p>}
              <button
                id={ recipe.id }
                type="button"
                onClick={ () => onClickFavorite(recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ heartIcon }
                  alt="favorite icon"
                />
              </button>
            </div>
          </section>
        ))}
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default FavoriteRecipeCard;
