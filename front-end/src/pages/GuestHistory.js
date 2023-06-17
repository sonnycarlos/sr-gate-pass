import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowDownRight, Back } from '../assets/svg'

import '../css/guest_history.css'

function GuestHistory() {
  const [bookingHistory, setBookingHistory] = useState([
    { date: 'September 24', time: '12:00 PM' },
    { date: 'September 22', time: '1:01 PM' },
    { date: 'September 14', time: '9:26 PM' },
    { date: 'September 13', time: '11:08 PM' },
    { date: 'September 10', time: '4:24 PM' },
    { date: 'September 8', time: '1:27 PM' },
    { date: 'August 20', time: '2:52 PM' },
    { date: 'August 14', time: '5:16 PM' },
    { date: 'July 5', time: '11:04 PM' }
  ])
  const [logsHistory, setLogsHistory] = useState([
    { 
      date: 'September 24', 
      isOpen: true,
      logs: ['4:02 PM', '2:16 PM']
    },
    { 
      date: 'September 22', 
      isOpen: false,
      logs: ['5:26 PM']
    },
    { 
      date: 'September 14', 
      isOpen: false,
      logs: ['4:02 PM', '2:16 PM']
    },
    { 
      date: 'September 13', 
      isOpen: false,
      logs: ['4:02 PM', '2:16 PM']
    },
    { 
      date: 'September 10', 
      isOpen: false,
      logs: ['7:40 PM']
    },
    { 
      date: 'September 8', 
      isOpen: false,
      logs: ['4:37 PM']
    },
    { 
      date: 'August 20', 
      isOpen: false,
      logs: ['6:17 PM']
    },
    { 
      date: 'August 14', 
      isOpen: false,
      logs: ['9:24 PM']
    }
  ])

  // Use effect
  useEffect(() => {
    document.title = 'Guest History'
  }, [])

  return (
    <section id='guest_history'>
      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Heading */}
      <h1>Guest History</h1>

      {/* Tabs */}
      <div id='tabs'>
        <div className='active tab'>
          <p>Booking History</p>
          <span></span>
        </div>

        <div className='tab'>
          <p>Logging History</p>
          <span></span>
        </div>
      </div>

      {/* Booking History List */}
      <div className='bookingHistory list'>
        {bookingHistory.map(({ date, time }) => (
          <div className='item'>
            <p className='date'>{date}</p>
            <p className='time'>{time}</p>
          </div>
        ))}
      </div>

      {/* Logs History List */}
      <div className='logsHistory hidden list'>
        {logsHistory.map(({ date, isOpen, logs }) => (
          <div className='item'>
            <div className='dateAndTime'>
              <p className='date'>{date}</p>

              {logs.length > 1 ? (<ArrowDownRight color='#1E1E1E' />) : (<p className='time'>{logs[0]}</p>)}
            </div>

            {isOpen && (
              <div className='logs'>
                {logs.map(log => (
                  <p className='time'>{log}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default GuestHistory