import React, { useState } from 'react'

import {
  BrandLogo,
  Bell,
  Menu
} from '../assets/svg/index'

import { useSrContext, TOGGLE_NAV } from '../context'

function NavigationBar() {
  const [notificationCount, setNotificationCount] = useState(4)
  const [, dispatch] = useSrContext()

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
        <Bell />

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