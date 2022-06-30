import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  saveMealsToken, saveCocktailsToken, saveUser,
} from '../services/StorageManager';

function Login() {
  const history = useHistory();
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
          placeholder="E-mail"
          data-testid="email-input"
          type="email"
          name="email"
          value={ input.email }
          onChange={ handleInputChange }
        />
      </div>

      <div>
        <input
          placeholder="Password"
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

export default Login;
