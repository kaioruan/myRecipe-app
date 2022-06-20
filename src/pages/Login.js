import React, { useState } from 'react';

function Login() {
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
    const PW_MINIMUM_LENGTH = 6;
    const { email, password } = input;
    return EMAIL_VALIDATION_REGEX.test(email) && password.length >= PW_MINIMUM_LENGTH;
  };

  const onUserLogin = () => {
    console.log('login');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        name="email"
        value={ input.email }
        onChange={ handleInputChange }
      />

      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ input.password }
        onChange={ handleInputChange }
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !isLoginValid() }
        onClick={ onUserLogin }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
