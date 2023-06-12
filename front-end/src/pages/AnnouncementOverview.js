import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../components/index'

import {
  Back,
  Pin
} from '../assets/svg/index'

import '../css/announcement_overview.css'

function AnnouncementOverview() {
  // Use Effect
  useEffect(() => {
    document.title = 'Announcement Overview'

    // Set the height of images
    let imagesContainer = document.getElementsByClassName('imageContainer')
    let width = parseInt(document.getElementById('images').offsetWidth) / 2
    
    for (let i = 0; i < imagesContainer.length; i++) {
      imagesContainer[i].style.height = `${width}px`
    }
  }, [])

  return (
    <section id='announcement_overview'>
      {/* Menu */}
      {/* <Menu /> */}
      
      {/* Navigation Bar */}
      <NavigationBar />

      <div className='container'>
        {/* Back Button */}
        <Link to='#' className='text btn'>
          <Back />
          <span>Back</span>
        </Link>

        {/* Header */}
        <header>
          <h1>Announcement</h1>

          <div className='pin'>
            <Pin />
          </div>
        </header>

        {/* Content */}
        <div className='content'>
          <div className='titleAndDate'>
            <h2 className='title'>Vivamus vulputate aliquet quam, nec</h2>
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