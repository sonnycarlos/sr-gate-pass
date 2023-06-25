import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import html2canvas from 'html2canvas'

import {
  useSrContext,
  validateUser,
  bookGuest
} from '../../context'

import { checkIfGuestExists, uploadImage } from '../../utils'

import { Back } from '../../assets/svg'

import '../../css/book_guest.css'

function BookGuest() {
  const profileDetails = JSON.parse(window.localStorage.getItem('profile'))
  const [inputs, setInputs] = useState({
    guestName: '',
    guestPhoneNumber: '',
    pin: ''
  })
  const qrCodeCanvasRef = useRef(null)
  const [initialState, dispatch] = useSrContext()
  
  const navigate = useNavigate()

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(inputs)

    const guestExists = await checkIfGuestExists({
      name: inputs.guestName,
      phoneNumber: inputs.guestPhoneNumber,
      emailAddress: profileDetails?.emailAddress
    })

    if (guestExists.status === 200) {
      const res = await bookGuest(dispatch, { 
        name: inputs.guestName,
        phoneNumber: inputs.guestPhoneNumber,
        pin: inputs.pin,
        emailAddress: profileDetails?.emailAddress
      })
  
      if (res.status === 200) {
        const bookingDetails = {
          ...res.data,
          action: 'book'
        }

        window.localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails))
        return navigate('/book-guest-successfully')
      }
  
      if (res.status === 400) {
        console.log(res)
        return
      }
    }
    
    const canvas = await html2canvas(qrCodeCanvasRef.current)
    const qrCodeImage = canvas.toDataURL()

    const fileRes = await uploadImage(qrCodeImage)

    const res = await bookGuest(dispatch, { 
      name: inputs.guestName,
      phoneNumber: inputs.guestPhoneNumber,
      qrCodeImage: `${fileRes.data?.public_id}.png`,
      pin: inputs.pin,
      emailAddress: profileDetails?.emailAddress
    })

    if (res.status === 200) {
      const bookingDetails = {
        ...res.data.guest,
        action: 'book'
      }
      
      window.localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails))
      navigate('/book-guest-successfully')
    }

    if (res.status === 400) {
      console.log(res)
    }
  }
  
  // Use effect
  useEffect(() => {
    document.title = 'Book Guest'

    window.localStorage.removeItem('bookingDetails')

    async function validate() {
      let token = window.localStorage.getItem('user')
      let res = await validateUser(dispatch, { token })

      if (res?.status === 401) {
        navigate('/login')
      }
    }

    validate()

    console.log(profileDetails)
  }, [])

  return (
    <section id='book_guest'>
      {/* QR Code */}
      <div ref={qrCodeCanvasRef} id='qr-code'>
        <div style={{ width: '750px', height: '750px' }}>
          <QRCodeCanvas
            value={`${profileDetails._id}/${inputs.guestName}/${inputs.guestPhoneNumber}`}
            size={1000}
            bgColor={'#FFF'}
            fgColor={'#000'}
            level={'L'}
            includeMargin={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Back Button */}
      <Link to='/my-guests' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Heading */}
      <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
        Book Guest
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='inputFields'>
          <div className='form-group'>
            <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Name of Guest
              <span className='required-symbol'>*</span>
              <span className='guide'>(full name)</span>
            </label>

            <input 
              type='text'
              name='guestName'
              placeholder='Name of guest here'
              value={inputs.guestName}
              onChange={e => setInputs({ ...inputs, guestName: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Phone Number of Guest
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              name='guestPhoneNumber'
              placeholder='Phone number of guest here'
              value={inputs.guestPhoneNumber}
              onChange={e => setInputs({ ...inputs, guestPhoneNumber: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Pin
              <span className='required-symbol'>*</span>
              <span className='guide'>(to be used by guest to view their gate pass)</span>
            </label>

            <input 
              type='text'
              name='pin'
              placeholder='Pin here'
              value={inputs.pin}
              maxLength='6'
              onChange={e => setInputs({ ...inputs, pin: e.target.value })}
              required
            />
          </div>
        </div>

        <input type='submit' value='Book' className='solid btn' />
      </form>
    </section>
  )
}

export default BookGuest