import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ContributePage from './ContributePage'
import { GamesListProvider } from './../../contexts/GamesListContext'

describe(`Contribute Page component`, () => {
  it('renders a Contribute Page component', () => {
    const wrapper = shallow(
      <GamesListProvider>
        <ContributePage />
      </GamesListProvider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
