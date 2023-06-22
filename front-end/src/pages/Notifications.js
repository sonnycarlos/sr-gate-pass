import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSrContext } from '../context'

import {
  Users
} from '../assets/svg'

import '../css/notifications.css'

function Notifications() {
  const [initialState, dispatch] = useSrContext()
  const items = Array(20).fill(null)

  // Use effect
  useEffect(() => {
    document.title = 'Notifications'
  }, [])

  return (
    <section id='notifications'>
      <div className='container'>
        {/* Heading */}
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Notifications
        </h1>
      
        {/* List */}
        <div className='list'>
          {items.map(x => (
            <Link className='item'>
              <span className='badge'>
                <Users color='#FFF' />
              </span>

              <div>
                <div className='titleAndDate'>
                  <h3 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='title'
                  >
                    Your Guest
                  </h3>

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