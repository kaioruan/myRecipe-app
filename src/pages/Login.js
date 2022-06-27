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

  // flex items-center justify-center h-screen

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div
        className="
        w-0 h-0
        border-t-[80px] border-t-transparent
        border-l-[170px] border-l-red-600
        border-b-[80px] border-b-transparent

        lg:border-t-[80px] border-t-transparent
        lg:border-l-[200px] border-l-red-600
        lg:border-b-[80px] border-b-transparent"
      >
        <p
          className="relative
        -left-[10.5rem]
        -top-[1.7rem] text-white
        md:-left-[12rem]
        md:text-[1.6rem]
        md:-top-[2rem]
        font-bold
        italic
        font-sans
        text-[1.3rem]"
        >
          myRecipe-app
        </p>
      </div>
      <div
        className="flex items-center
      justify-center border-2 w-[10rem] md:w-[35rem] rounded-lg border-none"
      >
        <form className="flex flex-col px-8 mt-10">
          <label htmlFor="email-input">
            <input
              className="mt-2 pl-5 py-4 px-20 text-black bg-stone-100 rounded-lg "
              data-testid="email-input"
              type="email"
              name="email"
              id="email-input"
              value={ input.email }
              onChange={ handleInputChange }
              placeholder="E-mail"
            />
          </label>

          <label htmlFor="password-input">
            <input
              className="mt-2 pl-5 py-4 px-20 bg-stone-100 rounded-lg"
              data-testid="password-input"
              type="password"
              name="password"
              id="password-input"
              value={ input.password }
              onChange={ handleInputChange }
              placeholder="Password"
            />
          </label>

          <button
            className="text-white bg-red-600 mt-8 mb-10 pl-2 py-2 px-4
            rounded-lg disabled:opacity-75"
            data-testid="login-submit-btn"
            type="button"
            disabled={ !isLoginValid() }
            onClick={ onLoginSubmit }
          >
            Enter
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
