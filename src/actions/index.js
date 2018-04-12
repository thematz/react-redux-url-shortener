// src/actions/index.js

import axios from 'axios'
import { CREATE_URL, FETCH_LIST, UPDATE_URL, SHOW_NOTIFICATION, ERROR } from '../constants'

axios.defaults.baseURL = 'http://localhost:4000'

function showError(error) {
    return {
        type: SHOW_NOTIFICATION,
        notification: {
            type: ERROR,
            message: error.response ? error.response.data : error.message
        }
    }
}
export const updateUrl = url => ({ type: UPDATE_URL, url })
export const fetchList = () => dispatch => {
    axios.get('/list')
        .then((res) => {
            dispatch({
                type: FETCH_LIST,
                list: res.data
            })
        })
        .catch(error => dispatch(showError(error)))
}
export const fetchUrl = id => dispatch => {
    axios.get(id)
        .then((res) => {
            window.location.href = res.data.url
        })
        .catch(error => dispatch(showError(error)))
}
export const shorten = url => dispatch => {
    axios.post('/shorten', { url: url })
        .then((res) => {
            dispatch({
                type: CREATE_URL,
                list: res.data,
                notification: {},
                url: ''
            })
        })
        .catch(error => dispatch(showError(error)))
}