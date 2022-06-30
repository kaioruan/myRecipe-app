import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainRecipeList from '../components/MainRecipeList';

function ExploreByNationalities() {
  return (
    <div data-testid="nationalities-page">
      <Header />
      <MainRecipeList />
      <Footer />
    </div>
  );
}

export default ExploreByNationalities;
