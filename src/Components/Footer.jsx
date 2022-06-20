import { Link } from 'react-router-dom';
import styles from './CSS/Footer.module.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className={styles.footerContainer} data-testid="footer">
      <section data-testid="drinks-bottom-btn">
        <Link to="/drinks">
          <img src={drinkIcon} alt="icon of a drink"/>
        </Link>
      </section>
      <section data-testid="explore-bottom-btn">
        <Link to="/explore">
          <img src={exploreIcon} alt="icon of a compass"/>
        </Link>
      </section>
      <section data-testid="food-bottom-btn">
        <Link to="/foods">
          <img src={mealIcon} alt="icon of a knife and fork"/>
        </Link>
      </section>
    </footer>
  )
}

export default Footer;
