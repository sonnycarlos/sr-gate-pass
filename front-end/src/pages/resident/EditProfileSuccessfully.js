import React from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeCheck
} from '../../assets/svg/index'

import '../../css/status.css'

function EditProfileSuccessfully() {
  return (
    <section id='status'>
      <img src={BadgeCheck} alt='Badge' />

      <div>
        <h1>Your request to edit your profile has been sent!</h1>
        <p>Thank you! Your request will be reviewed by the admin. Just wait for a while and you will receive a text message and email for the response of your request.</p>
      </div>

      <Link to='#' className='solid btn'>Finish</Link>
    </section>
  )
}

export default EditProfileSuccessfully