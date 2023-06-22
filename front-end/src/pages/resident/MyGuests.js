import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { 
  useSrContext
} from '../../context'

import {
  ArrowDownRight,
  Plus,
  Search
} from '../../assets/svg'

import '../../css/my_guests.css'

function MyGuests() {
  const [initialState, dispatch] = useSrContext()

  const [items, setItems] = useState([
    {
      date: 'November 2',
      guestsCount: 2,
    },
    {
      date: 'November 1',
      guestsCount: 2,
    },
    {
      date: 'October 29',
      guestsCount: 6,
    }
  ])

  // Use effect
  useEffect(() => {
    document.title = 'My Guests'
  }, [])

  return (
    <section id='my_guests'>
      {/* Heading */}
      <h1 
        style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
        id='heading'
      >
        My Guests
      </h1>

      {/* List */}
      <div className='list'>
        <div>
          <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
            This week
          </h2>

          <div className='items'>
            <div className='item'>
              <div>
                <div className='dateAndGuestsCount'>
                  <p className='date'>Yesterday</p>
                  <p className='guestsCount'>3 Guests</p>
                </div>

                <span className='opened action'>
                  <ArrowDownRight color='#1E1E1E' />
                </span>
              </div>

              <div className='content'>
                <div>
                  <div className='nameAndContactNum'>
                    <p className='name'>Tony Parker</p>
                    <p className='contactNum'>09123456789</p>
                  </div>

                  <p className='time'>10:00 pm</p>
                </div>

                <div>
                  <div className='nameAndContactNum'>
                    <p className='name'>Tony Parker</p>
                    <p className='contactNum'>09123456789</p>
                  </div>

                  <p className='time'>10:00 pm</p>
                </div>
              </div>
            </div>

            {items.map(({date, guestsCount}) => (
              <div className='item'>
                <div>
                  <div className='dateAndGuestsCount'>
                    <p className='date'>{date}</p>
                    <p className='guestsCount'>{guestsCount} Guests</p>
                  </div>

                  <span className='closed action'>
                    <ArrowDownRight color='#1E1E1E' />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Last week</h2>

          <div className='items'>
            {items.map(({date, guestsCount}) => (
              <div className='item'>
                <div>
                  <div className='dateAndGuestsCount'>
                    <p className='date'>{date}</p>
                    <p className='guestsCount'>{guestsCount} Guests</p>
                  </div>

                  <span className='closed action'>
                    <ArrowDownRight color='#1E1E1E' />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='actions'>
        <Link to='#' className='outline btn'>
          <Search color='#1E1E1E' />
        </Link>

        <Link to='#' className='solid btn'>
          <Plus color='#FFF' />
        </Link>
      </div>
    </section>
  )
}

export default MyGuests