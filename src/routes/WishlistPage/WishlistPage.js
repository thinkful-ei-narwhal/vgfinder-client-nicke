import "./WishlistPage.css";
import React, { Component } from "react";
import Header from "../../components/Header/Header";
import UserIdContext from "../../contexts/UserIdContext";
import Search from "../../components/Search/Search";
import WishlistApiService from "../../services/wishlist-api-service";
import Alert from "./../../components/Alert/Alert";

export default class WishlistPage extends Component {
  static contextType = UserIdContext;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
    };
  }

  handleErrorClick = () => {
    this.setState({ error: null });
  };

  componentDidMount() {
    const userId = this.context.userId;
    let userWishlist = [];
    let userGamesList = [];

    //get all wishlists for user
    const wishlistPromise1 = WishlistApiService.getAllWishlists()
      .then((res) => {
        userWishlist = res.filter((wishlist) => wishlist.user_id === userId);
      })
      .catch((err) => this.setState({ error: err.message }));

    //get all wishlisted game data
    const wishlistPromise2 = WishlistApiService.getwishlistedGames(userId)
      .then((res) => {
        userGamesList = res;
      })
      .catch((err) => this.setState({ error: err.message }));

    Promise.all([wishlistPromise1, wishlistPromise2]).then(() => {
      this.context.setUserIdWishlistAndGames(
        userId,
        userWishlist,
        userGamesList
      );
      this.setState({ loaded: true });
    });
  }

  renderWishlist() {
    const { error } = this.state;
    return (
      <>
        <div role="alert">
          {error && (
            <Alert message={error} handleErrorClick={this.handleErrorClick} />
          )}
        </div>
        <Search gamesList={this.context.userGames} />
      </>
    );
  }

  render() {
    return (
      <>
        <Header pathName={this.props.location.pathname} />
        {this.state.loaded ? this.renderWishlist() : null}
      </>
    );
  }
}
