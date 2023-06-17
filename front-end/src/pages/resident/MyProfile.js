import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../../components'

import { Edit } from '../../assets/svg'

import '../../css/my_profile.css'

function MyProfile() {
  // Use effect
  useEffect(() => {
    document.title = 'My Profile'
  }, [])

  return (
    <section id='my_profile'>
      {/* Menu */}
      {/* <Menu /> */}

      {/* Navigation Bar */}
      <NavigationBar />

      <div className='container'>
        {/* Heading */}
        <h1>My Profile</h1>

        {/* Info */}
        <div className='info'>
          <div className='personalInfo'>
            <h2>Personal Information</h2>

            <div className='info-group'>
              <label>Full Name</label>
              <p>Sonny Carlos</p>
            </div>

            <div className='info-group'>
              <label>Username</label>
              <p>@sonnycarlos</p>
            </div>

            <div className='info-group'>
              <label>Birthday</label>
              <p>May 6, 2001</p>
            </div>

            <div className='info-group'>
              <label>Gender</label>
              <p>Male</p>
            </div>

            <div className='info-group'>
              <label>Phone Number</label>
              <p>09123456789</p>
            </div>
          </div>

          <div className='propertyInfo'>
            <h2>Property Information</h2>

            <div className='info-group'>
              <label>Resident Type</label>
              <p>Home Owner</p>
            </div>

            <div className='info-group'>
              <label>Home Address</label>
              <p>Phase 1, Block 20, Lot 5, North Village</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <Link to='#' className='solid circle btn'>
        <Edit color='#FFF' />
      </Link>
    </section>
  )
}

export default MyProfile