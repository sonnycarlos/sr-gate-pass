import React, { useState } from 'react'

import {
  BrandLogo,
  Bell,
  Menu
} from '../assets/svg/index'

function NavigationBar() {
  const [notificationCount, setNotificationCount] = useState(4)

  return (
    <section id='navigation-bar'>
      <Menu />
      <img src={BrandLogo} alt='Brand Logo' id='brand-logo' />
      
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