import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../components'

import {
  Users
} from '../assets/svg'

import '../css/notifications.css'

function Notifications() {
  const items = Array(20).fill(null)

  // Use effect
  useEffect(() => {
    document.title = 'Notifications'
  }, [])

  return (
    <section id='notifications'>
      {/* Menu */}
      {/* <Menu /> */}

      {/* Navigation Bar */}
      <NavigationBar />

      <div className='container'>
        {/* Heading */}
        <h1>Notifications</h1>
      
        {/* List */}
        <div className='list'>
          {items.map(x => (
            <Link className='item'>
              <span className='badge'>
                <Users color='#FFF' />
              </span>

              <div>
                <div className='titleAndDate'>
                  <h3 className='title'>Your Guest</h3>
                  <p className='date'>Today at 9:10 AM</p>
                </div>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              </div>

              <span className='mark'></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Notifications