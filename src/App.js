import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import RecipePage from './pages/RecipePage';
import Explore from './pages/Explore';
import ExploreCategories from './pages/ExploreCategories';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByNationalities from './pages/ExploreByNationalities';
import UserProfile from './pages/UserProfile';
import UserRecipes from './pages/UserRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ MainPage } />
        <Route exact path="/drinks" component={ MainPage } />
        <Route exact path="/foods/:foodId" component={ RecipePage } />
        <Route exact path="/drinks/:drinkId" component={ RecipePage } />
        <Route exact path="/foods/:foodId/in-progress" component={ RecipePage } />
        <Route exact path="/drinks/:drinkId/in-progress" component={ RecipePage } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreCategories } />
        <Route exact path="/explore/drinks" component={ ExploreCategories } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreByIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreByNationalities }
        />
        <Route exact path="/profile" component={ UserProfile } />
        <Route exact path="/done-recipes" component={ UserRecipes } />
        <Route exact path="/favorite-recipes" component={ UserRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
