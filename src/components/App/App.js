import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GamesHomePage from '../../routes/GamesHomePage/GamesHomePage';
import GamePage from '../../routes/GamePage/GamePage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
import WishlistPage from '../../routes/WishlistPage/WishlistPage';
import ContributePage from '../../routes/ContributePage/ContributePage';
import UserIdContext from '../../contexts/UserIdContext';
import LandingPage from '../../routes/LandingPage/LandingPage';
import Footer from '../../components/Footer/Footer';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service';
import WishlistApiService from '../../services/wishlist-api-service';
import SearchPage from '../../routes/SearchPage/SearchPage';
import './App.css'

class App extends Component {
  static contextType = UserIdContext;

  state = {
    loaded: false,
    hasError: false
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    //if the authentication token is provided, set the state of the user wishlist
    const jwtToken = TokenService.getAuthToken();
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      const userId = decoded.user_id;

      let userWishlist = [];
      let userGamesList = [];

      //get all wishlists for user
      const wishlistPromise1 = WishlistApiService.getAllWishlists()
        .then(res => {
          userWishlist = res.filter(wishlist => wishlist.user_id === userId);
        })
        .catch(this.context.setError)

      //get all wishlisted game data
      const wishlistPromise2 = WishlistApiService.getwishlistedGames(userId)
        .then(res => {
          userGamesList = res;
        })
        .catch(this.context.setError)

      Promise.all([wishlistPromise1, wishlistPromise2]).then(() => {
        this.context.setUserIdWishlistAndGames(userId, userWishlist, userGamesList);
        this.setState({ loaded: true })
      });
    }
    else {
      this.setState({ loaded: true })
    }
  }

  renderApp() {
    return (
      <div className='App'>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              exact
              path={'/homepage'}
              component={GamesHomePage}
            />
            <Route
              exact
              path={'/search'}
              component={SearchPage}
            />
            <PrivateRoute
              path={'/games/:gameId'}
              component={GamePage}
            />
            <PrivateRoute
              path={'/wishlist'}
              component={WishlistPage}
            />
            <PrivateRoute
              path={'/contribute'}
              component={ContributePage}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
          <Footer />
        </main>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.state.loaded ? this.renderApp() : null}
      </>
    )
  }
}

export default App
