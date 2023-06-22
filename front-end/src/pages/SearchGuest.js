import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSrContext } from '../context'

import { Back, Search } from '../assets/svg'

import '../css/search_guest.css'

function SearchGuest() {
  const [initialState, dispatch] = useSrContext()

  // Use effect
  useEffect(() => {
    document.title = 'Search Guest'
  }, [])

  return (
    <section id='search_guest'>
      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Heading */}
      <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
        Search Guest
      </h1>

      {/* Search Bar */}
      <div className='searchBar form-group'>
        <label>Name of Guest</label>

        <div className='input-field'>
          <span className='prefix'>
            <Search />
          </span>

          <input type='text' placeholder='Search guest' />
        </div>
      </div>

      {/* Result */}
      <div className='result'>
        <div className='item'>
          <div className='nameAndContactNum'>
            <p 
              style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
              className='name'
            >
              Tony Parker
            </p>
            
            <p className='contactNum'>09123456789</p>
          </div>

          <p 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className='log'
          >
            Yesterday at 10:00 AM
          </p>
        </div>

        <div className='item'>
        <div className='nameAndContactNum'>
            <p 
              style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
              className='name'
            >
              Tony Parker
            </p>
            
            <p className='contactNum'>09123456789</p>
          </div>

          <p 
            style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
            className='log'
          >
            Yesterday at 10:00 AM
          </p>
        </div>
      </div>
    </section>
  )
}

export default SearchGuest