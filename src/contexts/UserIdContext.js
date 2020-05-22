import React, { Component } from 'react'

const UserIdContext = React.createContext({
  userId: undefined,
  setUserId: () => { },
})

export default UserIdContext

export class UserIdContextProvider extends Component {
  state = {
    userId: undefined,
  };

  setUserId = (userId) => {
    this.setState({ userId })
  }

  render() {
    const value = {
      userId: this.state.userId,
      setUserId: this.setUserId
    }
      
    return (
      <UserIdContext.Provider value={value}>
        {this.props.children}
      </UserIdContext.Provider>
    )
  }
}
