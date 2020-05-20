import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import GamesHomePage from '../../routes/GamesHomePage/GamesHomePage'
import GamePage from '../../routes/GamePage/GamePage'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
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
            {/* <PrivateRoute
              path={'/wishlist/:userId'}
              component={WishlistPage}
            /> */}
            {/* <PrivateRoute
              path={'/contribute'}
              component={ContributePage}
            /> */}
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
        </main>
      </div>
    )
  }
}

export default App
