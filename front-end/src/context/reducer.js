// Global variables
export const COUNTDOWN = 60000

// Action yypes
export const LOG_IN_USER = 'LOG_IN_USER'
export const REGISTER_USER = 'REGISTER_USER'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const ON_BOARDING_TO_PROFILE = 'ON_BOARDING_TO_PROFILE'
export const SET_ACTION = 'SET_ACTION'
export const SET_COUNTDOWN_START = 'SET_COUNTDOWN_START'
export const KEEP_ME_LOGGED_IN = 'KEEP_ME_LOGGED_IN'
export const INSERT_ROUTE = 'INSERT_ROUTE'

// Initial state
export const initialState = {
  user: {},
  action: '',
  otpCountdown: '',
  countdownStart: false,
  keepMeLoggedIn: false,
  routeHistory: []
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
        user: action.payload
      }
    case FORGOT_PASSWORD:
      return {
        ...initialState,
        user: {
          ...initialState.user,
          emailAddress: action.payload
        }
      }
    case ON_BOARDING_TO_PROFILE:
      return {
        ...initialState,
        user: {
          ...initialState.user,
          ...action.payload
        }
      }
    case SET_ACTION:
      return {
        ...initialState,
        action: action.payload
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
    case INSERT_ROUTE:
      return {
        ...initialState,
        routeHistory: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}