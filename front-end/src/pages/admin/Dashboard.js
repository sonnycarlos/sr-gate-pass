import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QrReader from 'react-qr-reader'
import io from 'socket.io-client'

import { 
  useSrContext,
  UPDATE_GUESTS_COUNT,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser,
  fetchAnnouncements
} from '../../context'

import { 
  fetchGuests, 
  formatDate, 
  formatTime
} from '../../utils'

import { domain } from '../../constants'

import {
  Guest,
  MegaphoneEmoji,
  ChevronDown,
  Pin,
} from '../../assets/svg'

import '../../css/dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [guests, setGuests] = useState([])
  const guestsCount = initialState.guestsCount
  const [announcements, setAnnouncements] = useState(initialState.announcements)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const [notifications, setNotifications] = useState([])
  const [notificationsCount, setNotificationsCount] = useState(0)
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [time, setTime] = useState(new Date().getHours())
  const [greeting, setGreeting] = useState('')
  const [tabActive, setTabActive] = useState('scan')

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  // Get guests count
  const getGuestsCount = () => {
    const guestCount = guests?.reduce((count, guest) => {
      const dates = guest.dateBooked.map(date => date.split('T')[0])

      if (dates.includes(selectedDate)) {
        return count + 1
      }

      return count
    }, 0)

    return guestCount
  }

  // Handle scan
  const handleScan = async (scanData) => {
    setLoadingScan(true)
    console.log(`loaded data data`, scanData)

    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData)
      setData(scanData)
      setLoadingScan(false)
    }
  }

  // Handle error
  const handleError = (err) => {
    console.error(err)
  }

  // Use effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().getHours())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Set notifications and count
    setNotifications(initialState.user?.notifications)

    const unreadNotifications = notifications?.filter(notification => !notification.isRead)
    const unreadCount = unreadNotifications?.length

    setNotificationsCount(unreadCount)

    if (time >= 5 && time < 12) {
      setGreeting('Good morning!')
    } else if (time >= 12 && time < 18) {
      setGreeting('Good afternoon!')
    } else {
      setGreeting('Good evening!')
    }

  }, [initialState.user?.notifications])

  useEffect(() => {
    document.title = 'Home'

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routeHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    document.cookie = `routeHistory=${routeHistory}`
    routeHistory.push('home')
    document.cookie = `routeHistory=${routeHistory}`
    
    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'home' })

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

    // Fetch announcements
    async function getAnnouncements() {
      const updatedData = await fetchAnnouncements(dispatch, {})
      return updatedData
    }

    // Fetch guests
    async function getGuests() {
      const res = await fetchGuests({})
      console.log(res.data)
      setGuests(res.data)
    }

    validate()
    getGuests()
    getAnnouncements().then(fetchedAnnouncements => setAnnouncements(fetchedAnnouncements))

    console.log(guests)
    
    // Implement real time
    const socket = io(domain)

    socket.on('guestCount', () => {
      dispatch({ type: UPDATE_GUESTS_COUNT, payload: guestsCount + 1 })
      console.log('Updated')
    })
    
    socket.on('announcement', (announcement) => {
      setAnnouncements(prevAnnouncements => [...prevAnnouncements, announcement])
    })

    socket.on('notification', (notification) => {
      setNotifications(prevNotifications => [...prevNotifications, notification])
      setNotificationsCount(prevCount => prevCount + 1)
    })

    return () => {
      socket.close()
    }
  }, [guestsCount])

  return (
    <section id='dashboard'>
      {/* Heading */}
      <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
        {greeting}
      </h1>

      <div>
        {/* Guests, Announcements, Guests Booked */}
        <div className='guestsAnnouncementsGuestsBooked'>
          {/* Guests */}
          <div className='guests stack'>
            <img src={Guest} alt='Vector' className='vector' />

            <div>
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

              <Link className='text btn'>
                <span>View Guests</span>
              </Link>
            </div>

            <p>
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {getGuestsCount()} {getGuestsCount() > 2 ? 'guests' : 'guest'}
              </span>
              
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {selectedDate === today ? 'as of today' : `on ${formatDate(selectedDate)}`}
              </span>
            </p>
          </div>

          {/* Announcements */}
          <div className='announcements'>
            <Link to={`/announcement-overview/${announcements[announcements.length - 1]?._id}`} className='stack'>
              <div className='header'>
                <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                  Announcement
                  <img src={MegaphoneEmoji} alt='Emoji' />
                </h2>

                <div>
                  {announcements[announcements.length - 1]?.isPin && <Pin color='#5CB950' />}
                  
                  <span className='badge'>
                    {announcements.length}
                  </span>

                  <button 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='text btn'
                  >
                    See More
                  </button>
                </div>
              </div>

              <div className='content'>
                <div className='titleAndDate'>
                  <h3 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='title'
                  >
                    {announcements[announcements.length - 1]?.heading.length > 40 ? `${announcements[announcements.length - 1]?.heading.substring(0, 40)}...` : announcements[announcements.length - 1]?.heading}
                  </h3>
                  
                  <p className='date'>
                    {`${formatDate(announcements[announcements.length - 1]?.datePosted)} at ${formatTime(announcements[announcements.length - 1]?.datePosted)}`}
                  </p>
                </div>

                <p>
                  {announcements[announcements.length - 1]?.body.length > 140 ? `${announcements[announcements.length - 1].body.substring(0, 140)}...` : announcements[announcements.length - 1]?.body}
                  
                  {announcements[announcements.length - 1]?.body.length > 140 && (
                    <button 
                      to='#' 
                      style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                      className='text btn'
                    >
                      See more
                    </button>
                  )}
                </p>
              </div>
            </Link>

            <div className='stack'></div>
            <div className='stack'></div>
          </div>

          {/* Guests Booked */}
          <div className='guestsBooked stack'>
            <div className='header'>
              <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                Guests Booked
              </h2>

              <div>
                <span className='badge'>
                  {guests.length}
                </span>

                <button 
                  style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                  className='text btn'
                >
                  See More
                </button>
              </div>
            </div>

            <div className='items'>
              {guests?.length >= 3 && (
                <Link className='item'>
                  <div className='nameAndHost'>
                    <p 
                      style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                      className='name'
                    >
                      {guests[guests.length - 1]?.name}
                    </p>
                    
                    <div className='host'>
                      <div 
                        className='profilePicture'
                        style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${guests[guests.length - 1]?.host?.picture[0]?.name}')` }}
                      ></div>
                      
                      <p>{guests[guests.length - 1]?.host?.firstName + ' ' + guests[guests.length - 1]?.host?.lastName}</p>
                    </div>
                  </div>

                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} className='date'>
                    {today === guests[guests.length - 1]?.dateBooked[guests[guests.length - 1]?.dateBooked.length - 1] && guests[guests.length - 1]?.dateBooked[guests[guests.length - 1]?.dateBooked.length - 1] + ' at '}
                    {formatTime(guests[guests.length - 1]?.dateBooked[guests[guests.length - 1]?.dateBooked.length - 1])}
                  </p>
                </Link>
              )}

              {guests?.length >= 2 && (
                <Link className='item'>
                  <div className='nameAndHost'>
                    <p 
                      style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                      className='name'
                    >
                      {guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.name}
                    </p>
                    
                    <div className='host'>
                      <div 
                        className='profilePicture'
                        style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.host?.picture[0]?.name}')` }}
                      ></div>
                      
                      <p>{guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.host?.firstName + ' ' + guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.host?.lastName}</p>
                    </div>
                  </div>

                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} className='date'>
                    {today === guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.dateBooked[guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.dateBooked.length - 1] && formatDate(guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.dateBooked[guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.dateBooked.length - 1]) + ' at '}
                    {formatTime(guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.dateBooked[guests[guests?.length > 2 ? guests.length - 2 : guests.length - 1]?.dateBooked.length - 1])}
                  </p>
                </Link>
              )}

              {guests?.length >= 1 && (
                <Link className='item'>
                  <div className='nameAndHost'>
                    <p 
                      style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
                      className='name'
                    >
                      {guests[guests.length >= 3 ? guests.length - 3 : 0]?.name}
                    </p>
                    
                    <div className='host'>
                      <div 
                        className='profilePicture'
                        style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${guests[guests.length >= 3 ? guests.length - 3 : 0]?.host?.picture[0]?.name}')` }}
                      ></div>
                      
                      <p>{guests[guests.length >= 3 ? guests.length - 3 : 0]?.host?.firstName + ' ' + guests[guests.length >= 3 ? guests.length - 3 : 0]?.host?.lastName}</p>
                    </div>
                  </div>

                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} className='date'>
                    {today === guests[guests.length >= 3 ? guests.length - 3 : 0]?.dateBooked[guests[guests.length >= 3 ? guests.length - 3 : 0]?.dateBooked.length - 1] && formatDate(guests[guests.length >= 3 ? guests.length - 3 : 0]?.dateBooked[guests[guests.length >= 3 ? guests.length - 3 : 0]?.dateBooked.length - 1]) + ' at '}
                    {formatTime(guests[guests.length >= 3 ? guests.length - 3 : 0]?.dateBooked[guests[guests.length >= 3 ? guests.length - 3 : 0]?.dateBooked.length - 1])}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Gate Pass Reader */}
        <div className='gatePassReader'>
          {/* Tabs */}
          <div class='tabs'>
            <p onClick={() => setTabActive('scan')} className={`tab ${tabActive === 'scan' && 'active'}`} >
              Scan
            </p>

            <p onClick={() => setTabActive('input')} className={`tab ${tabActive === 'input' && 'active'}`}>
              Input
            </p>
          </div>

          {/* Scanner */}
          {tabActive === 'scan' && (
            <div className='scan reader' >
            </div>
          )}

          {/* Input */}
          {tabActive === 'input' && (
            <form className='input reader'>
              <div className='form-group'>
                <label>Booking Number</label>
                <input type='text' placeholder='E.g. 3301666420247' />
              </div>

              <input type='submit' value='Search' className='solid btn' />
            </form>
          )}

          {/* Search Result */}
          <div className='searchResult'>
            <div className='profilePictureAndName'>
              <div className='profilePicture'></div>
              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} className='name'>Sonny Carlos</p>
            </div>

            <div className='addressAndType'>
              <p className='address'>Phase 1, Block 20, Lot 5, North Village</p>
              <p className='type'>Resident</p>
            </div>

            <Link className='solid btn'>
              Overview
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard