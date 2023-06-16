/**
 ** This function verifies user
 ** Creates resident profiles
**/

import { Axios } from '../config'

export default async function verifyUser(payload) {
  const { 
    firstName,
    lastName,
    birthdate,
    gender,
    address,
    phoneNumber,
    emailAddress,
    username,
    type,
    landCertificate,
    validId,
    picture
  } = payload
  
  console.log(payload)

  try {
    let res = await Axios.post('/user/verify-user', {
      firstName,
      lastName,
      birthdate,
      gender,
      address,
      phoneNumber,
      emailAddress,
      username,
      type,
      landCertificate,
      validId,
      picture
    })

    return res
  } catch (error) {
    console.error(`Unhandled action type: ${error}`)

    return {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage
    }
  }
}