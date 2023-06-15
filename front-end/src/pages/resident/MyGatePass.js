import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Back } from '../../assets/svg'
import QRCode from '../../assets/images/qr-code.png'

import '../../css/my_gate_pass.css'

function MyGatePass() {
  // Use Effect
  useEffect(() => {
    document.title = 'My Gate Pass'
  }, [])

  return (
    <section id='my_gate_pass'>
      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      <div className='container'>
        {/* Profile Picture */}
        <div className='profilePicture'></div>

        {/* Name & Address */}
        <div className='nameAndAddress'>
          <h1 className='name'>Sonny Carlos</h1>
          <p className='address'>Phase 1, Block 20, Lot 5, North Village</p>
        </div>

        {/* QR Code */}
        <img src={QRCode} alt='QR Code' className='qrCode' />

        {/* Greeting */}
        <div className='greetings'>
          <p className='greet'>Good morning!</p>
          <p className='time'>11:11:11 AM</p>
          <p className='date'>Saturday 11 September</p>
        </div>
      </div>
    </section>
  )
}

export default MyGatePass