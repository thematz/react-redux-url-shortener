import React from 'react'
import Form from './Form'
import store from '../../store'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
Enzyme.configure({ adapter: new Adapter() })

it('renders Form correctly', () => {
    const wrapper = shallow(
        <Form store={store} />,
    ).dive()
    expect(toJson(wrapper)).toMatchSnapshot()
})