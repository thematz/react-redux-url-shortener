import React from 'react'
import Notification from './Notification'
import store from '../../store'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
Enzyme.configure({ adapter: new Adapter() })

it('renders Notification correctly', () => {
    const wrapper = shallow(
        <Notification store={store} type='is-danger' message='Error' />,
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})