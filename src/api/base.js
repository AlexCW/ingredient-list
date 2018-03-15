import axios from 'axios'
import auth from '../auth'

export const http = axios.create({
  baseURL: `http://api.eataway.co.uk/`,
  headers: auth.getAuthHeader()
})
