import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeCheck
} from '../../assets/svg'

import '../../css/status.css'

function EditProfileSuccessfully() {
  // Use effect
  useEffect(() => {
    document.title = 'Editing Profile Successfully'
  }, [])

  return (
    <section id='status'>
      {/* Badge */}
      <img src={BadgeCheck} alt='Badge' />

      {/* Heading & Paragraph */}
      <div>
        <h1>Your request to edit your profile has been sent!</h1>
        <p>Thank you! Your request will be reviewed by the admin. Just wait for a while and you will receive a text message and email for the response of your request.</p>
      </div>

      {/* Action */}
      <Link to='#' className='solid btn'>Finish</Link>
    </section>
  )
}

export default EditProfileSuccessfully