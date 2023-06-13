import Axios from 'axios'

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

// Request OTP code
export async function requestOtp(payload) {
  const { action, receiver } = payload

  try {
    let res = await Axios.post('/user/generate-otp', { action, receiver })

    if (res) {
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

// Verify OTP code
export async function verifyOtp(payload) {
  const { emailAddress, otpCode } = payload

  try {
    let res = await Axios.post('/user/verification', { emailAddressInput: emailAddress, otpCodeInput: otpCode })

    console.log(`Response`)

    if (res) {
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

// Validate User
export async function validateUser() {
  try {
    let res = await Axios.post('/user/validate-user')

    return res
  } catch (error) {
    console.error(`Unhandled action type: ${error}`)

    return {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage
    }
  }
}