import React from 'react'
import List from './List'
import store from '../../store'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
Enzyme.configure({ adapter: new Adapter() })

it('renders List correctly', () => {
    const wrapper = shallow(
        <List store={store} />,
    ).dive()
    expect(toJson(wrapper)).toMatchSnapshot()
})