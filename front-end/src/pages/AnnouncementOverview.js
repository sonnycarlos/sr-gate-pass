import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSrContext } from '../context'

import {
  Back,
  Pin
} from '../assets/svg'

import '../css/announcement_overview.css'

function AnnouncementOverview() {
  const [initialState, dispatch] = useSrContext()
  
  // Use effect
  useEffect(() => {
    document.title = 'Announcement Overview'

    // Set the height of images
    const imagesContainer = document.getElementsByClassName('imageContainer')
    const width = parseInt(document.getElementById('images').offsetWidth) / 2
    
    for (let i = 0; i < imagesContainer.length; i++) {
      imagesContainer[i].style.height = `${width}px`
    }
  }, [])

  return (
    <section id='announcement_overview'>
      <div className='container'>
        {/* Back Button */}
        <Link to='#' className='text btn'>
          <Back />
          <span>Back</span>
        </Link>

        {/* Header */}
        <header>
          <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
            Announcement
          </h1>

          <div className='pin'>
            <Pin />
          </div>
        </header>

        {/* Content */}
        <div className='content'>
          <div className='titleAndDate'>
            <h2 
              style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}
              className='title'
            >
              Vivamus vulputate aliquet quam, nec
            </h2>

            <p className='date'>Yesterday at 10:00 AM</p>
          </div>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non blandit tortor. Ut fringilla scelerisque neque, in accumsan quam aliquam vulputate.</p>

          <div id='images' className='images'>
            <div className='imageContainer'></div>
            <div className='imageContainer'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnnouncementOverview