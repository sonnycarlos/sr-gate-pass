/**
 ** This function unlocks gate pass
**/

import { Axios } from '../config'

export default async function unlockGatePass(payload) {
  const { id, pin } = payload

  try {
    const res = await Axios.post('/guest/unlock-gate-pass', { id, pin }).then(res => {
      return res
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