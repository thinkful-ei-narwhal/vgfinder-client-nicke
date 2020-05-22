import './GameItem.css'

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RemoveFromWishlistButton from '../RemoveFromWishlistButton/RemoveFromWishlistButton'

export default class GameItem extends Component {

  render() {
    return (
      <div>
        <Link to={`/games/${this.props.game.id}`}><img src={this.props.game.image_url_box_art} width="300" alt="Logo" /></Link>
        <br/>
        <RemoveFromWishlistButton />
        <p>
          Genre: {this.props.game.genre}
        </p>
        <p>
          Rating: {this.props.game.rating}
        </p>
        <p>
          Developer: {this.props.game.developer}
        </p>
      </div>
    )
  }
}