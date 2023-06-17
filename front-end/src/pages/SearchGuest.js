import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Back, Search } from '../assets/svg'

import '../css/search_guest.css'

function SearchGuest() {
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
      <h1>Search Guest</h1>

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
            <p className='name'>Tony Parker</p>
            <p className='contactNum'>09123456789</p>
          </div>

          <p className='log'>Yesterday at 10:00 AM</p>
        </div>

        <div className='item'>
          <div className='nameAndContactNum'>
            <p className='name'>Tony Parker</p>
            <p className='contactNum'>09123456789</p>
          </div>

          <p className='log'>Jul 12 at 12:00 PM</p>
        </div>
      </div>
    </section>
  )
}

export default SearchGuest