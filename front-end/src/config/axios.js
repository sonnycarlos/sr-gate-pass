import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

export default axios