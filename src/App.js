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
          <Route path="/foods" component={ MainPage } />
          <Route path="/drinks" component={ MainPage } />
          <Route path="/foods/:foodId" component={ RecipeDetails } />
          <Route path="/drinks/:drinkId" component={ RecipeDetails } />
          <Route path="/foods/:foodId/in-progress" component={ RecipeProgress } />
          <Route path="/drinks/:drinkId/in-progress" component={ RecipeProgress } />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/foods" component={ ExploreCategories } />
          <Route path="/explore/drinks" component={ ExploreCategories } />
          <Route path="/explore/foods/ingredients" component={ ExploreByIngredients } />
          <Route path="/explore/drinks/ingredients" component={ ExploreByIngredients } />
          <Route
            path="/explore/foods/nationalities"
            component={ ExploreByNationalities }
          />
          <Route path="/profile" component={ UserProfile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
