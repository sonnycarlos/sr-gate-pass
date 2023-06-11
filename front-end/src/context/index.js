/**
 ** This file is where we export all the contents of the context folder
 ** We will usually do this to have cleaner import statements
**/

import { useSrContext, SrProvider } from './context'

import {
  logInUser,
  registerUser,
} from './actions'

import {
  COUNTDOWN,
  LOG_IN_USER,
  REGISTER_USER,
  SET_COUNTDOWN_START,
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
  initialState,
  reducer,
  logInUser,
  registerUser
}