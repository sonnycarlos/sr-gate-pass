import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

import { ChevronDown, Search, MoreHorizontal } from '../assets/svg'

import '../css/guests.css'

function GuestsHistory() {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const [guests, setGuests] = useState([])
  const guestsCount = initialState.guestsCount
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  // Handle click
  const handleClick = (id) => {
    window.localStorage.setItem('profileType', 'guest')
    navigate(`/profile-overview/${id}`)
  }

  // Use effect
  useEffect(() => {
    document.title = 'Guests'

    console.log(document.getElementById('items').offsetHeight)
    
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
      <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
        Guests
      </h1>

      {/* Stack */}
      <div className='stack'>
        <div className='filterAndSearch'>
          <div className='filter'>
            <p>Showing the result in</p>
            
            <div className='form-group'>
              <div className='date input-field'>
                <input 
                  type='date' 
                  value={selectedDate}
                  placeholder='Today' 
                  onChange={handleDateChange}
                  id='logDate'
                />

                <span className='suffix'>
                  <ChevronDown color='#1E1E1E' />
                </span>
              </div>
            </div>
          </div>

          <div className='search'>
            <div className='form-group'>
              <div className='input-field'>
                <span className='prefix'>
                  <Search />
                </span>

                <input 
                  type='text' 
                  placeholder='Search guest' 
                />
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className='list'>
          <div className='header row'>
            <div>
              <p>Guest Name</p>
            </div>
            
            <div>
              <p>Phone Number</p>
            </div>

            <div>
              <p>Host</p>
            </div>

            <div>
              <p>Booking Date</p>
            </div>

            <div>
              <p>Arrived Time</p>
            </div>
          </div>

          <div id='items' className='items'>
            {guests?.slice(0, screenWidth >= 1920 ? 12 : 24)?.map(({ _id, name, phoneNumber, dateBooked, timeArrived, host }) => (
              <div 
                key={_id} 
                onClick={() => handleClick(_id)} 
                className='item row'
              >
                <div className='name'>
                  <p>{name}</p>
                </div>

                <div className='phoneNumber'>
                  <p>{phoneNumber}</p>
                </div>

                <div className='host'>
                  <div 
                    style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${guests[guests?.length - 1]?.host?.picture[0].name}')` }}
                    className='profilePicture'
                  ></div>

                  <div className='nameAndUsername'>
                    <p className='name'>{host?.firstName + ' ' + host?.lastName}</p>
                    <p className='username'>@{host?.username}</p>
                  </div>
                </div>

                <div className='dateBooked'>
                  <p>{formatDate(dateBooked) + ' at ' + formatTime(dateBooked)}</p>
                </div>

                <div className='timeArrived'>
                  <p>{timeArrived.length != 0 ? formatTime(timeArrived[0]) : 'Not arrived'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div id='pagination'>
          <p>Showing 1 out of {guests?.length} results</p>

          <div className='actions'>
            <button className='text btn'>Previous</button>
            <button className='active text btn'>1</button>
            <button className='text btn'>2</button>
            <button className='text btn'>3</button>
            <button className='text btn'>4</button>
            <button className='text btn'><MoreHorizontal color='#606060' /></button>
            <button className='text btn'>50</button>
            <button className='text btn'>Next</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuestsHistory