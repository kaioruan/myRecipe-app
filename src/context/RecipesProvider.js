import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [renderFavorites, setRenderFavorites] = useState('All');
  const [previousPath, setPreviousPath] = useState('');

  const contextType = { recipes,
    setRecipes,
    setRenderFavorites,
    renderFavorites,
    previousPath,
    setPreviousPath };

  return (
    <RecipesContext.Provider value={ contextType }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
