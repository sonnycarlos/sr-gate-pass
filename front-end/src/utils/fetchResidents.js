/**
 ** This function fetch residents from the database
**/

import { Axios } from '../config'

export default async function fetchResidents() {
  try {
    const res = await Axios.post('/profile/fetch-residents').then(res => {
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