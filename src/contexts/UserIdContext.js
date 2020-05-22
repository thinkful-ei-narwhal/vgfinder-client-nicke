import React, { Component } from 'react'

const UserIdContext = React.createContext({
  userId: undefined,
  wishlist: [],
  setUserId: () => { },
  setUserWishlist: () => { },
})

export default UserIdContext

export class UserIdContextProvider extends Component {
  state = {
    userId: undefined,
    wishlist: []
  };

  setUserId = (userId) => {
    this.setState({ userId })
  }

  setUserWishlist = (wishlist) => {
    this.setState({ wishlist })
  }


  render() {
    const value = {
      userId: this.state.userId,
      wishlist: this.state.wishlist,
      setUserId: this.setUserId,
      setUserWishlist: this.setUserWishlist
    }

    return (
      <UserIdContext.Provider value={value}>
        {this.props.children}
      </UserIdContext.Provider>
    )
  }
}
