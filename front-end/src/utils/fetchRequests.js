/**
 ** This function fetch requests from the database
**/

import { Axios } from '../config'

export default async function fetchRequests() {
  try {
    const res = await Axios.post('/profile/fetch-requests').then(res => {
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