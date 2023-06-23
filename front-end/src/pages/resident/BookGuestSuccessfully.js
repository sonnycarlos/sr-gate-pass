import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useSrContext,
  validateUser
} from '../../context'

import { 
  BadgeCheck
} from '../../assets/svg'

import '../../css/status.css'

function BookGuestSuccessfully() {
  const [initialState, dispatch] = useSrContext()
  const navigate = useNavigate()

  // Handle click
  const handleClick = () => {
    window.location.href = window.location.href
    window.location.assign('/my-guests')
  }

  // Use effect
  useEffect(() => {
    document.title = 'Booking Guest Successfully'

    async function validate() {
      let token = window.localStorage.getItem('user')
      let res = await validateUser(dispatch, { token })

      if (res?.status === 401) {
        navigate('/login')
      }
    }

    validate()
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
      <button onClick={handleClick} className='solid btn'>Finish</button>
    </section>
  )
}

export default BookGuestSuccessfully