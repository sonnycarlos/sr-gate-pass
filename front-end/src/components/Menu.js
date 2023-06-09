import React from 'react'

import { Link } from 'react-router-dom'
import { Close } from '../assets/svg/index'

import { 
  useSrContext, 
  TOGGLE_NAV,
  SET_ACTIVE_PAGE
} from '../context'

function Menu() {
  const [initialState, dispatch] = useSrContext()
  const profile = JSON.parse(window.localStorage.getItem('profile'))

  // Handle click
  const handleClick = () => {
    dispatch({ type: TOGGLE_NAV })
  }

  // Log out user
  const logOut = () => {
    dispatch({ type: TOGGLE_NAV })
    window.localStorage.removeItem('loggedIn')
    window.localStorage.removeItem('user')
    window.location.href = window.location.href
    window.location.assign('/login')
  }

  return (
    <section id='menu'>
      {/* Close Button */}
      <a onClick={handleClick}>
        <Close />
      </a>

      {/* Links */}
      <div className='links'>
        <Link 
          to={profile.type === 'security' ? '/home-sg' : '/home'} 
          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
          className={`${initialState.activePage === 'home' && 'active'}`}
          onClick={() => dispatch({ type: TOGGLE_NAV })}
        >
          Home
        </Link>

        <Link 
          to='/announcements' 
          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
          className={`${initialState.activePage === 'announcements' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'announcements' })
          }}
        >
          Announcements
        </Link>

        {profile.type === 'resident' && (
          <Link 
            to='my-profile' 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className={`${initialState.activePage === 'myProfile' && 'active'}`}
            onClick={() => {
              dispatch({ type: TOGGLE_NAV })
              dispatch({ type: SET_ACTIVE_PAGE, payload: 'myProfile' })
            }}
          >
            My Profile
          </Link>
        )}

        {profile.type === 'security' && (
          <Link 
            to='gate-pass-reader' 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className={`${initialState.activePage === 'gatePassReader' && 'active'}`}
            onClick={() => {
              dispatch({ type: TOGGLE_NAV })
              dispatch({ type: SET_ACTIVE_PAGE, payload: 'gatePassReader' })
            }}
          >
            Gate Pass Reader
          </Link>
        )}

        {profile.type === 'homeowner' && (
          <Link 
            to='my-gate-pass' 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className={`${initialState.activePage === 'myGatePass' && 'active'}`}
            onClick={() => {
              dispatch({ type: TOGGLE_NAV })
              dispatch({ type: SET_ACTIVE_PAGE, payload: 'myGatePass' })
            }}
          >
            My Gate Pass
          </Link>
        )}

        {profile.type === 'security' ? (
          <Link 
            to='guests' 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className={`${initialState.activePage === 'guests' && 'active'}`}
            onClick={() => {
              dispatch({ type: TOGGLE_NAV })
              dispatch({ type: SET_ACTIVE_PAGE, payload: 'guests' })
            }}
          >
            Guests
          </Link>
        ) : (
          <Link 
            to='my-guests' 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className={`${initialState.activePage === 'myGuests' && 'active'}`}
            onClick={() => {
              dispatch({ type: TOGGLE_NAV })
              dispatch({ type: SET_ACTIVE_PAGE, payload: 'myGuests' })
            }}
          >
            My Guests
          </Link>
        )}

        <Link 
          to='map' 
          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
          className={`${initialState.activePage === 'map' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'map' })
          }}
        >
          Map
        </Link>

        <Link 
          to='#' 
          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
          className={`${initialState.activePage === 'about' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'about' })
          }}
        >
          About HOA
        </Link>
        
        <Link 
          to='/login' 
          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
          className={`${initialState.activePage === 'logOut' && 'active'}`}
          onClick={logOut}
        >
          Log Out
        </Link>
      </div>
    </section>
  )
}

export default Menu