import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

import { 
  useSrContext, 
  SET_ACTIVE_PAGE
} from '../context'

import { domain } from '../constants'

import {
  BrandLogo,
  Bell,
  Dashboard,
  Home,
  Logout,
  Megaphone,
  User,
  Users,
} from '../assets/svg/index'

function SideBar() {
  const profileRef = useRef()
  const menuRef = useRef()
  const [initialState, dispatch] = useSrContext()
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)
  const profile = JSON.parse(window.localStorage.getItem('profile'))
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Open menu
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    profileRef.current.style.backgroundColor = '#E6EBF0'
  }

   // Use effect
  useEffect(() => {
    setNotifications(initialState.user?.notifications)

    const unreadNotifications = notifications?.filter(notification => !notification.isRead)
    const unreadCount = unreadNotifications?.length

    setNotificationCount(unreadCount)
  }, [initialState.user?.notifications])

  useEffect(() => {
    // Close menu
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.profile')) {
        setIsMenuOpen(false)
        profileRef.current.style.backgroundColor = '#FFF'
      }
    }

    document.addEventListener('click', handleClickOutside)

    // Implement real time
    const socket = io(domain)

    socket.on('notification', () => {
      setNotificationCount(prevCount => prevCount + 1)
    })
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
      socket.close()
    }
  }, [])

  return (
    <section id='side_bar'>
      <div className='brandLogoAndLinks'>
        {/* Brand Logo */}
        <img src={BrandLogo} alt='Brand Logo' id='brand-logo' />

        {/* Links */}
        <div className='links'>
          {profile.type === 'admin' && (
            <Link
              onClick={() => { dispatch({ type: SET_ACTIVE_PAGE, payload: 'home' }) }}
              className={`${initialState.activePage === 'home' && 'active'}`}
            >
              <div className='icon'>
                <Dashboard color={`${initialState.activePage === 'home' ? '#5CB950' : '#606060'}`} />
              </div>
              
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Dashboard</span>
            </Link>
          )}

          {profile.type === 'security' && (
            <Link
              onClick={() => {   dispatch({ type: SET_ACTIVE_PAGE, payload: 'home' }) }}
              className={`${initialState.activePage === 'home' && 'active'}`}
            >
              <div className='icon'>
                <Home color={`${initialState.activePage === 'home' ? '#5CB950' : '#606060'}`} />
              </div>
              
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Home</span>
            </Link>
          )}

          <Link
            onClick={() => { dispatch({ type: SET_ACTIVE_PAGE, payload: 'announcements' }) }}
            className={`${initialState.activePage === 'announcements' && 'active'}`}
          >
            <div className='icon'>
              <Megaphone color={`${initialState.activePage === 'announcements' ? '#5CB950' : '#606060'}`} />
            </div>
            
            <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Announcements</span>
          </Link>

          <Link
            onClick={() => { dispatch({ type: SET_ACTIVE_PAGE, payload: 'profiles' }) }}
            className={`${initialState.activePage === 'profiles' && 'active'}`}
          >
            <div className='icon'>
              <User color={`${initialState.activePage === 'profiles' ? '#5CB950' : '#606060'}`} />
            </div>

            <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Profiles</span>
          </Link>
          
          <Link
            onClick={() => { dispatch({ type: SET_ACTIVE_PAGE, payload: 'guests' }) }}
            className={`${initialState.activePage === 'guests' && 'active'}`}
          >
            <div className='icon'>
              <Users color={`${initialState.activePage === 'guests' ? '#5CB950' : '#606060'}`} />
            </div>
            
            <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Guests</span>
          </Link>

          <Link
            onClick={() => { dispatch({ type: SET_ACTIVE_PAGE, payload: 'notifications' }) }}
            className={`${initialState.activePage === 'notifications' && 'active'}`}
          >
            <Bell color={`${initialState.activePage === 'notifications' ? '#5CB950' : '#606060'}`} />
            <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Notifications</span>
          </Link>
        </div>
      </div>

      {/* Profile */}
      <div ref={profileRef} onClick={openMenu} className='profile'>
        <div className='profilePictureAndName'>
          <div className='profilePicture'>
            <p>S</p>
          </div>

          <div className='nameAndUsername'>
            <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} className='name'>Sonny Carlos</p>
            <p className='username'>@sonnycarlos</p>
          </div>
        </div>

        {isMenuOpen && (
          <div ref={menuRef} className='menu'>
            <Link to='#' >
              <User color='#606060' />
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>View Profile</span>
            </Link>

            <Link to='/login' >
              <Logout color='#606060' />
              <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Log out</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default SideBar