import React, { useState } from 'react';
import { Heart } from 'phosphor-react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { recipeIsFavorite, saveFavoriteRecipe, removeFavoriteRecipe,
} from '../services/StorageManager';
import shareIcon from '../images/shareIcon.svg';

const getHeartState = (id) => ({
  color: recipeIsFavorite(id) ? 'red' : 'black',
  weight: recipeIsFavorite(id) ? 'fill' : 'regular',
});

function DoneRecipeCard({ index, doneRecipe }) {
  const params = useParams();
  const recipeId = params.foodId || params.drinkId;
  const [copied, setCopied] = useState(false);
  const [heartColor, setHeartColor] = useState(getHeartState(recipeId).color);
  const [heartWeight, setHeartWeight] = useState(getHeartState(recipeId).weight);

  const isFood = doneRecipe.type.toLowerCase() === 'food';
  console.log(doneRecipe);
  const tagsArray = Array.isArray(doneRecipe.tags)
    ? doneRecipe.tags : doneRecipe.tags.split(',');

  const topText = isFood
    ? `${doneRecipe.nationality} - ${doneRecipe.category}`
    : doneRecipe.alcoholicOrNot;

  const handleShareButton = (type, id) => {
    setCopied(true);
    const URL = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(URL);
  };

  const onClickFavorite = () => {
    if (recipeIsFavorite(recipeId)) {
      removeFavoriteRecipe(recipeId);
      setHeartColor('black');
      setHeartWeight('regular');
    } else {
      saveFavoriteRecipe(doneRecipe);
      setHeartColor('red');
      setHeartWeight('fill');
    }
  };

  console.log(tagsArray);

  return (
    <section className="my-4">
      <Link
        to={ isFood
          ? `/foods/${doneRecipe.id}`
          : `/drinks/${doneRecipe.id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ doneRecipe.image }
          alt="card thumb"
          className="w-[18rem]
          shadow-2xl
          rounded-lg"
        />
      </Link>

      <div className="flex flex-col items-center my-2">
        <Link
          to={ isFood
            ? `/foods/${doneRecipe.id}`
            : `/drinks/${doneRecipe.id}` }
        >
          <p
            data-testid={ `${index}-horizontal-name` }
            className="font-bold text-red-700"
          >
            {doneRecipe.name}
          </p>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { topText }
        </p>
        <div className="flex justify-center space-x-2">
          {tagsArray.map((tag) => (
            <div
              key={ `tag${tag}${index}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              className="bg-white p-1 rounded-lg"
            >
              { tag }
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-40 my-2">
          <button
            onClick={
              () => handleShareButton(doneRecipe.type.toLowerCase(), doneRecipe.id)
            }
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="done recipe thumb"
            />
          </button>
          <button
            type="button"
            onClick={ () => onClickFavorite() }
          >
            <Heart size={ 31 } color={ heartColor } weight={ heartWeight } />
          </button>
        </div>

        {copied && <p className="text-center italic mb-2">Link copied!</p>}

        <p data-testid={ `${index}-horizontal-done-date` }>
          {doneRecipe.doneDate}
        </p>
      </div>
    </section>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  doneRecipe: PropTypes.shape.isRequired,
};

export default DoneRecipeCard;
