import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CSS/Footer.module.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className={ styles.footerContainer } data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="icon of a drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="icon of a compass"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="icon of a knife and fork"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
