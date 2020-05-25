import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddToWishlist from './AddToWishlist'
import { UserIdContextProvider } from './../../contexts/UserIdContext'
import GameFixtures from './../../../testhelpers/GameFixtures'


describe(`Add to wishlist button component`, () => {
  it('renders the Add to wishlist button if you supply a game', () => {
    const wrapper = shallow(
      <UserIdContextProvider >
        <AddToWishlist game={GameFixtures.stubGameData} />
      </UserIdContextProvider >
    )
      .find('#note-folder-select')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
