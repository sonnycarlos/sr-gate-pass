import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

import { useSrContext, fetchAnnouncements } from '../context'

import {
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../context'

import { formatDate, formatTime } from '../utils'

import { domain } from '../constants'

import { Pin } from '../assets/svg'

import '../css/announcements.css'

function Announcements({ forwardRef }) {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const [announcements, setAnnouncements] = useState(initialState.announcements || [])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // Use effect
  useEffect(() => {
    document.title = 'Announcements'

    // Set the height of images
    // const imagesContainer = document.getElementsByClassName('imageContainer')
    // const width = parseInt(document.getElementById('images').offsetWidth) / 2
    
    // for (let i = 0; i < imagesContainer.length; i++) {
    //   imagesContainer[i].style.height = `${width}px`
    // }

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routeHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    document.cookie = `routeHistory=${routeHistory}`
    routeHistory.push('announcements')
    document.cookie = `routeHistory=${routeHistory}`
    
    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'announcements' })

    // Validate user
    async function validate() {
      let token = window.localStorage.getItem('user')
      let res = await validateUser(dispatch, { token })

      if (res?.status === 401) {
        navigate('/login')
      }
    }

    // Fetch announcements
    async function getAnnouncements() {
      const updatedData = await fetchAnnouncements(dispatch, {})
      return updatedData
    }

    validate()

    // Handle resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Implement real time for announcements
    const socket = io(domain)
    
    socket.on('announcement', (announcement) => {
      setAnnouncements(prevAnnouncements => [...prevAnnouncements, announcement])
    })

    getAnnouncements().then(fetchedAnnouncements => setAnnouncements(fetchedAnnouncements))

    return () => {
      window.removeEventListener('resize', handleResize)
      socket.close()
    }
  }, [])

  return (
    <section ref={forwardRef} id='announcements'>
      <div className='container'>
        {/* Heading */}
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Announcements
        </h1>

        {/* List */}
        {announcements?.length > 0 && (
          <div className='list'>
            {announcements?.slice(0)?.reverse()?.map(({ _id, heading, body, datePosted, isPin }, i) => {
              return (
                <Link 
                  to={screenWidth <= 500 && `/announcement-overview/${_id}`} 
                  key={_id} 
                  className='item'
                >
                  {isPin && (
                    <div className='pin'>
                      <Pin color='#5CB950' />
                    </div>
                  )}

                  <div className='titleAndDate'>
                    <h2 
                      style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                      className='title'
                    >
                      {screenWidth <= 500 ? heading.length > 30 ? `${heading.substring(0, 30)}...` : heading : heading}
                    </h2>
                    
                    <p className='date'>
                      {`${formatDate(datePosted)} at ${formatTime(datePosted)}`}
                    </p>
                  </div>

                  <p>
                    {screenWidth <= 500 ? body.length > 140 ? `${body.substring(0, 140)}...` : body : body}
                      
                    {screenWidth <= 500 && body.length > 140 && (
                      <button 
                        style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                        className='text btn'
                      >
                        See more
                      </button>
                    )}
                  </p>
                </Link>
                )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Announcements