import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header />
      <button
        data-testid="explore-foods"
        type="button"
      >
        Explore Foods
      </button>
      <br />
      <button
        data-testid="explore-drinks"
        type="button"
      >
        Explore Drinks
      </button>

      <Footer />
    </div>
  );
}

export default Explore;
