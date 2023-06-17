/**
 ** This function resets the user's password
**/

import { Axios } from '../config'

export default async function uploadFile(files) {
  const formData = new FormData()
  formData.append('file', files)
  formData.append('upload_preset', 'kfaije1j')

  let res = await Axios.post('https://api.cloudinary.com/v1_1/dfc3s2kfc/raw/upload', formData, { withCredentials: false }).then(res => {
    return res
  })

  return res
}