// Global Variables
export const COUNTDOWN = 60000

// Action Types
export const LOG_IN_USER = 'LOG_IN_USER'
export const REGISTER_USER = 'REGISTER_USER'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const SET_COUNTDOWN_START = 'SET_COUNTDOWN_START'
export const KEEP_ME_LOGGED_IN = 'KEEP_ME_LOGGED_IN'
export const SET_AUTH_ROUTE_DEST = 'SET_AUTH_ROUTE_DEST'
export const INSERT_ROUTE = 'INSERT_ROUTE'

// Initial State
export const initialState = {
  user: {},
  otpCountdown: '',
  countdownStart: false,
  keepMeLoggedIn: false,
  authRouteDest: '',
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
    case SET_AUTH_ROUTE_DEST:
      return {
        ...initialState,
        authRouteDest: action.payload
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