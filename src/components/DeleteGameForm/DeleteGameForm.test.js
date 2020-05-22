import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DeleteGameForm from './DeleteGameForm'

describe(`DeleteGameForm component`, () => {
  it('renders a form.DeleteGameForm by default', () => {
    const wrapper = shallow(<DeleteGameForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
