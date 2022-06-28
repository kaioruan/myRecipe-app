import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';

function Explore() {
  const history = useHistory();

  const onClickExploreFoods = () => {
    history.push('/explore/foods');
  };

  const onClickExploreDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <main>
      <HeaderSimple />
      <section className="flex space-x-[3rem] ml-[1.5rem] my-[2rem]">
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ onClickExploreFoods }
          className="
          my-4
          px-4 py-2
          bg-white font-medium
          rounded-md"
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ onClickExploreDrinks }
          className="
          my-4
          bg-white px-4
          rounded-md
          "
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default Explore;
