import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreCategories() {
  const history = useHistory();
  const path = history.location.pathname;

  const onClickToIngredients = () => {
    const newPath = path === '/explore/foods'
      ? '/explore/foods/ingredients'
      : '/explore/drinks/ingredients';
    history.push(newPath);
  };

  const onClickToNationality = () => {
    history.push('/explore/foods/nationalities');
  };

  const onClickToSurprise = () => {
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ onClickToIngredients }
        >
          By Ingredient
        </button>
        {path === '/explore/foods'
        && (
          <button
            data-testid="explore-by-nationality"
            type="button"
            onClick={ onClickToNationality }
          >
            By Nationality

          </button>)}
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ onClickToSurprise }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreCategories;
