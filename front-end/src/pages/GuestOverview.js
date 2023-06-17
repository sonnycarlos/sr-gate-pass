import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Back, Copy } from '../assets/svg'

import '../css/guest_overview.css'

function GuestOverview() {
  // Use effect
  useEffect(() => {
    document.title = 'Guest Overview'
  }, [])

  return (
    <section id='guest_overview'>
      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header>
        <h1>Guest Overview</h1>
        <Link to='#' className='text btn'>View History</Link>
      </header>

      {/* Info */}
      <div className='info'>
        <div className='info-group'>
          <label>Booking Number</label>
          <p>01195470019855</p>
        </div>

        <div className='info-group'>
          <label>Name</label>
          <p>Justin Timberlake</p>
        </div>

        <div className='info-group'>
          <label>Last Date of Booking</label>
          <p>September 24 at 12:00 PM</p>
        </div>

        <div className='info-group'>
          <label>Date of Arrival</label>
          <p>September 26</p>
        </div>

        <div className='info-group'>
          <label>Last Time of Logged In</label>
          <p>2:40 PM</p>
        </div>

        <div className='info-group'>
          <label>URL Link</label>

          <Link to='#'>
            www.gatepass.com/w&x7s1z

            <button>
              <Copy color='#5CB950' />
            </button>
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className='actions'>
        <button className='outline btn'>Download QR Code</button>
        <Link to='#' className='solid btn'>Rebook</Link>
      </div>
    </section>
  )
}

export default GuestOverview