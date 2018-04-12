// src/reducers/index.js

import { CREATE_URL, FETCH_LIST, SHOW_NOTIFICATION, UPDATE_URL } from '../constants'

const initialState = {
    list: [],
    notification: {},
    url: ""
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_URL:
            return { ...state, list: action.list, notification: action.notification, url: action.url }
        case FETCH_LIST:
            return { ...state, list: action.list }
        case SHOW_NOTIFICATION: 
            return { ...state, notification: action.notification }
        case UPDATE_URL:
            return { ...state, url: action.url }
        default:
            return state
    }
}

export default rootReducer