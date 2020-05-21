import React, { Component } from 'react';
import './GameCarousel.css'
import { Link } from 'react-router-dom'

export default class GamesCarousel extends Component {

  state = {
    hero_url: "",
    hero_id: 0,
    reel: []
  }

  //only redirects if not already on a GamePage
  setCarouselHero = (hero_url, hero_id) => {
    this.setState({ hero_url, hero_id })
  }

  componentDidMount() {
    this.setState({
      hero_url: this.props.reel[0].imgUrl,
      hero_id: this.props.reel[0].gameId,
      reel: this.props.reel
    });
  }

  renderHero() {
    //Adds dynamic link if on the games page
    return this.props.isSingleGame ?
      <img src={this.state.hero_url} width="500" alt="Logo" />
      : <Link to={`/games/${this.state.hero_id}`}><img src={this.state.hero_url} width="500" alt="Logo" /></Link>;
  }

  renderReel() {
    return this.props.isSingleGame ?
      this.state.reel.map((reelObj, index) => <img key={index} onClick={() => this.setCarouselHero(reelObj.imgUrl, reelObj.gameId)} src={reelObj.imgUrl} width="100" alt="Logo" />)
      : this.state.reel.map((reelObj, index) => <img key={index} onClick={() => {
        this.setCarouselHero(reelObj.imgUrl, reelObj.gameId)
        this.props.setActiveGame(reelObj.gameId)
      }} src={reelObj.imgUrl} width="100" alt="Logo" />)
  }

  render() {
    return (
      <>
        <div>
          {this.renderHero()}
        </div>
        <div>
          {this.renderReel()}
        </div>
      </>
    )
  }
}