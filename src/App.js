import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Header from './components/Header';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
