import React from 'react';
import PropTypes from 'prop-types';

function RecipeFilterButtons(props) {
  const { categories, onButtonClicked } = props;
  return (
    <nav>
      {categories.map((cat, index) => (
        <button
          data-testid={ `${cat}-category-filter` }
          key={ index }
          type="button"
          onClick={ onButtonClicked }
        >
          { cat }

        </button>))}
    </nav>
  );
}

RecipeFilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onButtonClicked: PropTypes.func.isRequired,
};

export default RecipeFilterButtons;
