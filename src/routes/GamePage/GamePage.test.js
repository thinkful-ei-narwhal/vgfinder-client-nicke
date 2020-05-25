import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GamePage from './GamePage'
import { GameProvider } from './../../contexts/GameContext'

describe(`Game Page component`, () => {
  it('renders a Game Page component', () => {
    const wrapper = shallow(
      <GameProvider>
        <GamePage />
      </GameProvider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
