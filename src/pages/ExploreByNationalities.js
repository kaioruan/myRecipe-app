import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DropDownMenu from '../components/DropDownMenu';
import MainRecipeList from '../components/MainRecipeList';
// import {
//   fetchListAllNationalities, fetchAllMeals,
// } from '../services/MealsAPI';
import {
  MEALS_TYPE,
  fetchMealsByArea, fetchAllMealsAreas, fetchAllRecipes,
} from '../services/RecipesAPI';
import { trimArray } from '../services/Helpers';
import RecipesContext from '../context/RecipesContext';

const MAX_CARDS = 12;

function ExploreByNationalities() {
  const [selectedArea, setSelectedArea] = useState('All');
  const [areas, setAreas] = useState([]);
  const { setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchAPI = async () => {
      const areasData = await fetchAllMealsAreas();
      const recipesData = selectedArea === 'All'
        ? await fetchAllRecipes(MEALS_TYPE)
        : await fetchMealsByArea(selectedArea);
      setAreas(['All', ...areasData.meals.map((area) => area.strArea)]);
      setRecipes(trimArray(recipesData, MAX_CARDS, 'foods'));
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

export default ExploreByNationalities;
