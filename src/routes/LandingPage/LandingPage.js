import "./LandingPage.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Section, Button } from "./../../components/Utils/Utils";
import YouTube from "react-youtube";

export default class LandingPage extends Component {
  render() {
    const opts = {
      height: "500",
      width: "90%",
      playerVars: {
        autoplay: 1,
        mute: 1,
      },
    };

    return (
      <>
        <header>
          <div className="logo"></div>
          <h1>Welcome!</h1>
        </header>
        <div className="youtube">
          <YouTube videoId="GVpSeSF_Cug" opts={opts} onReady={this._onReady} />
        </div>

        <Section className="landing-page-text">
          <h1>What is VGFinder</h1>
          <p>
            In an industry dominated by the triple A video games, it's easy to
            miss out on titles that don't have a multi-million dollar marketing
            budget. That's why I made this site, to help small video game
            studios and solo developers get the exposure that their games
            deserve.
          </p>

          <p>
            This site recommends new indie game titles and lets users make a
            wishlist of their favorite games. If you are an indie game
            enthusiast yourself and know of a game that isn't in the database,
            feel free to contribute and help other gamers finder their new
            favorite game.
          </p>

          <p>
            You can proceed to the site and explore it as a guest, or you can
            login with my demo account.
          </p>
          <p>Username: dunder</p>
          <p>Password: password</p>

          <div className="landing-buttons-container">
            <Link onClick={this.handleLogoutClick} to="/login">
              {" "}
              <Button className="landing-button">Log in</Button>
            </Link>
            <Link onClick={this.handleLogoutClick} to="/homepage">
              <Button className="landing-button">Continue as guest</Button>
            </Link>
          </div>
        </Section>
      </>
    );
  }
}
