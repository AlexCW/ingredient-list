import axios from 'axios'

const getAuthHeader = function () {
  return {
    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
  }
}

export const http = axios.create({
  baseURL: `http://api.eataway.co.uk/`,
  headers: getAuthHeader()
})
