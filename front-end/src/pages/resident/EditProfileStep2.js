import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../../components'

import {
  ArrowRight,
  Back,
  ChevronDown
} from '../../assets/svg'

import '../../css/edit_profile.css'

function EditProfileStep2() {
  // Handle scroll
  const handleScroll = () => {
    const header = document.getElementById('header')

    if (window.scrollY > 64) {
      header.style.boxShadow = '0px 4px 16px rgba(139, 139, 139, 0.25)'
    }
    
    if (window.scrollY < 64) {
      header.style.boxShadow = 'none'
    }
  }

  // Use effect
  useEffect(() => {
    document.title = 'Edit Profile'

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id='edit_profile'>
      {/* Menu */}
      {/* <Menu /> */}

      {/* Navigation Bar */}
      <NavigationBar />

      <header id='header'>
        <div>
          {/* Back Button */}
          <Link to='#' className='text btn'>
            <Back />
            <span>Back</span>
          </Link>

          {/* Progress Bar */}
          <div id='progress-bar' className='progress-bar'>
            <span className='active bar'></span>
            <span className='active bar'></span>
            <span className='bar'></span>
          </div>
        </div>
      </header>

      {/* Heading */}
      <h1>Edit Profile</h1>

      {/* Form */}
      <form>
        <h2>Property Information</h2>

        <div className='inputFields'>
          <div className='form-group'>
            <label>
              Resident Type 
              <span className='required-symbol'>*</span>
            </label>

            <div className='select input-field'>
              <select name='residentType'>
                <option value='homeowner'>Homeowner</option>
                <option value='tenant'>Tenant</option>
              </select>

              <span className='suffix'>
                <ChevronDown color='#99A8BA' />
              </span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              Home Address 
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              placeholder='Your home address here'
            />
          </div>
        </div>

        <div className='btn-container'>
          <input type='submit' value='Continue' className='solid btn' />
          <ArrowRight color='#FFF' />
        </div>
      </form>
    </section>
  )
}

export default EditProfileStep2