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

  // Handle click
  const handleClick = () => {
    dispatch({ type: TOGGLE_NAV })
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
          to='/home' 
          className={`${initialState.activePage === 'home' && 'active'}`}
          onClick={() => dispatch({ type: TOGGLE_NAV })}
        >
          Home
        </Link>

        <Link 
          to='/announcements' 
          className={`${initialState.activePage === 'announcements' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'announcements' })
          }}
        >
          Announcements
        </Link>

        <Link 
          to='my-profile' 
          className={`${initialState.activePage === 'myProfile' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'myProfile' })
          }}
        >
          My Profile
        </Link>

        <Link 
          to='my-gate-pass' 
          className={`${initialState.activePage === 'myGatePass' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'myGatePass' })
          }}
        >
          My Gate Pass
        </Link>

        <Link 
          to='my-guests' 
          className={`${initialState.activePage === 'myGuests' && 'active'}`}
          onClick={() => {
            dispatch({ type: TOGGLE_NAV })
            dispatch({ type: SET_ACTIVE_PAGE, payload: 'myGuests' })
          }}
        >
          My Guests
        </Link>

        <Link 
          to='#' 
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
          className={`${initialState.activePage === 'logOut' && 'active'}`}
          onClick={() => dispatch({ type: TOGGLE_NAV })}
        >
          Log Out
        </Link>
      </div>
    </section>
  )
}

export default Menu