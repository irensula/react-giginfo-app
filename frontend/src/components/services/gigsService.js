import axios from 'axios';

const baseUrl = '/api/gigs'

let token = null;

const setToken = newToken => {
  token = newToken
}

const makeHeader = () => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getAll = () => {
    const request = axios.get(baseUrl, makeHeader())
    return request.then(response => response.data)
}

const getGig = (id) => {
    return axios.get(`/gigs/${id}`, makeHeader())
    .then(response => response.data);
}

const add = (newGig) => {
    const request = axios.post(baseUrl, newGig, makeHeader())
    return request.then(response => response.data)
}

const updateGig = (id, updatedGig) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedGig, makeHeader())
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, makeHeader())
}

const postRegister = (userData) => {
    return axios.post('/register', userData, makeHeader())
    .then(response => response.data);
}

export default {
    getAll: getAll,
    getGig: getGig,
    add: add,
    updateGig: updateGig,
    remove: remove,
    setToken: setToken,
    postRegister: postRegister
}