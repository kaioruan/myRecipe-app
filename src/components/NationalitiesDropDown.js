import React from 'react';
import PropTypes from 'prop-types';

function NationalitiesDropDown(props) {
  const { nationalities, onOptionChanged } = props;

  return (
    <select data-testid="explore-by-nationality-dropdown">
      {nationalities.map((nat, index) => (
        <option
          key={ `nationality-option-${index}` }
          data-testid={ `${nat}-option` }
          onChange={ onOptionChanged }
          name={ nat }
        >
          {nat}
        </option>
      ))}
    </select>
  );
}

NationalitiesDropDown.propTypes = {
  nationalities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionChanged: PropTypes.func.isRequired,
};

export default NationalitiesDropDown;
