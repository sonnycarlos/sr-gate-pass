import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { 
  useSrContext,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE
} from '../context'

import { fetchGuest, unlockGatePass } from '../utils'

import { Map, BadgeMeh } from '../assets/svg'

import '../css/gate_pass.css'

function GatePass() {
  const { id } = useParams()
  const [initialState, dispatch] = useSrContext()
  const [guest, setGuest] = useState({
    _id: '',
    host: '',
    name: '',
    phoneNumber: '',
    dateBooked: [],
    timeArrived: [],
    qrCodeImage: '',
    pin: '',
    urlLink: ''
  })
  const [pin, setPin] = useState('')
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [isUnlock, setIsUnlock] = useState(false)
  const [isExpire, setIsExpire] = useState(false)
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [greetText, setGreetText] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await unlockGatePass({ id, pin })

    if (res.status === 200) {
      setIsUnlock(true)

      // Fetch guest
      async function getGuest() {
        const res = await fetchGuest({ id })
        console.log(res.data)
        setGuest(res.data)
        window.localStorage.setItem('guest', JSON.stringify(res.data))

        console.log(res.data)

        const today = new Date()
        const timeDiff = today - new Date(res.data.dateBooked[res.data?.dateBooked?.length - 1])
        const hoursDiff = timeDiff / (1000 * 60 * 60)

        // Check if the gate pass is still valid (within 24 hours)
        if (hoursDiff <= 24) {
          setIsExpire(false)
        } else {
          setIsExpire(true)
        }
      }

      getGuest()
    }

    if (res.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage })
      setPin('')
    }
  }

  // Format date
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  // Use effect
  useEffect(() => {
    document.title = 'Gate Pass'

    const routeHistory = initialState.routeHistory
    dispatch({ type: INSERT_ROUTE, payload: [...routeHistory, 'my-gate-pass'] })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'myGatePass' })

    console.log(details)

    const determineTimeOfDay = () => {
      const currentHour = new Date().getHours()
      var greetText

      if (currentHour >= 5 && currentHour < 12) {
        greetText = 'Good morning'
      } else if (currentHour >= 12 && currentHour < 18) {
        greetText = 'Good afternoon'
      } else {
        greetText = 'Good evening'
      }

      setGreetText(greetText)
    }

    determineTimeOfDay()

    const interval = setInterval(() => {
      setCurrentDate(new Date())
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section id='my_gate_pass'>
      {isExpire ? (
        <div className='status'>
          {/* Badge */}
          <img src={BadgeMeh} alt='Badge' />
          
          {/* Heading & Paragraph */}
          <div>
            <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Gate Pass Expired
            </h2>

            <p>This gate pass is expired</p>
          </div>
        </div>
      ) : (
        <>
          {/* Container */}
          <div className='container'>
          {/* Modal */}
          {!isUnlock && (<div className='modal'>
            <form onSubmit={handleSubmit}>
              <div className='headingAndSubtitle  '>
                <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                  Enter the pin
                </h1>
                
                <p>Enter the pin to open this gate pass.</p>
              </div>

              <div className='form-group'>
                <label>Pin</label>
                <input 
                  type='text' 
                  placeholder='Enter pin'
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  maxLength='6'
                  style={{ borderBottom: `${error.isError && '1px solid #C01F28'}` }}
                />
              </div>

              <div 
                id='error-message'
                style={{ display: `${error.isError ? 'block' : 'none'}` }}
              >
                <p>{error.errorMessage}</p>
              </div>

              <input type='submit' value='Unlock' className='solid btn' />
            </form>
          </div>)}

          {/* Name & Host */}
          <div className='nameAndHost'>
            <h1 
              style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
              className='name'
            >
              {guest?.name}
            </h1>
            
            <p className='host'>
              Booked by <span style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} >{guest?.host?.firstName + ' ' + guest?.host?.lastName}</span> | {guest?.bookingNumber}
            </p>
          </div>

          {/* QR Code */}
          <div 
            style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/image/upload/v1687096624/${details?.qrCodeImage}')` }}
            className='qrCodeImage'
          >
          </div>

          {/* Greeting */}
          <div className='greetings'>
            <p className='greet'>{`${greetText}!`}</p>
            <p className='time'>{currentTime.toLocaleTimeString()}</p>
            <p className='date'>{formattedDate}</p>
          </div>

          {/* Action */}
          <Link to='/guest-map' className='solid btn' >
            <Map color='#FFF' />
          </Link>
        </div>
      </>
      )}
    </section>
  )
}

export default GatePass