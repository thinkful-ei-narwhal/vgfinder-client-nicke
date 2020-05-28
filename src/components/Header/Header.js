import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <div>
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div>
        <Link className={this.renderActivePage("/login")} to="/login">
          Log in
        </Link>
      </div>
    );
  }

  renderActivePage(path) {
    if (path === this.props.pathName) {
      this.activeLink = path;
      return "active";
    } else {
      return "";
    }
  }

  renderHamburgerPath() {
    let path = this.props.pathName;
    if (!path) {
      return "Game";
    }
    let pathTrimmed = path.split("/")[1];
    pathTrimmed = pathTrimmed.charAt(0).toUpperCase() + pathTrimmed.slice(1);
    if (pathTrimmed === "Homepage") {
      pathTrimmed = "Home";
    }
    return pathTrimmed;
  }

  classToggle() {
    const navs = document.querySelectorAll(".Navbar__Items");
    navs.forEach((nav) => nav.classList.toggle("Navbar__ToggleShow"));
  }

  render() {
    return (
      <>
        <div className="logo"></div>
        <header className="App__header Navbar">
          <div className="Navbar__Link Navbar__Link-brand">
            {this.renderHamburgerPath()}
          </div>
          <div
            className="Navbar__Link Navbar__Link-toggle"
            onClick={this.classToggle}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <nav className="topnav Navbar__Items">
            <div className="Navbar__Link">
              <Link
                className={this.renderActivePage("/homepage")}
                to="/homepage"
              >
                Home
              </Link>
            </div>
            <div className="Navbar__Link">
              <Link className={this.renderActivePage("/search")} to="/search">
                Search
              </Link>
            </div>
            <div className="Navbar__Link">
              <Link
                className={this.renderActivePage(`/wishlist`)}
                to={`/wishlist`}
              >
                Wishlist
              </Link>
            </div>
            <div className="Navbar__Link">
              <Link
                className={this.renderActivePage("/contribute")}
                to="/contribute"
              >
                Contribute
              </Link>
            </div>

            <nav className="Navbar__Items Navbar__Items--right">
              <div className="Navbar__Link">
                {TokenService.hasAuthToken()
                  ? this.renderLogoutLink()
                  : this.renderLoginLink()}
              </div>
            </nav>
          </nav>
        </header>
      </>
    );
  }
}
