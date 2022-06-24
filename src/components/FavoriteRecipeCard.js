import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { fetchMealById } from '../services/MealsAPI';
import { removeFavoriteRecipe } from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard() {
  const [copied, setCopied] = useState(false);
  // const [removed, setRemoved] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [heartIcon, setHeartIcon] = useState(blackHeartIcon);

  useEffect(() => {
    const favFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favFromStorage);
  }, []);

  console.log(favoriteRecipes);

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
              <Link to>
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
    </section>
  );
}

export default FavoriteRecipeCard;
