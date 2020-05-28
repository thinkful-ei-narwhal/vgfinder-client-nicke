import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GameCarousel.css";

export default class GamesCarousel extends Component {
  state = {
    currentSlide: 0,
    loaded: true,
  };

  componentDidMount() {
    if (!this.props.reel) {
      throw new Error("Supply an image reel");
    }
    this.setState({
      reel: this.props.reel,
      currentSlide: 0,
      loaded: true,
    });
  }

  plusSlide() {
    this.setState({ currentSlide: this.state.currentSlide + 1 });
    if (!this.props.isSingleGame)
      this.props.setActiveGame(
        this.props.reel.find(
          (reelObj, index) => this.state.currentSlide + 1 === index
        ).gameId
      );
  }

  minusSlide() {
    this.setState({ currentSlide: this.state.currentSlide - 1 });
    if (!this.props.isSingleGame)
      this.props.setActiveGame(
        this.props.reel.find(
          (reelObj, index) => this.state.currentSlide - 1 === index
        ).gameId
      );
  }

  mapImages() {
    return this.props.reel.map((reelObj, index) => {
      const slide =
        this.state.currentSlide === index ? "showSlide" : "mySlides";
      return this.props.isSingleGame ? (
        <div
          key={index}
          style={{
            backgroundColor: "black",
            backgroundImage: `url(${reelObj.imgUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={`${slide} fade container`}
        >
          <div className="numbertext ">
            {index + 1} / {this.props.reel.length}
          </div>
        </div>
      ) : (
        <Link key={index} to={`/games/${reelObj.gameId}`}>
          <div
            style={{
              backgroundColor: "black",
              backgroundImage: `url(${reelObj.imgUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className={`${slide} fade container`}
          >
            <div className="numbertext">
              {index + 1} / {this.props.reel.length}
            </div>
          </div>
        </Link>
      );
    });
  }

  mapDots() {
    return this.props.reel.map((reelObj, index) => {
      return this.props.isSingleGame ? (
        <span
          key={index}
          className="dot"
          onClick={() => this.setState({ currentSlide: index })}
        ></span>
      ) : (
        <span
          key={index}
          className="dot"
          onClick={() => {
            this.setState({ currentSlide: index });
            this.props.setActiveGame(reelObj.gameId);
          }}
        ></span>
      );
    });
  }

  renderOnLoad() {
    return (
      <>
        <div className="slideshow-container">
          {this.mapImages()}
          {this.state.currentSlide === 0 ? null : (
            <a
              href="#0"
              className="prev game-carousel-button"
              onClick={() => this.minusSlide()}
            >
              &#10094;
            </a>
          )}
          {this.state.currentSlide === this.props.reel.length - 1 ? null : (
            <a
              href="#0"
              className="next game-carousel-button"
              onClick={() => this.plusSlide()}
            >
              &#10095;
            </a>
          )}
        </div>
        <br />
        <div className="style-align">{this.mapDots()}</div>
      </>
    );
  }

  render() {
    return <>{this.state.loaded ? this.renderOnLoad() : null}</>;
  }
}
