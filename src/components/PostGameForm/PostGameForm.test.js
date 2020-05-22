import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PostGameForm from './PostGameForm';

describe(`Post game component`, () => {
  const stubGameData = {
    "title": "Hollow Knight",
    "description": "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.",
    "genre": "Adventure",
    "rating": "4",
    "developer": "Team Cherry",
    "trailer_url": "https://www.youtube.com/watch?v=UAO2urG23S4&ab_channel=TeamCherry",
    "image_url_box_art": "https://steamcdn-a.akamaihd.net/steam/apps/367520/capsule_616x353.jpg?t=1577747500",
    "image_url_two": "https://hollowknight.com/wp-content/uploads/2018/09/false_knight.jpg",
    "image_url_three": "https://i.pinimg.com/originals/35/b6/1e/35b61ecc72dc845891b779b6e6ce79bd.jpg"
  }

  it('renders the complete form', () => {
    const wrapper = shallow(<PostGameForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // // enzyme doesn't support React.createContext
  // it('renders the select options from folders', () => {
  //   const context = { folders: stubGameData }
  //   const select = shallow(<PostGameForm />, context)
  //     .find('#note-folder-select')
  //   expect(toJson(select)).toMatchSnapshot()
  // })
})