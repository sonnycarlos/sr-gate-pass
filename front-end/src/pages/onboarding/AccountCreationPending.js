import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeAmazed
} from '../../assets/svg'

import '../../css/status.css'
import '../../css/style.css'

function AccountCreationPending() {
  // Use Effect
  useEffect(() => {
    document.title = 'Pending Account'
  }, [])

  return (
    <section id='status'>
      <img src={BadgeAmazed} alt='Badge' />

      <div>
        <h1>Your request to register your profile has been sent!</h1>
        <p>Thank you! Your request will be reviewed by the admin. Just wait for a while and you will receive a text message and email for the response of your request.</p>
      </div>

      <div className='actions'>
        <Link to='#' className='solid btn'>Edit application</Link>
        <Link to='/login' className='outline btn'>Log out</Link>
      </div>
    </section>
  )
}

export default AccountCreationPending