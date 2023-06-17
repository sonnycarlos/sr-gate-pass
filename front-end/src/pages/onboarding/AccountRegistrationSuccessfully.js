import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeAmazed
} from '../../assets/svg'

import '../../css/status.css'

function AccountRegistrationSuccessfully() {
  // Use effect
  useEffect(() => {
    document.title = 'Account Registration Successfully'
  }, [])
  
  return (
    <section id='status'>
      {/* Bage */}
      <img src={BadgeAmazed} alt='Badge' />

      {/* Heading & Paragraph */}
      <div>
        <h1>You’re ready to go!</h1>
        <p>Your request to register your account has been approved by the admin. Welcome!</p>
      </div>

      {/* Action */}
      <Link to='/home' className='solid btn'>Continue to homepage</Link>
    </section>
  )
}

export default AccountRegistrationSuccessfully