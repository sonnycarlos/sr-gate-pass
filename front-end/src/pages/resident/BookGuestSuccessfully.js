import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  useSrContext
} from '../../context'

import { 
  BadgeCheck
} from '../../assets/svg'

import '../../css/status.css'

function BookGuestSuccessfully() {
  const [initialState] = useSrContext()

  // Use effect
  useEffect(() => {
    document.title = 'Booking Guest Successfully'
  }, [])

  return (
    <section id='status'>
      {/* Badge */}
      <img src={BadgeCheck} alt='Badge' />

      {/* Heading & Paragraph */}
      <div>
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Your booking has been placed!
        </h1>
        
        <p>You can copy the URL link so your guest can use it to enter the subdivision. The QR code is only valid for 24 hours.</p>
      </div>

      {/* Action */}
      <Link to='#' className='solid btn'>Finish</Link>
    </section>
  )
}

export default BookGuestSuccessfully