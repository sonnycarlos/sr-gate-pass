import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeCheck
} from '../../assets/svg'

import '../../css/status.css'

function OnBoardingSuccessfully() {
  // Use effect
  useEffect(() => {
    document.title = 'On Boarding Successfully'
  }, [])
  
  return (
    <section id='status'>
      {/* Bage */}
      <img src={BadgeCheck} alt='Badge' />

      {/* Heading & Paragraph */}
      <div>
        <h1>You’re ready to go!</h1>
        <p>Your request to register your account has been approved by the admin. Welcome!</p>
      </div>

      {/* Action */}
      <Link to='/login' className='solid btn'>Continue to homepage</Link>
    </section>
  )
}

export default OnBoardingSuccessfully