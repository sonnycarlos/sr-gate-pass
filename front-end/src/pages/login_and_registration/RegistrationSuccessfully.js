import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { 
  BadgeAmazed
} from '../../assets/svg'

import '../../css/status.css'

function RegistrationSuccessfully() {
  const navigate = useNavigate()

  // Use effect
  useEffect(() => {
    document.title = 'Registration Successfully'

    if (!window.localStorage.getItem('registration')) {
      navigate('/login')
    }
  }, [])
  
  return (
    <section id='status'>
      {/* Bage */}
      <img src={BadgeAmazed} alt='Badge' />

      {/* Heading & Paragraph */}
      <div>
        <h1>Congratulations!</h1>
        <p>You successfully registered your account! Click the button below to proceed to login.</p>
      </div>

      {/* Action */}
      <Link to='/login' className='solid btn'>Continue to login</Link>
    </section>
  )
}

export default RegistrationSuccessfully