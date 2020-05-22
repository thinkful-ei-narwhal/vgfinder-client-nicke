import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import jwtDecode from 'jwt-decode';
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
        <Link
          className={this.renderActivePage('/register')} to='/register'>
          Register
        </Link>
      </div>
    )
  }

  renderActivePage(path) {
    return path === this.props.pathName ? "active" : "";
  }

  render() {
    const jwtToken = TokenService.getAuthToken();
    let user_id;
    if (jwtToken) {
      //need to make this an If
      const decodedToken = jwtDecode(jwtToken);
      user_id = decodedToken.user_id;
    }


    return <>
      {/* ToDo: 
        Stylize 
        Move login/register to right side
     */}
      <header className='App__header'>
        <h1>IndieVG</h1>
        <nav className="topnav">
          <Link className={this.renderActivePage('/')} to='/'> Home</Link>
          {/* {<Link className={this.renderActivePage('/search')} to='/search'>Search</Link>} */}
          <Link className={this.renderActivePage(`/wishlist/${user_id}`)} to={`/wishlist/${user_id}`}>Wishlist</Link>
          <Link className={this.renderActivePage('/contribute')} to='/contribute'>Contribute</Link>
          {/* {<Link className={this.renderActivePage('/preferences')} to='/preferences'>Preferences</Link>} */}
          {/* {<Link className={this.renderActivePage('/admin')} to='/admin'>(Admin))</Link>} */}
          {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
        </nav>
      </header>
    </>
  }
}
