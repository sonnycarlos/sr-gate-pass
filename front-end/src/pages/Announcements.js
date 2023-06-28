import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSrContext } from '../context'

import { Pin } from '../assets/svg'

import '../css/announcements.css'

function Announcements({ forwardRef }) {
  const [initialState, dispatch] = useSrContext()

  // Use effect
  useEffect(() => {
    document.title = 'Announcements'

    // Set the height of images
    let imagesContainer = document.getElementsByClassName('imageContainer')
    let width = parseInt(document.getElementById('images').offsetWidth) / 2
    
    for (let i = 0; i < imagesContainer.length; i++) {
      imagesContainer[i].style.height = `${width}px`
    }
  }, [])

  return (
    <section ref={forwardRef} id='announcements'>
      <div className='container'>
        {/* Heading */}
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Announcements
        </h1>

        {/* List */}
        <div className='list'>
          <Link to='#' className='item'>
            <span className='pin'>
              <Pin />
            </span>

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
          </Link>

          <Link to='#' className='item'>
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
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Announcements