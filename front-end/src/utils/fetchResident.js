/**
 ** This function fetch resident from the database
**/

import { Axios } from '../config'

export default async function fetchResident(payload) {
  const { id } = payload

  try {
    const res = await Axios.post('/profile/fetch-resident', { id }).then(res => {
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