/**
 ** This function validates the user's token
**/

import Axios from '../config/axios'

export default async function validateUser(payload) {
  const { token } = payload

  try {
    let res = await Axios.post('/user/validate-user', { token })

    return res
  } catch (error) {
    console.error(`Unhandled action type: ${error}`)

    return {
      status: error.response.status,
      errorMessage: error.response.data.errorMessage
    }
  }
}