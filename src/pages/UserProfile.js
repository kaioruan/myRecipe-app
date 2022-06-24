import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { loadUser } from '../services/StorageManager';

function UserProfile() {
  const history = useHistory();
  const storedUser = loadUser();

  const onClickDone = () => {
    history.push('/done-recipes');
  };

  const onClickFavorite = () => {
    history.push('/favorite-recipes');
  };

  const onClickLogin = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <p data-testid="profile-email">{`Usuário: ${storedUser.email}`}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ onClickDone }
      >
        Done Recipes
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ onClickFavorite }
      >
        Favorite Recipes
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ onClickLogin }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default UserProfile;
