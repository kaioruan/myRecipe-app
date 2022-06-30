import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainRecipeList from '../components/MainRecipeList';

function ExploreByNationalities() {
  return (
    <div data-testid="nationalities-page">
      <Header />
      <main className="flex flex-col justify-center items-center">
        <MainRecipeList />
      </main>
      <Footer />
    </div>
  );
}

export default ExploreByNationalities;

// main "
