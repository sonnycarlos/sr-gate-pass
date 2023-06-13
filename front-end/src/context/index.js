/**
 ** This file is where we export all the contents of the context folder
 ** We will usually do this to have cleaner import statements
**/

import { useSrContext, SrProvider } from './context'

import {
  logInUser,
  registerUser,
  requestOtp,
  verifyOtp,
  validateUser
} from './actions'

import {
  COUNTDOWN,
  LOG_IN_USER,
  REGISTER_USER,
  SET_COUNTDOWN_START,
  KEEP_ME_LOGGED_IN,
  SET_AUTH_ROUTE_DEST,
  initialState,
  reducer
} from './reducer'

export {
  useSrContext,
  SrProvider,
  COUNTDOWN,
  LOG_IN_USER,
  REGISTER_USER,
  SET_COUNTDOWN_START,
  KEEP_ME_LOGGED_IN,
  SET_AUTH_ROUTE_DEST,
  initialState,
  reducer,
  logInUser,
  registerUser,
  requestOtp,
  verifyOtp,
  validateUser
}