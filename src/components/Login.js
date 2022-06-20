import React from 'react';

function Login() {
  const isLoginValid = () => {
    // Regex tirado do link https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 6;
    const { email, password } = this.state;
    return EMAIL_VALIDATION_REGEX.test(email) && password.length >= PW_MINIMUM_LENGTH;
  };

  const registerUser = () => {

  };

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ this.handleInputChange }
      />

      <input
        type="password"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ this.handleInputChange }
      />

      <button
        type="button"
        disabled={ isButtonDisabled }
        onClick={ this.onLoggedIn }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
