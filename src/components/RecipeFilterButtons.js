import React from 'react';
import PropTypes from 'prop-types';

function RecipeFilterButtons(props) {
  const { categories, onButtonClicked } = props;
  return (
    <section className="flex space-x-1.5 text-sm">
      {categories.map((cat, index) => (
        <button
          data-testid={ `${cat}-category-filter` }
          key={ index }
          type="button"
          onClick={ onButtonClicked }
          className="bg-gray-300 p-1
          rounded-md
          my-4"
        >
          { cat }
        </button>))}
    </section>
  );
}

RecipeFilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onButtonClicked: PropTypes.func.isRequired,
};

export default RecipeFilterButtons;
