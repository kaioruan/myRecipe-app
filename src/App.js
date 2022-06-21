import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';

import Login from './pages/Login';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Header />
          <Route exact path="/" component={ Login } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
  );
}

export default App;
