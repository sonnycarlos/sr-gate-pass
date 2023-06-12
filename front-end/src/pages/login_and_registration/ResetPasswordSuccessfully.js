import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeCheck
} from '../../assets/svg/index'

import '../../css/status.css'
import '../../css/style.css'

function ResetPasswordSuccessfully() {
  // Use Effect
  useEffect(() => {
    document.title = 'Reset Password Successfully'
  }, [])

  return (
    <section id='reset_password_successfully'>
      <img src={BadgeCheck} alt='Badge' />

      <div>
        <h1>Your password has been reset successfully</h1>
        <p>Click the button below to proceed to login.</p>
      </div>

      <Link to='./login' className='solid btn'>Continue to login</Link>
    </section>
  )
}

export default ResetPasswordSuccessfully