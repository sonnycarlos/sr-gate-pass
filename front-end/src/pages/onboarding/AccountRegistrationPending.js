import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeHappy
} from '../../assets/svg'

import '../../css/status.css'
import '../../css/style.css'

function AccountRegistrationPending() {
  // Use effect
  useEffect(() => {
    document.title = 'Account Registration Pending'
  }, [])

  return (
    <section id='status'>
      <img src={BadgeHappy} alt='Badge' />

      <div>
        <h1>Your request to register your profile is pending!</h1>
        <p>Thank you! We're in the process of creating your account. Just wait for a while and we will notify you for the response of your request.</p>
      </div>

      <div className='actions'>
        <Link to='#' className='solid btn'>Edit application</Link>
        <Link to='/login' className='outline btn'>Log out</Link>
      </div>
    </section>
  )
}

export default AccountRegistrationPending