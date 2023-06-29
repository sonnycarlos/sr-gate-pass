import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

import { 
  Announcements, 
  BookGuest,
  Notifications 
} from '../../pages/index'

import { 
  useSrContext,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser,
  fetchAnnouncements
} from '../../context'

import { fetchGuests, formatDate  } from '../../utils'

import {
  Guest,
  MegaphoneEmoji,
  Add,
  ChevronUp,
  ChevronDown,
  Pin,
  Megaphone,
  Users
} from '../../assets/svg'

import '../../css/home.css'

function Home() {
  const homeContRef = useRef(null)
  const announcementsContRef = useRef(null)
  const notificationsContRef = useRef(null)
  const bookGuestContRef = useRef(null)
  const headingRef = useRef(null)
  const actionRef = useRef(null)
  const guestsStackRef = useRef(null)
  const announcementsStackHeaderRef = useRef(null)
  const announcementsStackTitleRef = useRef(null)
  const announcementsStackBadgeRef = useRef(null)
  const announcementsStackButtonRef = useRef(null)
  const announcementsStack1Ref = useRef(null)
  const announcementsStack2Ref = useRef(null)
  const announcementsStack3Ref = useRef(null)
  const condenseBtnRef = useRef(null)
  const notificationsStackRef = useRef(null)
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [announcements, setAnnouncements] = useState([])
  const [guests, setGuests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  // Get guest count
  const getGuestCount = () => {
    const guestCount = guests.reduce((count, guest) => {
      const dates = guest.dateBooked.map(date => date.split('T')[0])
      if (dates.includes(selectedDate)) {
        return count + 1
      }
      return count
    }, 0)
    return guestCount
  }

  // Navigate to Notifications
  const navigateToNotifications = (e) => {
    e.preventDefault()

    dispatch({ type: SET_ACTIVE_PAGE, payload: 'notifications' })

    homeContRef.current.style.transform = 'translateX(-150px)'
    homeContRef.current.style.transition = '300ms ease'
    notificationsContRef.current.style.visibility = 'visible'
    notificationsContRef.current.style.transform = 'translateX(0)'
    notificationsContRef.current.style.transition = '300ms ease'
    
    setTimeout(() => {
      navigate('/notifications')
    }, 500)
  }

  // Navigate to Announcements
  const navigateToAnnouncements = (e) => {
    e.preventDefault()

    dispatch({ type: SET_ACTIVE_PAGE, payload: 'announcements' })

    homeContRef.current.style.transform = 'translateX(-150px)'
    homeContRef.current.style.transition = '300ms ease'
    announcementsContRef.current.style.visibility = 'visible'
    announcementsContRef.current.style.transform = 'translateX(0)'
    announcementsContRef.current.style.transition = '300ms ease'
    
    setTimeout(() => {
      navigate('/announcements')
    }, 500)
  }

  // Navigate to Book Guest
  const navigateToBookGuest = (e) => {
    e.preventDefault()

    homeContRef.current.style.transform = 'translateX(-150px)'
    homeContRef.current.style.transition = '300ms ease'
    bookGuestContRef.current.style.visibility = 'visible'
    bookGuestContRef.current.style.transform = 'translateX(0)'
    bookGuestContRef.current.style.transition = '300ms ease'
    
    setTimeout(() => {
      navigate('/book-guest')
    }, 500)
  }

  // Expand announcements
  const expandAnnouncements = () => {
    headingRef.current.style.opacity = '0'
    announcementsStackButtonRef.current.style.display = 'none'

    setTimeout(() => {
      headingRef.current.style.transform = 'translateY(-500px)'
    }, 1000)

    setTimeout(() => {
      headingRef.current.innerText = 'Announcements'
      headingRef.current.style.transform = 'translateY(0)'
      headingRef.current.style.transition = '1000ms ease-out'
      headingRef.current.style.opacity = '1'
      headingRef.current.style.fontSize = '20px'

      if (window.innerWidth >= 390) {
        headingRef.current.style.fontSize = '24px'
      }
    }, 1200)

    guestsStackRef.current.style.top = '-500px'
    notificationsStackRef.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) + 280}px`

    setTimeout(() => {
      announcementsStack1Ref.current.style.top = '-258px'
      announcementsStack1Ref.current.style.gap = '8px'

      announcementsStack2Ref.current.style.top = `-${258 - (194 + 16)}px`
      announcementsStack2Ref.current.style.width = '100%'
      announcementsStack2Ref.current.style.backgroundColor = '#FFF'

      announcementsStack3Ref.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) - (194 + 141) + 48.5}px`
      announcementsStack3Ref.current.style.width = '100%'
      announcementsStack3Ref.current.style.backgroundColor = '#FFF'
      
      condenseBtnRef.current.style.top = `${(condenseBtnRef.current.getBoundingClientRect().top + window.pageYOffset) - (147)}px`

      if (window.innerWidth >= 390) {
        condenseBtnRef.current.style.top = `${(condenseBtnRef.current.getBoundingClientRect().top + window.pageYOffset) - (156)}px`
        announcementsStack3Ref.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) - (194 + 141) + 52}px`
        notificationsStackRef.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) + 300}px`
      }

      if (window.innerWidth >= 414) {
        condenseBtnRef.current.style.top = `${(condenseBtnRef.current.getBoundingClientRect().top + window.pageYOffset) - (162)}px`
        notificationsStackRef.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) + 308}px`
      }
    }, 500)

    setTimeout(() => {
      const announcementsStack2ParentElem = announcementsStack2Ref.current
      const announcementsStack2ChildrentElem = announcementsStack2ParentElem.childNodes
      const announcementsStack3ParentElem = announcementsStack3Ref.current
      const announcementsStack3ChildrentElem = announcementsStack3ParentElem.childNodes

      announcementsStack2ChildrentElem.forEach(child => {
        child.style.opacity = '1'
      })

      announcementsStack3ChildrentElem.forEach(child => {
        child.style.opacity = '1'
      })
    }, 1000)

    setTimeout(() => {
      announcementsStackHeaderRef.current.style.justifyContent = 'flex-end'
      announcementsStackTitleRef.current.style.opacity = '0'
      announcementsStackBadgeRef.current.style.display = 'none'
    }, 1800)

    setTimeout(() => {
      actionRef.current.style.opacity = '1'
      condenseBtnRef.current.style.opacity = 1
    }, 2000)

    if (window.innerWidth >= 390) {
      headingRef.current.style.fontSize = '24px'
      announcementsStack1Ref.current.style.top = '-258px'
      announcementsStack3Ref.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) - (194 + 141 + 89)}px`
      condenseBtnRef.current.style.top = 0
    }

    if (window.innerWidth >= 414) {
      announcementsStack1Ref.current.style.top = '-264px'
      announcementsStack3Ref.current.style.top = `${(announcementsStack3Ref.current.getBoundingClientRect().top + window.pageYOffset) - (194 + 141 + 99)}px`
    }
  }

  // Condense announcements
  const condenceAnnouncements = () => {
    headingRef.current.style.transform = 'translateY(-500px)'
    headingRef.current.style.transition = '1000ms ease-in'
    headingRef.current.style.opacity = '0'
    actionRef.current.style.opacity = '0'
    
    setTimeout(() => {
      headingRef.current.style.fontSize = '28px'
    }, 500)

    setTimeout(() => {
      headingRef.current.innerText = `Welcome, ${initialState.user?.profile?.firstName}!`
      headingRef.current.style.transform = 'translateY(0)'
      headingRef.current.style.transition = '1000ms ease-out'
      headingRef.current.style.opacity = '1'
    }, 1200)

    guestsStackRef.current.style.top = '141px'
    
    setTimeout(() => {
      headingRef.current.innerText = `Welcome, ${initialState.user?.profile?.firstName}!`
    }, 2000)

    guestsStackRef.current.style.left = '20px'
    guestsStackRef.current.style.right = '20px'

    notificationsStackRef.current.style.top = '626px'

    setTimeout(() => {
      announcementsStackHeaderRef.current.style.placeContent = 'space-between'
      announcementsStackTitleRef.current.style.opacity = '1'
      announcementsStackBadgeRef.current.style.display = 'grid'
      announcementsStackButtonRef.current.style.display = 'inline-flex'
    }, 300)

    setTimeout(() => {
      announcementsStack1Ref.current.style.top = '22px'
      announcementsStack1Ref.current.style.gap = '16px'

      announcementsStack2Ref.current.style.top = '10px'
      announcementsStack2Ref.current.style.width = '95%'
      announcementsStack2Ref.current.style.backgroundColor = '#E8E8E8'

      announcementsStack3Ref.current.style.top = '0'
      announcementsStack3Ref.current.style.width = '90%'
      announcementsStack3Ref.current.style.backgroundColor = '#D4D4D4'

      condenseBtnRef.current.style.opacity = 0
    }, 500)

    const announcementsStack2ParentElem = announcementsStack2Ref.current
    const announcementsStack2ChildrentElem = announcementsStack2ParentElem.childNodes
    const announcementsStack3ParentElem = announcementsStack3Ref.current
    const announcementsStack3ChildrentElem = announcementsStack3ParentElem.childNodes

    announcementsStack2ChildrentElem.forEach(child => {
      child.style.opacity = '0'
    })

    announcementsStack3ChildrentElem.forEach(child => {
      child.style.opacity = '0'
    })

    if (window.innerWidth >= 390) {
      guestsStackRef.current.style.top = '151px'
      notificationsStackRef.current.style.top = '642px'
    }

    if (window.innerWidth >= 414) {
      guestsStackRef.current.style.top = '155px'
      notificationsStackRef.current.style.top = '648px'
    }
  }

  // Use effect
  useEffect(() => {
    notificationsContRef.current.style.position = 'absolute'
    notificationsContRef.current.style.top = '0'
    notificationsContRef.current.style.bottom = '0'
    notificationsContRef.current.style.left = '0'
    notificationsContRef.current.style.right = '0'
    notificationsContRef.current.style.visibility = 'hidden'
    notificationsContRef.current.style.transform = 'translateX(100%)'
    notificationsContRef.current.style.zIndex = '3'

    announcementsContRef.current.style.position = 'absolute'
    announcementsContRef.current.style.top = '0'
    announcementsContRef.current.style.bottom = '0'
    announcementsContRef.current.style.left = '0'
    announcementsContRef.current.style.right = '0'
    announcementsContRef.current.style.visibility = 'hidden'
    announcementsContRef.current.style.transform = 'translateX(100%)'
    announcementsContRef.current.style.zIndex = '3'

    const announcements2StackParentElem = announcementsStack2Ref.current
    const announcements2StackChildrentElem = announcements2StackParentElem.childNodes
    const announcements3StackParentElem = announcementsStack3Ref.current
    const announcements3StackChildrentElem = announcements3StackParentElem.childNodes

    announcements2StackChildrentElem.forEach(child => {
      child.style.transition = '350ms ease-in-out'
      child.style.opacity = '0'
    })

    announcements3StackChildrentElem.forEach(child => {
      child.style.transition = '350ms ease-in-out'
      child.style.opacity = '0'
    })

    bookGuestContRef.current.style.position = 'absolute'
    bookGuestContRef.current.style.top = '0'
    bookGuestContRef.current.style.bottom = '0'
    bookGuestContRef.current.style.left = '0'
    bookGuestContRef.current.style.right = '0'
    bookGuestContRef.current.style.visibility = 'hidden'
    bookGuestContRef.current.style.transform = 'translateX(100%)'
    bookGuestContRef.current.style.zIndex = '100'
  }, [])
  
  useEffect(() => {
    document.title = 'Home'

    const routeHistory = initialState.routeHistory
    dispatch({ type: INSERT_ROUTE, payload: [...routeHistory, 'home'] })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'home' })

    window.localStorage.removeItem('verification')

    // Validate user
    async function validate() {
      const token = window.localStorage.getItem('user')
      const res = await validateUser(dispatch, { token })

      console.log(token)
      console.log(res)

      if (res?.status === 401) {
        navigate('/login')
      }

      setIsLoading(false)
    }

    // Fetch announcements
    async function getAnnouncements() {
      const res = await fetchAnnouncements(dispatch, {})

      console.log(res.data)
    }

    // Fetch guests
    async function getGuests() {
      const res = await fetchGuests({})

      const filteredData = res.data?.map(item => {
        return {
          dateBooked: item.dateBooked
        }
      })

      setGuests(filteredData)
    }

    validate()
    getAnnouncements()
    getGuests()

    console.log(guests)
  }, [])

  return (
    <>
      {/* For Animation Purpose Only */}
      <Notifications forwardRef={notificationsContRef} />
      <Announcements forwardRef={announcementsContRef} />
      <BookGuest forwardRef={bookGuestContRef} />

      <section ref={homeContRef} id='home'>
        <div className='container'>
          {/* Heading & Button */}
          <div className='header'>
            <h1 ref={headingRef} style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Welcome
              {isLoading ? '!' : `, ${initialState.user?.profile?.firstName}!`}
            </h1>

            <Link 
              // to='/announcements'
              ref={actionRef} 
              onClick={navigateToAnnouncements}
              style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
              className='text btn'
            >
              See All
            </Link>
          </div>

          {/* Guests */}
          <div ref={guestsStackRef} className='guests stack'>
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

              <Link onClick={navigateToBookGuest} className='text btn'>
                <Add color='#FFF' />

                <span>Book Guest</span>
              </Link>
            </div>

            <p>
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {getGuestCount()} {getGuestCount().length > 2 ? 'guests' : 'guest'}
              </span>
              
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {selectedDate === today ? 'as of today' : `on ${formatDate(selectedDate)}`}
              </span>
            </p>
          </div>

          {/* Announcements */}
          <div className='announcements'>
            <div ref={announcementsStack1Ref} className='stack'>
              <div ref={announcementsStackHeaderRef} className='header'>
                <h2 ref={announcementsStackTitleRef} style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                  Announcement
                  <img src={MegaphoneEmoji} alt='Emoji' />
                </h2>

                <div>
                  <Pin color='#5CB950' />
                  <span ref={announcementsStackBadgeRef} className='badge'>1</span>

                  <button 
                    ref={announcementsStackButtonRef}
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    onClick={expandAnnouncements}
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
                    Vivamus vulputate aliquet quam, nec 
                  </h3>
                  
                  <p className='date'>Yesterday at 10:00 AM</p>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non blandit tortor. Ut fringilla scelerisque neque, in accumsan quam aliquam.
                  
                  <Link 
                    to='#' 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='btn text'
                  >
                    See more
                  </Link>
                </p>
              </div>
            </div>

            <div ref={announcementsStack2Ref} className='stack'>
              <div className='content'>
                <div className='titleAndDate'>
                  <h3 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='title'
                  >
                    Vivamus vulputate aliquet quam, nec 
                  </h3>
                  
                  <p className='date'>Yesterday at 10:00 AM</p>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non blandit tortor. Ut fringilla scelerisque neque, in accumsan quam aliquam.
                  
                  <Link 
                    to='#' 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='btn text'
                  >
                    See more
                  </Link>
                </p>
              </div>
            </div>

            <div ref={announcementsStack3Ref} className='stack'>
              <div className='content'>
                <div className='titleAndDate'>
                  <h3 
                    style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                    className='title'
                  >
                    Vivamus vulputate aliquet quam, nec 
                  </h3>
                  
                  <p className='date'>Yesterday at 10:00 AM</p>
                </div>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non blandit tortor. Ut fringilla scelerisque neque, in accumsan quam aliquam vulputate.</p>
              </div>
            </div>

            {/* Condense Button */}
            <button 
              ref={condenseBtnRef}
              onClick={condenceAnnouncements} 
              className='condense btn'
            >
              <ChevronUp color='#1E1E1E' />
            </button>
          </div>

          {/* Notifications */}
          <div 
            ref={notificationsStackRef} 
            onClick={navigateToNotifications}
            className='notifications stack'
          >
            <div className='header'>
              <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                Notifications
              </h2>

              <div>
                <span className='badge'>4</span>
                <Link 
                  style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                  onClick={navigateToNotifications}
                  className='text btn'
                >
                  See More
                </Link>
              </div>
            </div>

            <div className='list'>
              <Link to='#' className='item'>
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
              </Link>

              <Link className='item'>
                <span className='badge'>
                  <Megaphone color='#FFF' />
                </span>

                <div>
                  <div className='titleAndDate'>
                    <h3 
                      style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                      className='title'
                    >
                      Announcement
                    </h3>

                    <p className='date'>Today at 9:10 AM</p>
                  </div>
                  
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
                </div>
              </Link>

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
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home