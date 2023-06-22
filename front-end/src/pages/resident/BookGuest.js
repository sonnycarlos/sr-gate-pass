import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  useSrContext
} from '../../context'

import { Back, Calendar } from '../../assets/svg'

import '../../css/book_guest.css'

function BookGuest() {
  const [initialState] = useSrContext()
  
  // Use effect
  useEffect(() => {
    document.title = 'Book Guest'
  }, [])

  return (
    <section id='book_guest'>
      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Heading */}
      <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
        Book Guest
      </h1>

      {/* Form */}
      <form>
        <div className='inputFields'>
          <div className='form-group'>
            <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Name of Guest
              <span className='required-symbol'>*</span>
              <span className='guide'>(full name)</span>
            </label>

            <input type='text' placeholder='Name of guest here' />
          </div>

          <div className='form-group'>
            <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Contact Number of Guest
              <span className='required-symbol'>*</span>
            </label>

            <input type='text' placeholder='Contact number of guest here' />
          </div>

          <div className='form-group'>
            <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Date of Birth 
              <span className='required-symbol'>*</span>
            </label>

            <div className='date input-field'>
              <input 
                type='date'
              />

              <span className='suffix'>
                <Calendar />
              </span>
            </div>
          </div>
        </div>

        <input type='submit' value='Book' className='solid btn' />
      </form>
    </section>
  )
}

export default BookGuest