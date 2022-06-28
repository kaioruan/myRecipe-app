import React from 'react';
import PropTypes from 'prop-types';

function RecipeFilterButtons(props) {
  const { categories, onButtonClicked, path } = props;
  console.log(path);
  return (
    <section
      className="
      flex flex-wrap justify-center items-center
      space-x-1.5 text-sm  my-2"
    >
      {categories.map((cat, index) => (
        <button
          data-testid={ `${cat}-category-filter` }
          key={ index }
          type="button"
          onClick={ onButtonClicked }
          className="bg-white p-1
          rounded-md
          my-2"
        >
          { cat }
        </button>))}
    </section>
  );
}

RecipeFilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onButtonClicked: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default RecipeFilterButtons;
