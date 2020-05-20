import React, { Component } from 'react';
import './GameCarousel.css'
import { Link } from 'react-router-dom'

export default class GamesCarousel extends Component {

  state = {
    hero_url: "",
    hero_id: 0,
    reel: []
  }

  setCarouselHero = (hero_url, hero_id) => {
    this.setState({ hero_url, hero_id })
  }

  componentDidMount() {
    let reel = [];

    //main page logic with multiple games
    if (this.props.gamesList.length > 1) {
      const games = this.props.gamesList.map(game => game);
      reel = games.map(game => { return { imgUrl: game.image_url_box_art, gameId: game.id } });
      this.setState({
        hero_url: games[0].image_url_box_art,
        hero_id: games[0].id,
        reel: reel
      });
    }
    //single page logic
    else {
      const game = this.props.gamesList[0];

      if (game) {
        let hero_url = '';
        for (const [key, value] of Object.entries(game)) {
          if (key.includes("image") && value) {
            reel.push({ imgUrl: value, gameId: game.id });
          }
          if (key === "image_url_box_art") {
            hero_url = value;
          }
        }
        console.log('ASDKAGSDKAJSHGD ', this.state);
        this.setState({
          hero_url,
          hero_id: game.id,
          reel
        });
      }
    }
  }

  renderHero() {
    return this.props.gamesList.length > 1 ?
      <Link to={`/games/${this.state.hero_id}`}><img src={this.state.hero_url} width="500" alt="Logo" /></Link>
      : <img src={this.state.hero_url} width="500" alt="Logo" />
  }

  renderReel() {
    return this.state.reel.map((reelObj, index) => <img key={index} onClick={() => this.setCarouselHero(reelObj.imgUrl, reelObj.gameId)} src={reelObj.imgUrl} width="100" alt="Logo" />);
  }


  render() {
    //todos:
    // Need to get alt text apparently


    console.log('state ', this.state);

    return (
      <>
        <div className='GamesListPage'>
          {this.renderHero()}
        </div>
        <div>
          {this.renderReel()}
        </div>
      </>
    )
  }
}