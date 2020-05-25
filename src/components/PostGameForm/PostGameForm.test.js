import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PostGameForm from './PostGameForm';

describe(`Post game component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<PostGameForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})