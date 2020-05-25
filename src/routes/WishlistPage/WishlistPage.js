import './WishlistPage.css'
import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { Section } from '../../components/Utils/Utils'
import UserIdContext from '../../contexts/UserIdContext';
import Search from '../../components/Search/Search'
import WishlistApiService from '../../services/wishlist-api-service';

export default class WishlistPage extends Component {
  static contextType = UserIdContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    const userId = this.context.userId
    let userWishlist = [];
    let userGamesList = [];

    //get all wishlists for user
    const wishlistPromise1 = WishlistApiService.getAllWishlists()
      .then(res => {
        userWishlist = res.filter(wishlist => wishlist.user_id === userId);
      })
      .catch(this.context.setError)

    //get all wishlisted game data
    const wishlistPromise2 = WishlistApiService.getwishlistedGames(userId)
      .then(res => {
        userGamesList = res;
      })
      .catch(this.context.setError)

    Promise.all([wishlistPromise1, wishlistPromise2]).then(() => {
      this.context.setUserIdWishlistAndGames(userId, userWishlist, userGamesList);
      this.setState({ loaded: true })
    });
  }

  renderWishlist() {
    return <>
      <Section className='GamePage'>
        <Search gamesList={this.context.userGames} />
      </Section>
    </>
  }

  render() {
    return (
      <>
        <Header pathName={this.props.location.pathname} />
        {this.state.loaded ? this.renderWishlist() : null}
      </>
    )
  }
}