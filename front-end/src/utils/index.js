/**
 ** This file is where we export all the utilities
 ** We will usually do this to have cleaner import statements
**/

import checkIfGuestExists from './checkIfGuestExists'
import checkResidentUsername from './checkResidentUsername'
import checkUser from './checkUser'
import fetchGuest from './fetchGuest'
import fetchGuests from './fetchGuests'
import formatBirthdate from './formatBirthdate'
import formatBytes from './formatBytes'
import formatDate from './formatDate'
import formatTime from './formatTime'
import logOut from './logOut'
import onBoarding from './onBoarding'
import registerUser from './registerUser'
import updateUser from './updateUser'
import renderer from './renderer'
import removeNavBar from './removeNavBar'
import resetPassword from './resetPassword'
import requestOtp from './requestOtp'
import uploadFile from './uploadFile'
import uploadImage from './uploadImage'
import verifyOtp from './verifyOtp'
import approveUser from './approveUser'

export {
  checkIfGuestExists,
  checkResidentUsername,
  checkUser,
  fetchGuest,
  fetchGuests,
  formatBirthdate,
  formatBytes,
  formatDate,
  formatTime,
  logOut,
  onBoarding,
  registerUser,
  updateUser,
  renderer,
  removeNavBar,
  resetPassword,
  requestOtp,
  uploadFile,
  uploadImage,
  verifyOtp,
  approveUser
}