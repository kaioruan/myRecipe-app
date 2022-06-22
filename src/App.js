import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import RecipeDetails from './pages/RecipeDetails';
import RecipeProgress from './pages/RecipeProgress';
import Explore from './pages/Explore';
import ExploreCategories from './pages/ExploreCategories';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByNationalities from './pages/ExploreByNationalities';
import UserProfile from './pages/UserProfile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ MainPage } />
          <Route exact path="/drinks" component={ MainPage } />
          <Route exact path="/foods/:foodId" component={ RecipeDetails } />
          <Route exact path="/drinks/:drinkId" component={ RecipeDetails } />
          <Route exact path="/foods/:foodId/in-progress" component={ RecipeProgress } />
          <Route exact path="/drinks/:drinkId/in-progress" component={ RecipeProgress } />
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
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
