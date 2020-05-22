import './WishlistPage.css'
import React, { Component } from 'react';
import Header from './../../components/Header/Header';
import { Section } from './../../components/Utils/Utils'
import WishlistApiService from '../../services/wishlist-api-service';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'

export default class WishlistPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.userId = this.props.match.params.userId;

    if (this.userId === "undefined") {
      const jwtToken = TokenService.getAuthToken();
      const decoded = jwtDecode(jwtToken);
      this.userId = decoded.user_id;
    }

    WishlistApiService.getwishlistedGames(this.userId)
      .then(res => {
        this.wishListedGames = res;
        console.log('TESTING', this.wishListedGames);
        this.setState({ loaded: true });
      })
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    // this.context.clearGame();
  }

  renderGame() {
    // const { error } = this.context


    return <>
      <Header pathName={this.props.location.pathname.includes('undefined') ?
        this.props.location.pathname.replace("undefined", this.userId) :
        this.props.location.pathname} />
      <Section className='GamePage'>
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