/**
 ** This function will verify the OTP code sent to user's email address
**/

import Axios from '../config/axios'

export default async function verifyOtp(payload) {
  const { emailAddress, otpCode } = payload

  try {
    let res = await Axios.post('/user/verification', { emailAddressInput: emailAddress, otpCodeInput: otpCode })

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