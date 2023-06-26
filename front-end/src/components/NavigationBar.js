import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { 
  useSrContext, 
  TOGGLE_NAV,
  SET_ACTIVE_PAGE
} from '../context'

import {
  BrandLogo,
  Bell,
  Menu
} from '../assets/svg/index'

function NavigationBar() {
  const [notificationCount, setNotificationCount] = useState(4)
  const [initialState, dispatch] = useSrContext()

  // Handle click
  const handleClick = () => {
    dispatch({ type: TOGGLE_NAV })
  }

  return (
    <section id='navigation-bar'>
      {/* Menu Icon */}
      <a onClick={handleClick}>
        <Menu />
      </a>

      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' id='brand-logo' />
      
      {/* Bell Icon */}
      <div id='notification-container'>
        <Link to='/notifications'>
          <Bell color={`${initialState.activePage === 'notifications' ? '#5CB950' : '#B1B3B6'}`} />
        </Link>

        <span 
          style={{ 
            width: notificationCount > 9 ? 'fit-content' : '20px', 
            padding: notificationCount > 9 ? '6px' : '0', 
            borderRadius: notificationCount > 9 ? '12px' : '100%'
          }}
          className='badge'
        >
          {notificationCount}
        </span>
      </div>
    </section>
  )
}

export default NavigationBar