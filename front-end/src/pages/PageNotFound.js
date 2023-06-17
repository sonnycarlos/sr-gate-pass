import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { 
  BadgeSad
} from '../assets/svg'

import '../css/status.css'
import '../css/style.css'

function PageNotFound() {
  
  // Use effect
  useEffect(() => {
    document.title = 'Page Not Found'
  }, [])

  return (
    <section id='status'>
      <img src={BadgeSad} alt='Badge' />

      <div>
        <h1>Oops! Page not found</h1>
        <p>The page you are looking for doesn't exist or have been removed.</p>
      </div>

      <div className='actions'>
        <Link to='/login' className='solid btn'>Go back</Link>
      </div>
    </section>
  )
}

export default PageNotFound