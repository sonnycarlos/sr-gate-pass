import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../../components/index'

import {
  Guest,
  MegaphoneEmoji,
  Add,
  ChevronDown,
  Pin,
  Megaphone,
  Users
} from '../../assets/svg/index'

import '../../css/home.css'

function Home() {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)

  // Handle Date Change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Home'
  }, [])
  
  return (
    <section id='home'>
      {/* Menu */}
      {/* <Menu /> */}
      
      {/* Navigation Bar */}
      <NavigationBar />

      <div className='container'>
        {/* Heading */}
        <h1>Welcome, Sonny!</h1>

        {/* Guests */}
        <div className='guests stack'>
          <img src={Guest} alt='Vector' className='vector' />

          <div>
            <div className='form-group'>
              <div className='date input-field'>
                <input 
                  type='date' 
                  value={selectedDate}
                  placeholder='Today' 
                  onChange={handleDateChange}
                  id='logDate'
                />

                <span className='suffix'>
                  <ChevronDown color='#1E1E1E' />
                </span>
              </div>
            </div>

            <Link className='text btn'>
              <Add color='#FFF' />

              <span>Book Guest</span>
            </Link>
          </div>

          <p>
            <span>40 guests</span>
            <span>as of today</span>
          </p>
        </div>

        {/* Announcements */}
        <div className='announcements'>
          <div className='stack'>
            <div className='header'>
              <h2>
                Announcement
                <img src={MegaphoneEmoji} alt='Emoji' />
              </h2>

              <div>
                <Pin color='#5CB950' />
                <span className='badge'>1</span>
                <Link className='text btn'>See More</Link>
              </div>
            </div>

            <div className='content'>
              <div className='titleAndDate'>
                <h3 className='title'>Vivamus vulputate aliquet quam, nec </h3>
                <p className='date'>Yesterday at 10:00 AM</p>
              </div>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non blandit tortor. Ut fringilla scelerisque neque, in accumsan quam aliquam vulputate.</p>
            </div>
          </div>

          <div className='stack'></div>
          <div className='stack'></div>
        </div>

        {/* Notifications */}
        <div className='notifications stack'>
          <div className='header'>
            <h2>Notifications</h2>

            <div>
              <span className='badge'>4</span>
              <Link className='text btn'>See More</Link>
            </div>
          </div>

          <div className='list'>
            <Link to='#' className='item'>
              <span className='badge'>
                <Users color='#FFF' />
              </span>

              <div>
                <div className='titleAndDate'>
                  <h3 className='title'>Your Guest</h3>
                  <p className='date'>Today at 9:10 AM</p>
                </div>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              </div>
            </Link>

            <Link className='item'>
              <span className='badge'>
                <Megaphone color='#FFF' />
              </span>

              <div>
                <div className='titleAndDate'>
                  <h3 className='title'>Announcement</h3>
                  <p className='date'>Today at 9:10 AM</p>
                </div>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              </div>
            </Link>

            <Link className='item'>
              <span className='badge'>
                <Users color='#FFF' />
              </span>

              <div>
                <div className='titleAndDate'>
                  <h3 className='title'>Your Guest</h3>
                  <p className='date'>Today at 9:10 AM</p>
                </div>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home