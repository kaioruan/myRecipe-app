import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DoneRecipeCard from '../components/DoneRecipeCard';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import UserRecipesFilter from '../components/UserRecipesFilter';
import Header from '../components/Header';
import { loadFavoriteRecipes, loadDoneRecipes } from '../services/StorageManager';

function UserRecipes() {
  const history = useHistory();
  const isFavoritePage = history.location.pathname.includes('favorite');
  const [copied, setCopied] = useState(false);
  const [renderList, setRenderList] = useState([]);
  const { userRecipesFilter } = useContext(RecipesContext);

  useEffect(() => {
    const loadedRecipes = isFavoritePage ? loadFavoriteRecipes() : loadDoneRecipes();
    const favoriteFilter = loadedRecipes.filter(
      (el) => el.type.toLowerCase() === userRecipesFilter.toLowerCase(),
    );
    switch (userRecipesFilter) {
    case 'All':
      setRenderList(loadedRecipes);
      break;
    default:
      setRenderList(favoriteFilter);
      break;
    }
  }, [userRecipesFilter, isFavoritePage]);

  const handleShareButton = (type, id) => {
    setCopied(true);
    const URL = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(URL);
  };

  return (
    <div>
      <Header />
      <UserRecipesFilter />
      {copied && <p>Link copied!</p>}
      <section className="recipeContainter">
        <div className="infoRecipes">
          {renderList && renderList.map((recipe, index) => (
            <div key={ `userRecipe${index}` }>
              {isFavoritePage ? (
                <FavoriteRecipeCard
                  favoriteRecipe={ recipe }
                  index={ index }
                  handleShareButton={ handleShareButton }
                />
              ) : (
                <DoneRecipeCard
                  index={ index }
                  handleShareButton={ handleShareButton }
                  doneRecipe={ recipe }
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserRecipes;
