import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RemoveFromWishlistButton from './RemoveFromWishlistButton'
import GameFixtures from './../../../testhelpers/GameFixtures'

describe(`RemoveFromWishlistButton component`, () => {
  it('renders a RemoveFromWishlistButton component with supplied props', () => {

    const wrapper = shallow(<RemoveFromWishlistButton game={GameFixtures.stubGameData} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
