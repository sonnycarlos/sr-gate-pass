/**
 ** This file is where we export all the contents of the context folder
 ** We will usually do this to have cleaner import statements
**/

import { useSrContext, SrProvider } from './context'

import {
  logInUser,
  registerUser
} from './actions'

import {
  COUNTDOWN,
  LOG_IN_USER,
  REGISTER_USER,
  FORGOT_PASSWORD,
  ON_BOARDING_TO_PROFILE,
  SET_ACTION,
  SET_COUNTDOWN_START,
  KEEP_ME_LOGGED_IN,
  INSERT_ROUTE,
  TOGGLE_NAV,
  SET_ACTIVE_PAGE,
  initialState,
  reducer
} from './reducer'

export {
  useSrContext,
  SrProvider,
  COUNTDOWN,
  LOG_IN_USER,
  REGISTER_USER,
  FORGOT_PASSWORD,
  ON_BOARDING_TO_PROFILE,
  SET_ACTION,
  SET_COUNTDOWN_START,
  KEEP_ME_LOGGED_IN,
  INSERT_ROUTE,
  TOGGLE_NAV,
  SET_ACTIVE_PAGE,
  initialState,
  reducer,
  logInUser,
  registerUser
}