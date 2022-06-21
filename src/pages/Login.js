import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  saveMealsToken, saveCocktailsToken, saveUser, loadUser,
} from '../services/StorageManager';

function Login({ history }) {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const isLoginValid = () => {
    // Regex tirado do link https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 7;
    const { email, password } = input;
    return EMAIL_VALIDATION_REGEX.test(email) && password.length >= PW_MINIMUM_LENGTH;
  };

  const onLoginSubmit = () => {
    saveMealsToken(1);
    saveCocktailsToken(1);
    saveUser(input.email);
    history.push('/foods');
  };

  return (
    <form>
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ input.email }
          onChange={ handleInputChange }
        />
      </div>

      <div>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ input.password }
          onChange={ handleInputChange }
        />
      </div>
      <div>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !isLoginValid() }
          onClick={ onLoginSubmit }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
