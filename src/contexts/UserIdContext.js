import React, { Component } from "react";

const UserIdContext = React.createContext({
  userId: undefined,
  wishlist: [],
  userGames: [],
  setUserId: () => {},
  setUserWishlist: () => {},
  setUserIdWishlistAndGames: () => {},
});

export default UserIdContext;

export class UserIdContextProvider extends Component {
  state = {
    userId: undefined,
    wishlist: [],
    userGames: [],
  };

  setUserId = (userId) => {
    this.setState({ userId });
  };

  setUserIdWishlistAndGames = (userId, wishlist, userGames) => {
    this.setState({ userId, wishlist, userGames });
  };

  render() {
    const value = {
      userId: this.state.userId,
      wishlist: this.state.wishlist,
      userGames: this.state.userGames,
      setUserId: this.setUserId,
      setUserIdWishlistAndGames: this.setUserIdWishlistAndGames,
    };

    return (
      <UserIdContext.Provider value={value}>
        {this.props.children}
      </UserIdContext.Provider>
    );
  }
}
