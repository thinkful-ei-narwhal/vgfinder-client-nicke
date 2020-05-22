import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GameCarousel from './GameCarousel'

describe(`GameCarousel component`, () => {
  const propsGamesHomePage = {
    reel: [
      {
        imgUrl: "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
        gameId: "2"
      },
      {
        imgUrl: "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
        gameId: "2"
      }
    ],
    isSingleGame: false,
    setActiveGame: 2
  }

  const propsGamePage = {
    isSingleGame: true,
    reel: [{
      imgUrl: "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
      gameId: "2"
    }]
  }

  it('renders a GameCarousel by default', () => {
    const wrapper = shallow(<GameCarousel />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the NotefulForm given GamesHomePage props', () => {
    const wrapper = shallow(<GameCarousel {...propsGamesHomePage} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the NotefulForm given GamePage props', () => {
    const wrapper = shallow(<GameCarousel {...propsGamePage} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
