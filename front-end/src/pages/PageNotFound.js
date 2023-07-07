import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSrContext } from '../context'

import { 
  BadgeSad
} from '../assets/svg'

import '../css/status.css'
import '../css/style.css'

function PageNotFound() {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  
  // Handle click
  const handleClick = (e) => {
    e.preventDefault()
    console.log('Hitted')
    navigate(`../${initialState.routeHistory[initialState.routeHistory.length - 1]}`)
  }

  // Use effect
  useEffect(() => {
    document.title = 'Page Not Found'

    console.log(initialState.routeHistory[initialState.routeHistory.length - 1])
  }, [])

  return (
    <section id='status'>
      <img src={BadgeSad} alt='Badge' />

      <div>
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Oops! Page not found
        </h1>
        
        <p>The page you are looking for doesn't exist or have been removed.</p>
      </div>

      <div className='actions'>
        <Link onClick={e => handleClick(e)} className='solid btn'>Go back</Link>
      </div>
    </section>
  )
}

export default PageNotFound