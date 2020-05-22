import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import GamesHomePage from '../../routes/GamesHomePage/GamesHomePage'
import GamePage from '../../routes/GamePage/GamePage'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import LoginPage from '../../routes/LoginPage/LoginPage'
import WishlistPage from '../../routes/WishlistPage/WishlistPage'
import ContributePage from '../../routes/ContributePage/ContributePage'
import UserIdContext from '../../contexts/UserIdContext';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import Footer from '../../components/Footer/Footer'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'
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
    const jwtToken = TokenService.getAuthToken();
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      this.context.setUserId(decoded.user_id);
    }
    this.setState({ loaded: true })
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
              component={GamesHomePage}
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
            {/* <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            /> */}
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
