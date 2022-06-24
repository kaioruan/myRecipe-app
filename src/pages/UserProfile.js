import React from 'react';
import Footer from '../components/Footer';
import { loadUser } from '../services/StorageManager';

function UserProfile() {
  const storedUser = loadUser();
  console.log(storedUser.email);

  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{`Usuário: ${storedUser.email}`}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default UserProfile;
