import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();

  const onClickExploreFoods = () => {
    history.push('/explore/foods');
  };

  const onClickExploreDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <div>
      <Header />
      <button
        data-testid="explore-foods"
        type="button"
        onClick={ onClickExploreFoods }
      >
        Explore Foods
      </button>
      <br />
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ onClickExploreDrinks }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

export default Explore;
