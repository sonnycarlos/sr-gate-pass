import React from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeCheck
} from '../../assets/svg/index'

import '../../css/status.css'

function OnBoardingSuccessfully() {
  return (
    <section id='status'>
      <img src={BadgeCheck} alt='Badge' />

      <div>
        <h1>You’re ready to go!</h1>
        <p>Your request to register your account has been approved by the admin. Welcome!</p>
      </div>

      <Link to='./homepage' className='solid btn'>Continue to homepage</Link>
    </section>
  )
}

export default OnBoardingSuccessfully