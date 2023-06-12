import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Back, Plus } from '../assets/svg/index'

import '../css/guests_history.css'

function GuestsHistory() {
  const [items, setItems] = useState([
    { date: 'Yesterday', count: 20 },
    { date: 'September 23', count: 20 },
    { date: 'September 22', count: 11 },
    { date: 'September 21', count: 12 },
    { date: 'September 20', count: 20 },
    { date: 'September 19', count: 21 },
    { date: 'September 18', count: 14 },
    { date: 'September 17', count: 34 },
    { date: 'September 16', count: 22 },
    { date: 'September 15', count: 19 },
    { date: 'September 14', count: 8 },
    { date: 'September 13', count: 16 },
    { date: 'September 12', count: 10 },
    { date: 'September 11', count: 26 },
    { date: 'September 10', count: 19 }
  ])

  // Use Effect
  useEffect(() => {
    document.title = 'Guests History'
  }, [])

  return (
    <section id='guests_history'>
      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Heading */}
      <h1>Guests History</h1>

      {/* Number of Guests */}
      <div className='numOfGuests'>
        <p className='count'>40 guests</p>
        <p>as of today</p>
      </div>

      {/* List */}
      <div className='list'>
        {items.map(({ date, count}) => (
          <div className='item'>
            <p className='date'>{date}</p>
            <p className='count'>{count}</p>
          </div>
        ))}
      </div>

      {/* Action */}
      <Link to='#' className='solid circle btn'>
        <Plus color='#FFF' />
      </Link>
    </section>
  )
}

export default GuestsHistory