import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
  const [iconSearch, setIconSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleIconSearch = () => {
    if (iconSearch) {
      setIconSearch(false);
    } else {
      setIconSearch(true);
    }
  };
  const handleChange = ({ target }) => {
    setSearchInput(target.value);
  };
  return (
    <header>
      <nav>
        <Link
          to="/profile"
        >
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="ProfileIcon"
          />
        </Link>
      </nav>
      <button
        data-testid="page-title"
        type="button"
      >
        Page
      </button>
      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ handleIconSearch }
      >
        <img src={ SearchIcon } alt="SearchIcon" />
      </button>
      { iconSearch && (
        <input
          type="text"
          data-testid="search-input"
          name="searchInput"
          value={ searchInput }
          onChange={ handleChange }
        />
      )}
    </header>
  );
}

export default Header;
