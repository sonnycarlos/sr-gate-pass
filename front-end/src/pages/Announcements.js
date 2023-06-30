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

import { Pin } from '../assets/svg'

import '../css/announcements.css'

function Announcements({ forwardRef }) {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const [announcements, setAnnouncements] = useState(initialState.announcements)

  // Use effect
  useEffect(() => {
    document.title = 'Announcements'

    // Set the height of images
    // const imagesContainer = document.getElementsByClassName('imageContainer')
    // const width = parseInt(document.getElementById('images').offsetWidth) / 2
    
    // for (let i = 0; i < imagesContainer.length; i++) {
    //   imagesContainer[i].style.height = `${width}px`
    // }

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routesHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    document.cookie = `routesHistory=${routeHistory}`
    routeHistory.push('announcements')
    document.cookie = `routesHistory=${routeHistory}`
    
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

    // Implement real time for announcements
    const socket = io('http://localhost:8000')
    
    socket.on('announcement', (announcement) => {
      setAnnouncements(prevAnnouncements => [...prevAnnouncements, announcement])
    })

    getAnnouncements().then(fetchedAnnouncements => setAnnouncements(fetchedAnnouncements))

    return () => {
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
        <div className='list'>
          {announcements?.map((announcement, i) => {
            const reversedIndex = announcements.length - i - 1

            return (
              <Link 
                to={`/announcement-overview/${announcements[reversedIndex]._id}`} 
                key={announcements[reversedIndex]._id} 
                className='item'
              >
                {announcements[reversedIndex].isPin && (
                  <div className='pin'>
                    <Pin color='#5CB950' />
                  </div>
                )}

                <div className='titleAndDate'>
                  <h2 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                    className='title'
                  >
                    {announcements[reversedIndex].heading.length > 30 ? `${announcements[reversedIndex].heading.substring(0, 30)}...` : announcements[reversedIndex].heading}
                  </h2>
                  
                  <p className='date'>
                    {`${formatDate(announcements[reversedIndex].datePosted)} at ${formatTime(announcements[reversedIndex].datePosted)}`}
                  </p>
                </div>

                <p>
                  {announcements[reversedIndex].body.length > 140 ? `${announcements[reversedIndex].body.substring(0, 140)}...` : announcements[reversedIndex].body}
                    
                  {announcements[reversedIndex].body.length > 140 && (
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
      </div>
    </section>
  )
}

export default Announcements