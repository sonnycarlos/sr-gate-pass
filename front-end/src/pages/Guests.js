import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

import { 
  useSrContext,
  UPDATE_GUESTS_COUNT,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../context'

import {
  fetchGuests,
  formatDate,
  formatTime
} from '../utils'

import { domain } from '../constants'

import { Search } from '../assets/svg'

import '../css/guests.css'

function GuestsHistory() {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const [tabActive, setTabActive] = useState('bookingHistory')
  const [guests, setGuests] = useState([])
  const guestsCount = initialState.guestsCount
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [items, setItems] = useState([
    { date: 'Yesterday', count: 20 },
    { date: 'September 23', count: 20 },
    { date: 'September 22', count: 11 },
    { date: 'September 21', count: 12 },
    { date: 'September 20', count: 20 },
    { date: 'September 19', count: 21 },
    { date: 'September 18', count: 14 },
    { date: 'September 17', count: 34 },
    { date: 'September 16', count: 22 },
    { date: 'September 15', count: 19 },
    { date: 'September 14', count: 8 },
    { date: 'September 13', count: 16 },
    { date: 'September 12', count: 10 },
    { date: 'September 11', count: 26 },
    { date: 'September 10', count: 19 }
  ])

  // Use effect
  useEffect(() => {
    document.title = 'Guests History'
    
    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routeHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    document.cookie = `routeHistory=${routeHistory}`
    routeHistory.push('guests')
    document.cookie = `routeHistory=${routeHistory}`
    
    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'guests' })

    window.localStorage.removeItem('verification')

    // Validate user
    async function validate() {
      const token = window.localStorage.getItem('user')
      const res = await validateUser(dispatch, { token })

      console.log(res.data)

      if (res?.status === 401) {
        navigate('/login')
      }

      // Prevent access to this page if not security type
      if (details.type === 'homeowner' || details.type === 'tenant') {
        navigate('../home')
      }
    }

    // Fetch guests
    async function getGuests() {
      const res = await fetchGuests({})
      console.log(res.data)
      setGuests(res.data)
    }

    validate()
    getGuests()

    console.log(guests)

    // Implement real time
    const socket = io(domain)

    socket.on('guestCount', () => {
      dispatch({ type: UPDATE_GUESTS_COUNT, payload: guestsCount + 1 })
      console.log('Updated')
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <section id='guests'>
      {/* Header */}
      <header>
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Guests
        </h1>

        <Link className='searchBtn'>
          <Search color='#1E1E1E' />
        </Link>
      </header>

      {/* Tabs */}
      <div id='tabs'>
        <div 
          onClick={() => setTabActive('bookingHistory')}
          className={`tab ${tabActive === 'bookingHistory' && 'active'}`}
        >
          <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
            Booking History
          </p>

          <span></span>
        </div>

        <div 
          onClick={() => setTabActive('loggingHistory')}
          className={`tab ${tabActive === 'loggingHistory' && 'active'}`}
        >
          <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
            Logging History
          </p>

          <span></span>
        </div>
      </div>

      {/* Booking History List */}
      <div 
        style={{ display: `${tabActive === 'bookingHistory' ? 'flex' : 'none'}` }}
        className={`bookingHistory list ${tabActive === 'bookingHistory' && 'active'}`}
      >
        {guests?.map(({ _id, name, dateBooked, host }) => {
          return (
            <Link key={_id} className='item'>
              <div className='nameAndDate'>
                <h2 
                  style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                  className='name'
                >
                  {name}
                </h2>
                <p className='date'>{`${formatDate(dateBooked)} at ${formatTime(dateBooked)}`}</p>
              </div>

              <div className='bookedBy'>
                <p>Booked By</p>
                
                <div className='host'>
                  <div 
                    style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${guests[guests?.length - 1]?.host?.picture[0].name}')` }}
                    className='profilePicture'
                  >
                  </div>

                  <p 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                    className='name'
                  >
                    {`${guests[guests.length >= 3 ? guests.length - 3 : 0]?.host?.firstName} ${guests[guests.length >= 3 ? guests.length - 3 : 0]?.host?.lastName}`}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default GuestsHistory