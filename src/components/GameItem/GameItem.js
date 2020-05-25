import './GameItem.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UserIdContext from '../../contexts/UserIdContext';
import TokenService from './../../services/token-service';
import AddToWishlist from '../AddToWishlist/AddToWishlist'
import RemoveFromWishlistButton from '../RemoveFromWishlistButton/RemoveFromWishlistButton';

export default class GameItem extends Component {
  static contextType = UserIdContext;

  generateWishlistButton(wishlist, game) {
    if (TokenService.hasAuthToken()) {
      return !!wishlist.find(wishlistItem => wishlistItem.game_id === game.id)
        ? <RemoveFromWishlistButton game={game} />
        : <AddToWishlist game={game} />;
    }
    else {
      return <p>Sign in to add game to wishlist!</p>;
    }
  }

  render() {
    const wishlist = this.context.wishlist;
    return (
      <div>
        <Link to={`/games/${this.props.game.id}`}><img src={this.props.game.image_url_box_art} width="300" alt="Logo" /></Link>
        <br />
        {this.generateWishlistButton(wishlist, this.props.game)}
        <p>
          Title: {this.props.game.title}
        </p>
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