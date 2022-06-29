import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderSimple from '../components/HeaderSimple';
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
      <HeaderSimple />
      <section className="flex flex-col justified-center items-center mt-3 mb-10">
        <p
          data-testid="profile-email"
          className="mt-3"
        >
          Usuário:
          <span className="ml-2 font-bold">{`${storedUser.email}`}</span>

        </p>
        <div className="mt-3 flex flex-col justified-center items-center">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ onClickDone }
            className="bg-white w-[10rem] my-3 p-1 rounded-lg"
          >
            Done Recipes
          </button>
          <br />
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ onClickFavorite }
            className="bg-white w-[10rem] my-3 p-1 rounded-lg"
          >
            Favorite Recipes
          </button>
          <br />
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ onClickLogin }
            className="bg-white w-[10rem] my-3 p-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserProfile;
