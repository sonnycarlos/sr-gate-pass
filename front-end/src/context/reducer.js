// Global Variables
export const COUNTDOWN = 60000

// Action Types
export const LOG_IN_USER = 'LOG_IN_USER'
export const REGISTER_USER = 'REGISTER_USER'
export const SET_COUNTDOWN_START = 'SET_COUNTDOWN_START'
export const KEEP_ME_LOGGED_IN = 'KEEP_ME_LOGGED_IN'

// Initial State
export const initialState = {
  user: {},
  otpCountdown: '',
  countdownStart: false,
  keepMeLoggedIn: false
}

// Reducer
export const reducer = (initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...initialState,
        user: action.payload
      }
    case REGISTER_USER:
      return {
        ...initialState,
        user: {}
      }
    case SET_COUNTDOWN_START:
      return {
        ...initialState,
        countdownStart: action.payload
      }
    case KEEP_ME_LOGGED_IN:
      return {
        ...initialState,
        keepMeLoggedIn: true
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}