import { Axios } from '../config/index'

import { 
  LOG_IN_USER,
  REGISTER_USER
} from './reducer'

// Log In
export async function logInUser(dispatch, payload) {
  const { emailAddress, password } = payload

  try {
    let res = await Axios.post('/user/login', { emailAddress, password })

    if (res) {
      dispatch({ type: LOG_IN_USER, payload: res.data })
      return res
    }
  } catch (error) {
    console.error(`Unhandled action type: ${error}`)

    return {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage
    }
  }
}

// Register
export async function registerUser(dispatch, payload) {
  const { type, emailAddress, password } = payload

  try {
    let res = await Axios.post('/user/registration', { type, emailAddress, password })

    if (res) {
      dispatch({ type: REGISTER_USER, payload: res.data })
      return res
    }
  } catch (error) {
    console.error(`Unhandled action type: ${error}`)

    return {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage
    }
  }
}