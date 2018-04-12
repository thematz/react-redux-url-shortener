import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { ERROR, SHOW_NOTIFICATION, FETCH_LIST, UPDATE_URL } from '../constants'
import { updateUrl } from './'

const mock = new MockAdapter(axios)

describe('actions', () => {
    it('should create a `updateUrl` action', () => {
        const url = 'https://www.ef.edu.pt/'
        const expectedAction = {
            type: UPDATE_URL,
            url
        }
        expect(updateUrl(url)).toEqual(expectedAction)
    })

    describe('http requests', () => {
        afterEach(function () {
            mock.reset()
        })

        it('should create a `fetchList` action', () => {
            const list = []
            mock.onGet('/list').reply(200, list)

            axios.get('/list')
                .then((res) => {
                    expect(res.data).toEqual(list)
                })
        })

        describe('fetchUrl action', () => {
            it('should find and return a url', () => {
                const response = {
                    id: '1',
                    creationDate: 'Wed Apr 11 2018 19:13:51 GMT+0100 (WEST)',
                    url: 'https://www.ef.edu.pt/'
                }

                mock.onGet('/:id', { params: { id: '1' } }).reply(200, response)

                axios.get('/:id', { params: { id: '1' } })
                    .then((res) => {
                        expect(res.data).toEqual(response)
                    })
            })

            it('shouldn\'t find a url and return error', () => {
                mock.onGet('/:id', { params: { id: '1' } }).reply(404, 'not found')

                axios.get('/:id', { params: { id: '1' } })
                    .catch((res) => {
                        expect(res).toEqual(new Error('Request failed with status code 404'))
                    })
            })
        })
        
        describe('shorten action', () => {
            it('should create a new url', () => {
                const response = {
                    id: '1',
                    creationDate: 'Wed Apr 11 2018 19:13:51 GMT+0100 (WEST)',
                    url: 'https://www.ef.edu.pt/'
                }
                mock.onPost('/shorten', { params: { url: 'https://www.ef.edu.pt/' } }).reply(200, response)

                axios.post('/shorten', { params: { url: 'https://www.ef.edu.pt/' } })
                    .then((res) => {
                        expect(res.data).toEqual(response)
                    })
            })

            it('shouldn\'t create new url and return error', () =>{
                const response = 'Unable to shorten that link. It is not a valid url.'
                mock.onPost('/shorten', { params: { url: '123' } }).reply(400, response)

                axios.post('/shorten', { params: { url: '123' } })
                    .catch((error) => {
                        expect(error.response.data).toEqual(response)
                    })
            })
        })

        describe('network errors', () => {
            it('should handle network error on GET', () => {
                mock.onGet().networkError()
    
                axios.get()
                    .catch((error) => {
                        expect(error).toMatchObject(new Error('Network Error'));
                    })
            })
            it('should handle network error on POST', () => {
                mock.onPost().networkError()
    
                axios.post()
                    .catch((error) => {
                        expect(error).toMatchObject(new Error('Network Error'));
                    })
            })
        })
    })

})

