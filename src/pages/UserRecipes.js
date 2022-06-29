import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import DoneRecipeCard from '../components/DoneRecipeCard';
import UserRecipesFilter from '../components/UserRecipesFilter';
import { loadFavoriteRecipes, loadDoneRecipes } from '../services/StorageManager';
import HeaderSimple from '../components/HeaderSimple';
import Footer from '../components/Footer';

function UserRecipes() {
  const history = useHistory();
  const isFavoritePage = history.location.pathname.includes('favorite');
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

  return (
    <div>
      <HeaderSimple />
      <main className="flex flex-col items-center">
        <UserRecipesFilter />
        <section className="recipeContainter">
          <div className="infoRecipes">
            {renderList && renderList.map((recipe, index) => (
              <div key={ `userRecipe${index}` }>
                {isFavoritePage ? (
                  <FavoriteRecipeCard
                    favoriteRecipe={ recipe }
                    index={ index }
                  />
                ) : (
                  <DoneRecipeCard
                    index={ index }
                    doneRecipe={ recipe }
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default UserRecipes;
