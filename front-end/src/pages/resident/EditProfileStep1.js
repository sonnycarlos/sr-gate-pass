import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../../components/index'

import {
  ArrowRight,
  Back,
  Calendar,
  Camera,
  ChevronDown
} from '../../assets/svg/index'

import '../../css/edit_profile.css'

function EditProfileStep1() {
  // Handle Scroll
  const handleScroll = () => {
    const header = document.getElementById('header')

    if (window.scrollY > 64) {
      header.style.boxShadow = '0px 4px 16px rgba(139, 139, 139, 0.25)'
    }
    
    if (window.scrollY < 64) {
      header.style.boxShadow = 'none'
    }
  }

  // Use Effect
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
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
        </div>
      </header>

      {/* Heading */}
      <h1>Edit Profile</h1>

      {/* Form */}
      <form>
        <h2>Personal Information</h2>

        <div className='inputFields'>
          <div className='form-group'>
            <label>
              Profile Picture 
              <span className='required-symbol'>*</span>
              <span className='guide'>(must be hd and updated)</span>
            </label>

            <div className='avatar-container'>
              <div className='avatar'></div>

              <input type='file' accept='image/*' />

              <span>
                <Camera color='#FFF' />
              </span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              First Name 
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              placeholder='Your first name here'
            />
          </div>

          <div className='form-group'>
            <label>Middle Name</label>

            <input 
              type='text'
              placeholder='Your middle name here'
            />
          </div>

          <div className='form-group'>
            <label>
              Last Name 
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              placeholder='Your last name here'
            />
          </div>

          <div className='form-group'>
            <label>
              Username
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              placeholder='Your username here'
            />
          </div>

          <div className='form-group'>
            <label>
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

          <div className='form-group'>
            <label>
              Gender 
              <span className='required-symbol'>*</span>
            </label>

            <div className='select input-field'>
              <select name='gender'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>

              <span className='suffix'>
                <ChevronDown color='#99A8BA' />
              </span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              Phone Number
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              placeholder='Your phone number here'
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

export default EditProfileStep1