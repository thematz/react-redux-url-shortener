import React from 'react';
import App from './App';
import store from './store'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
    const wrapper = shallow(
        <App store={store} />,
    )
    expect(toJson(wrapper)).toMatchSnapshot()
});
