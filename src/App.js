import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Header from './components/Header';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/foods" component={ Header } />
          <Route exact path="/drinks" component={ Header } />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
