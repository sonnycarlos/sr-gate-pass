import Axios from 'axios'

import { LOG_IN_USER } from './reducer'

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
  const { emailAddress, password } = payload

  try {
    let res = await Axios.post('/registration', { emailAddress, password })

    if (res) {
      return res.data
    }
  } catch (error) {
    throw new Error(`Unhandled action type: ${error}`)
  }
}