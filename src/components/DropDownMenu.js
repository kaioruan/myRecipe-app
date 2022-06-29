import React, { useState, useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import {
  MEALS_TYPE,
  fetchMealsByArea, fetchAllMealsAreas, fetchAllRecipes,
} from '../services/RecipesAPI';
import { trimArray } from '../services/Helpers';

const MAX_CARDS = 12;

function DropDownMenu() {
  const [selectedArea, setSelectedArea] = useState('All');
  const [options, setOptions] = useState([]);
  const { setRecipes } = useContext(RecipesContext);

  const onOptionChanged = async ({ target }) => {
    setSelectedArea(target.value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const areasData = await fetchAllMealsAreas();
      const recipesData = selectedArea === 'All'
        ? await fetchAllRecipes(MEALS_TYPE)
        : await fetchMealsByArea(selectedArea);
      setOptions(['All', ...areasData.meals.map((area) => area.strArea)]);
      setRecipes(trimArray(recipesData, MAX_CARDS, 'foods'));
    };

    fetchAPI();
  }, [selectedArea, setRecipes]);

  return (
    <select
      data-testid="explore-by-nationality-dropdown"
      onChange={ onOptionChanged }
      className="bg-gray-400 p-2 my-3 rounded-md"
    >
      {options.map((opt, index) => (
        <option
          key={ `option-${index}` }
          data-testid={ `${opt}-option` }
        >
          {opt}
        </option>
      ))}
    </select>
  );
}

export default DropDownMenu;
