// src/reducers/reducers.test.js

import { ERROR, SHOW_NOTIFICATION, FETCH_LIST, UPDATE_URL } from '../constants'
import rootReducer from './'

it('should return a new state change in notification', () => {
    const notification = {
        type: ERROR,
        message: 'Error'
    }
    const initialState = {
        list: [],
        notification: {},
        url: ''
    }
    const newState = {
        ...initialState,
        notification
    }
    expect(rootReducer(initialState, { type: SHOW_NOTIFICATION, notification})).toEqual(newState)
})

it('should return a new state change fetching list', () => {
    const initialState = {
        list: [],
        notification: {},
        url: ''
    }
    const list = [{
        id: '1',
        creationDate: 'Wed Apr 11 2018 19:13:51 GMT+0100 (WEST)',
        url: 'https://www.ef.edu.pt/'
    }]
    const newState = {
        ...initialState,
        list
    }

    expect(rootReducer(initialState, { type: FETCH_LIST, list: list})).toEqual(newState)
})

it('should return a new state change in url value', () => {
    const initialState = {
        list: [],
        notification: {},
        url: ''
    }
    const newState = {
        ...initialState,
        url: 'https://www.ef.edu.pt/'
    }

    expect(rootReducer(initialState, { type: UPDATE_URL, url: "https://www.ef.edu.pt/" })).toEqual(newState)
})