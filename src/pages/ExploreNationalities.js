import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DropDownMenu from '../components/DropDownMenu';
import MainRecipeList from '../components/MainRecipeList';
import { fetchAllNationalities, fetchMealsByArea } from '../services/MealsAPI';
import { trimArray } from '../services/Helpers';
import RecipesContext from '../context/RecipesContext';

const MAX_CARDS = 12;

const getRecipes = async (area) => {
  const data = await fetchMealsByArea(area);
  return trimArray(data, MAX_CARDS, 'foods');
};

function ExploreNationalities() {
  const [selectedArea, setSelectedArea] = useState('American');
  const [areas, setAreas] = useState([]);
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchAPI = async () => {
      const areasData = await fetchAllNationalities();
      const recipes = await getRecipes(selectedArea);

      setAreas(areasData.meals.map((area) => area.strArea));
      setRecipes(recipes);
    };

    fetchAPI();
  }, [selectedArea, setRecipes]);

  const onOptionChanged = async ({ target }) => {
    setSelectedArea(target.value);
  };

  return (
    <div>
      <Header />
      <DropDownMenu
        options={ areas }
        onOptionChanged={ onOptionChanged }
      />
      <MainRecipeList />
      <Footer />
    </div>
  );
}

export default ExploreNationalities;
