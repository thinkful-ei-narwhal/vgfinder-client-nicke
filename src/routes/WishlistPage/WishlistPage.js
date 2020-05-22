import './WishlistPage.css'
import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { Section } from '../../components/Utils/Utils'
import WishlistApiService from '../../services/wishlist-api-service';
import UserIdContext from '../../contexts/UserIdContext';
import WishlistList from '../../components/WishlistList/WishlistList'

export default class WishlistPage extends Component {
  static contextType = UserIdContext;

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    WishlistApiService.getwishlistedGames(this.context.userId)
      .then(res => {
        this.wishListedGames = res;
        this.setState({ loaded: true });
      })
      .catch(this.context.setError)
  }

  renderGame() {
    // const { error } = this.context
    return <>
      <Header pathName={this.props.location.pathname} />
      <Section className='GamePage'>
        < WishlistList userWishlist={this.wishListedGames} />
        {/* Place the wishlist item component in here and map all of the wishlist games to it */}
      </Section>
    </>
  }

  render() {
    return (
      <>
        {this.state.loaded ? this.renderGame() : null}
      </>
    )
  }
}