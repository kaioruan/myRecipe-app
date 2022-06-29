import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DefaultRecipeCard(props) {
  const history = useHistory();
  const { pathname } = history.location;
  const {
    cardTestId,
    titleTestId,
    recipeId,
    index,
    name,
    thumb,
  } = props;

  const destination = pathname.includes('food')
    ? `/foods/${recipeId}`
    : `/drinks/${recipeId}`;

  return (
    <main
      className="flex flex-col mt-3
    items-center
    justify-center"
    >
      <Link
        className="recipe-card"
        data-testid={ cardTestId }
        to={ destination }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt="card thumb"
          className="w-[18rem]
          shadow-2xl
          rounded-lg"
        />
        <div
          className="flex flex-col items-center
            justify-center rounded-lg border-1 border-black shadow-2xl
            w-[18rem]
            my-3
            p-1
            bg-white"
        >
          <h3
            data-testid={ titleTestId }
            className="font-bold
            text-center
            mt- p-1"
          >
            { name }
          </h3>
        </div>
      </Link>
    </main>
  );
}

DefaultRecipeCard.propTypes = {
  cardTestId: PropTypes.string.isRequired,
  titleTestId: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DefaultRecipeCard;
