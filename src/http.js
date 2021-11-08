import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
let config = {
  baseURL: '/api',
  withCredentials: true, // check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  config => {
    config.headers.common['auth-token'] = localStorage.getItem('authToken')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default _axios
