import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SearchPage from './SearchPage'
import { GamesListProvider } from './../../contexts/GamesListContext'

describe(`SearchPage component`, () => {
  it('renders a SearchPage component', () => {
    const wrapper = shallow(
      <GamesListProvider>
        <SearchPage />
      </GamesListProvider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
