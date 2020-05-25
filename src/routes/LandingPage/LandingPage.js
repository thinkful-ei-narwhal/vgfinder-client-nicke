import './LandingPage.css'
import { Link } from 'react-router-dom'
import React, { Component } from 'react';

export default class LandingPage extends Component {
  renderLogoutLink() {
    return (
      <div>
        <Link onClick={this.handleLogoutClick} to='/'>Logout</Link>
      </div>
    )
  }

  render() {
    return (
      <>
        <h1>Hello, and welcome to VGFinder!</h1>

        <p>In an industry dominated by the triple A video games, it's easy to miss out on titles that do not have a multi-million dollar marketing budget.
          That's why I made this site, to help small video game studios and solo developers get the exposure that their games deserve.
        </p>

        <p>This site recommends new indie game titles and lets users make a wishlist of their favorite games.
           If your are an indie game enthusiast yourself and know of a game that isn't in the database, feel free to contribute and help other gamers finder their new favorite game.
        </p>

        <p>You can proceed to the site and explore it as a guest, or you can login with my demo account.</p>
        <p>Username: dunder</p>
        <p>Password: password</p>

        <Link onClick={this.handleLogoutClick} to='/login'> <button>Log in</button></Link>
        <Link onClick={this.handleLogoutClick} to='/homepage'><button>Continue as guest</button></Link>
      </>
    )
  }

}