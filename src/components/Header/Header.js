import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink() {
    return (
      <div>
        <Link onClick={this.handleLogoutClick} to='/'>Logout</Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div>
        <Link className={this.renderActivePage('/login')}
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  renderActivePage(path) {
    return path === this.props.pathName ? "active" : "";
  }

  render() {
    return <>
      <header className='App__header'>
        <h1>IndieVG</h1>
        <nav className="topnav">
          <Link className={this.renderActivePage('/homepage')} to='/homepage'> Home</Link>
          <Link className={this.renderActivePage('/search')} to='/search'>Search</Link>
          <Link className={this.renderActivePage(`/wishlist`)} to={`/wishlist`}>Wishlist</Link>
          <Link className={this.renderActivePage('/contribute')} to='/contribute'>Contribute</Link>
          {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
        </nav>
      </header>
    </>
  }
}
