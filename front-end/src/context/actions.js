import { Axios } from '../config/'
import { 
  VALIDATE_USER,
  LOG_IN_USER,
  REGISTER_USER,
  BOOK_GUEST,
} from './reducer'

// Validate user
export async function validateUser(dispatch, payload) {
  const { token } = payload

  try {
    let res = await Axios.post('/user/validate-user', { token })

    dispatch({ type: VALIDATE_USER, payload: res.data })

    console.log(res)

    return res
  } catch (error) {
    console.error(`Unhandled action type: ${error}`)

    return {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage
    }
  }
}

// Log in
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

// Book guest
export async function bookGuest(dispatch, payload) {
  const { 
    name,
    phoneNumber,
    qrCodeImage,
    pin,
    emailAddress
  } = payload

  try {
    let res = await Axios.post('/guest/book-guest', { name, phoneNumber, qrCodeImage, pin, emailAddress })

    if (res) {
      dispatch({ type: BOOK_GUEST, payload: res.data })
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