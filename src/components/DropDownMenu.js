import React from 'react';
import PropTypes from 'prop-types';

function DropDownMenu(props) {
  const { options, onOptionChanged } = props;

  return (
    <select
      data-testid="explore-by-nationality-dropdown"
      onChange={ onOptionChanged }
    >
      {options.map((nat, index) => (
        <option
          key={ `nationality-option-${index}` }
          data-testid={ `${nat}-option` }
        >
          {nat}
        </option>
      ))}
    </select>
  );
}

DropDownMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionChanged: PropTypes.func.isRequired,
};

export default DropDownMenu;
