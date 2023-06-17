import React from 'react'

import { Link } from 'react-router-dom'
import { Close } from '../assets/svg/index'

import { useSrContext, TOGGLE_NAV } from '../context'

function Menu() {
  const [, dispatch] = useSrContext()

  // Handle click
  const handleClick = () => {
    dispatch({ type: TOGGLE_NAV })
  }

  return (
    <section id='menu'>
      {/* Close Button */}
      <a onClick={handleClick}>
        <Close />
      </a>

      {/* Links */}
      <div className='links'>
        <Link to='/home'>Home</Link>
        <Link to='#'>Announcements</Link>
        <Link to='#' className='active'>My Profile</Link>
        <Link to='#'>My Gate Pass</Link>
        <Link to='#'>My Guests</Link>
        <Link to='#'>About HOA</Link>
        <Link to='/login'>Log Out</Link>
      </div>
    </section>
  )
}

export default Menu