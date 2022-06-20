import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
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
      >
        <img src={ SearchIcon } alt="SearchIcon" />
      </button>
    </header>
  );
}

export default Header;
