import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeCheck
} from '../../assets/svg/index'

import '../../css/status.css'

function BookGuestSuccessfully() {
  // Use Effect
  useEffect(() => {
    document.title = 'Booking Guest Successfully'
  }, [])

  return (
    <section id='status'>
      <img src={BadgeCheck} alt='Badge' />

      <div>
        <h1>Your booking has been placed!</h1>
        <p>You can copy the URL link so your guest can use it to enter the subdivision. The QR code is only valid for 24 hours.</p>
      </div>

      <Link to='#' className='solid btn'>Finish</Link>
    </section>
  )
}

export default BookGuestSuccessfully