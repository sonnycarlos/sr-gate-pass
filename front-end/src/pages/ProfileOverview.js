import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  useSrContext,
  INSERT_ROUTE,
  validateUser
} from '../context'

import {
  fetchGuest,
  fetchResident,
  formatBytes,
  formatDate,
  formatTime
} from '../utils'

import { 
  ArrowDownRight, 
  Back, 
  Download,
  Edit,
  PDF,
  Picture
} from '../assets/svg'

import '../css/profile_overview.css'

function ProfileOverview() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [initialState, dispatch] = useSrContext()
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [resident, setResident] = useState({
    _id: '',
    name: '',
    birthdate: '',
    gender: '',
    phoneNumber: '',
    address: '',
    type: '',
    username: '',
    emailAddress: '',
    dateRegistered: '',
    dateEdited: [],
    landCertificate: [],
    validId: [],
    picture: [],
    qrCodeImage: []
  })
  const [guest, setGuest] = useState({
    _id: '',
    host: { picture: [] },
    name: '',
    phoneNumber: '',
    dateBooked: [],
    timeArrived: [],
    qrCodeImage: '',
    pin: '',
    urlLink: ''
  })
  const [bookingHistory, setBookingHistory] = useState([])
  const [loggingHistory, setLoggingHistory] = useState([])
  const [tabActive, setTabActive] = useState('bookingHistory')
  const [openItemId, setOpenItemId] = useState(null)
  const profileType = window.localStorage.getItem('profileType')

  // Download image
  const downloadImage = async (publicId) => {
    const fileUrl = `https://res.cloudinary.com/dfc3s2kfc/image/upload/v1687658461/${publicId}.png`

    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = fileUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  // Download file
  const downloadFile = async (publicId) => {
    const fileUrl = `https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687658461/${publicId}`

    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.download = fileUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  // Use effect
  useEffect(() => {
    if (profileType === 'request') {
      document.title = 'Request Overview'
    } else if (profileType === 'resident') {
      document.title = 'Resident Overview'
    } else if (profileType === 'guest') {
      document.title = 'Guest Overview'
    } else if (profileType === 'worker') {
      document.title = 'Worker Overview'
    }

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routeHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    console.log(tabActive)

    dispatch({ type: INSERT_ROUTE, payload: routeHistory })

    // Validate user
    async function validate() {
      const token = window.localStorage.getItem('user')
      const res = await validateUser(dispatch, { token })

      if (res?.status === 401) {
        navigate('/login')
      }
    }

    // Fetch resident
    async function getResident() {
      const res = await fetchResident({ id })
      setResident(res.data)
      console.log(res.data)
      window.localStorage.setItem('resident', JSON.stringify(res.data))
    }

    // Fetch guest
    async function getGuest() {
      const res = await fetchGuest({ id })
      setGuest(res.data)
      console.log(res.data)
      window.localStorage.setItem('guest', JSON.stringify(res.data))
    }

    validate()

    if (profileType === 'resident') {
      getResident()
    } else if (profileType === 'guest') {
      getGuest()
    }
  }, [])
  
  useEffect(() => {
    // Transformed booking history data
    const transformedBookingHistoryData = guest?.dateBooked.reduce((acc, timestamp) => {
      const dateObj = new Date(timestamp)
      const date = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      })
      const time = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
      const existingDate = acc.find(item => item.date === date)

      if (existingDate) {
        existingDate.time.push(time)
      } else {
        acc.push({ date, time: [time] })
      }
    
      return acc
    }, [])

    // Transformed logging history data
    const transformedLoggingHistoryData = guest?.timeArrived.reduce((acc, timestamp) => {
      const dateObj = new Date(timestamp)
      const date = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      })
      const time = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
      const existingDate = acc.find(item => item.date === date)
      
      if (existingDate) {
        existingDate.time.push(time)
      } else {
        acc.push({ date, time: [time] })
      }
    
      return acc
    }, [])

    setBookingHistory(transformedBookingHistoryData)
    setLoggingHistory(transformedLoggingHistoryData)
  }, [guest])

  return (
    <>
      <section id='profile_overview'>
        {/* Header */}
        <div className='header'>
          <div className='backBtnAndHeading'>
            <Link 
              to={`../${initialState.routeHistory[initialState.routeHistory.length - 1]}`} 
              className='text btn'
            >
              <Back />
              <span>Back</span>
            </Link>

            <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              {profileType === 'request' && 'Request Overview'}
              {profileType === 'resident' && 'Resident Overview'}
              {profileType === 'guest' && 'Guest Overview'}
              {profileType === 'worker' && 'Worker Overview'}
            </h1>
          </div>

          <Link className='solid btn'>
            Edit
            <span><Edit color='#FFF' /></span>
          </Link>
        </div>

        {profileType !== 'guest' && (
          <div>
            {/* About */}
            <div className='about stack'>
              <h2>About Resident</h2>

              <div className='info'>
                <div className='row'>
                  <div className='info-group'>
                    <label>Name</label>
                    <p>
                      {resident.firstName + ' '}
                      {resident.middleName && `${resident.middleName} `}
                      {resident.lastName}
                    </p>
                  </div>
                  
                  <div className='info-group'>
                    <label>Type</label>
                    <p>{resident.type?.charAt(0).toUpperCase() + resident.type?.slice(1)}</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='info-group'>
                    <label>Birthdate</label>
                    <p>{formatDate(resident.birthdate)}</p>
                  </div>
                  
                  <div className='info-group'>
                    <label>Gender</label>
                    <p>{resident.gender?.charAt(0).toUpperCase() + resident.gender?.slice(1)}</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='info-group'>
                    <label>Email Address</label>
                    <p>{resident.emailAddress}</p>
                  </div>
                  
                  <div className='info-group'>
                    <label>Username</label>
                    <p>{resident.username}</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='info-group'>
                    <label>Date Registered</label>
                    <p>{formatDate(resident.dateRegistered) + ' at ' + formatTime(resident.dateRegistered)}</p>
                  </div>
                </div>
              </div>

              <h2>Proof of Residency</h2>

              <div className='info'>
                <div className='row'>
                  <div className='info-group'>
                    <label>Land Certificate</label>
                    
                    {resident.landCertificate?.map((file, i) => (
                      <div key={i} className='file'>
                        <div className='icon-and-info'>
                          <PDF />

                          <div className='info'>
                            <p className='name'>{file?.name}</p>
                            <p className='size'>{formatBytes(file?.size)}</p>
                          </div>
                        </div>
                        

                        <a onClick={() => downloadFile(i, 'validId')}>
                          <Download />
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  <div className='info-group'>
                    <label>Valid ID</label>

                    {resident.validId?.map((file, i) => (
                      <div key={i} className='file'>
                        <div className='icon-and-info'>
                          <Picture />

                          <div className='info'>
                            <p className='name'>{file?.name}</p>
                            <p className='size'>{formatBytes(file?.size)}</p>
                          </div>
                        </div>

                        <a onClick={() => downloadImage(i, 'validId')}>
                          <Download />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='row'>
                <div className='info-group'>
                    <label>2x2 Picture</label>
                    
                    {resident.picture?.map((file, i) => (
                      <div key={i} className='file'>
                        <div className='icon-and-info'>
                          <Picture />

                          <div className='info'>
                            <p className='name'>{file?.name}</p>
                            <p className='size'>{formatBytes(file?.size)}</p>
                          </div>
                        </div>
                        

                        <a onClick={() => downloadImage(i, 'validId')}>
                          <Download />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            <div className='history stack'>
              <h2>History</h2>

              {/* Tabs */}
              <div id='tabs'>
                <div 
                  onClick={() => setTabActive('bookingHistory')}
                  className={`tab ${tabActive === 'bookingHistory' && 'active'}`}
                >
                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                    Booking History
                  </p>

                  <span></span>
                </div>

                <div 
                  onClick={() => setTabActive('loggingHistory')}
                  className={`tab ${tabActive === 'loggingHistory' && 'active'}`}
                >
                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                    Logging History
                  </p>

                  <span></span>
                </div>
              </div>

              {/* Booking History List */}
              <div 
                style={{ display: `${tabActive === 'bookingHistory' ? 'flex' : 'none'}` }}
                className={`bookingHistory list ${tabActive === 'bookingHistory' && 'active'}`}
              >
                {bookingHistory?.map(({ date, time }, i) => {
                  const isItemOpen = date === openItemId

                  return (
                    <div key={i}>
                      <div className='item'>
                        <p
                          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                          className='date'
                        >
                          {date}
                        </p>

                        {time.length > 1 ? (
                          <span 
                            style={{ transform: `${isItemOpen ? 'rotate(-180deg)' : 'none'}` }}
                            onClick={() => setOpenItemId(isItemOpen ? null : date)}
                            className='action'
                          >
                            <ArrowDownRight color='#1E1E1E' />
                          </span>
                        ) : (
                          <p className='time'>
                            {time[0]}
                          </p>
                        )}
                      </div>

                      {time.length > 1 && (
                        <div 
                          style={{ transition: `${tabActive === 'bookingHistory' && '350ms'}` }}
                          className={`content ${isItemOpen ? 'opened' : ''}`}
                        >
                          {time?.map((time, i) => (
                            <p key={i}>
                              {time}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Logging History List */}
              <div 
                style={{ display: `${tabActive === 'loggingHistory' ? 'flex' : 'none'}` }}
                className={`loggingHistory list ${tabActive === 'loggingHistory' && 'active'}`}
              >
                {loggingHistory?.map(({ date, time }, i) => {
                  const isItemOpen = date === openItemId

                  return (
                    <div key={i}>
                      <div className='item'>
                        <p
                          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                          className='date'
                        >
                          {date}
                        </p>

                        {time.length > 1 ? (
                          <span 
                            style={{ transform: `${isItemOpen ? 'rotate(-180deg)' : 'none'}` }}
                            onClick={() => setOpenItemId(isItemOpen ? null : date)}
                            className='action'
                          >
                            <ArrowDownRight color='#1E1E1E' />
                          </span>
                        ) : (
                          <p className='time'>
                            {time[0]}
                          </p>
                        )}
                      </div>

                      {time.length > 1 && (
                        <div 
                          style={{ transition: `${tabActive === 'loggingHistory' && '350ms'}` }}
                          className={`content ${isItemOpen ? 'opened' : ''}`}
                        >
                          {time?.map((time, i) => (
                            <p key={i}>
                              {time}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {profileType === 'guest' && (
          <div>
            {/* About */}
            <div className='about stack'>
              <h2>About Guest</h2>

              <div className='info'>
                <div className='row'>
                  <div className='info-group'>
                    <label>Name</label>
                    <p>{guest.name}</p>
                  </div>
                  
                  <div className='info-group'>
                    <label>Phone Number</label>
                    <p>{guest.phoneNumber}</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='info-group'>
                    <label>Booked Date</label>
                    <p>{formatDate(guest.dateBooked) + ' at ' + formatTime(guest.dateBooked)}</p>
                  </div>
                  
                  <div className='info-group'>
                    <label>Arrived Time</label>
                    <p>{formatTime(guest.dateBooked)}</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='info-group'>
                    <label>Host</label>
                    
                    <div className='profilePictureAndName'>
                      <div 
                        style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${guest?.host?.picture[0]?.name}')` }}
                        className='profilePicture'
                      ></div>

                      <div className='nameAndUsername'>
                        <div className='name'>{guest.host?.firstName + ' ' + guest.host?.lastName}</div>
                        <div className='username'>@{guest.host?.username}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            <div className='history stack'>
              <h2>History</h2>

              {/* Tabs */}
              <div id='tabs'>
                <div 
                  onClick={() => setTabActive('bookingHistory')}
                  className={`tab ${tabActive === 'bookingHistory' && 'active'}`}
                >
                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                    Booking History
                  </p>

                  <span></span>
                </div>

                <div 
                  onClick={() => setTabActive('loggingHistory')}
                  className={`tab ${tabActive === 'loggingHistory' && 'active'}`}
                >
                  <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                    Logging History
                  </p>

                  <span></span>
                </div>
              </div>

              {/* Booking History List */}
              <div 
                style={{ display: `${tabActive === 'bookingHistory' ? 'flex' : 'none'}` }}
                className={`bookingHistory list ${tabActive === 'bookingHistory' && 'active'}`}
              >
                {bookingHistory?.map(({ date, time }, i) => {
                  const isItemOpen = date === openItemId

                  return (
                    <div key={i}>
                      <div className='item'>
                        <p
                          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                          className='date'
                        >
                          {date}
                        </p>

                        {time.length > 1 ? (
                          <span 
                            style={{ transform: `${isItemOpen ? 'rotate(-180deg)' : 'none'}` }}
                            onClick={() => setOpenItemId(isItemOpen ? null : date)}
                            className='action'
                          >
                            <ArrowDownRight color='#1E1E1E' />
                          </span>
                        ) : (
                          <p className='time'>
                            {time[0]}
                          </p>
                        )}
                      </div>

                      {time.length > 1 && (
                        <div 
                          style={{ transition: `${tabActive === 'bookingHistory' && '350ms'}` }}
                          className={`content ${isItemOpen ? 'opened' : ''}`}
                        >
                          {time?.map((time, i) => (
                            <p key={i}>
                              {time}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Logging History List */}
              <div 
                style={{ display: `${tabActive === 'loggingHistory' ? 'flex' : 'none'}` }}
                className={`loggingHistory list ${tabActive === 'loggingHistory' && 'active'}`}
              >
                {loggingHistory?.map(({ date, time }, i) => {
                  const isItemOpen = date === openItemId

                  return (
                    <div key={i}>
                      <div className='item'>
                        <p
                          style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }} 
                          className='date'
                        >
                          {date}
                        </p>

                        {time.length > 1 ? (
                          <span 
                            style={{ transform: `${isItemOpen ? 'rotate(-180deg)' : 'none'}` }}
                            onClick={() => setOpenItemId(isItemOpen ? null : date)}
                            className='action'
                          >
                            <ArrowDownRight color='#1E1E1E' />
                          </span>
                        ) : (
                          <p className='time'>
                            {time[0]}
                          </p>
                        )}
                      </div>

                      {time.length > 1 && (
                        <div 
                          style={{ transition: `${tabActive === 'loggingHistory' && '350ms'}` }}
                          className={`content ${isItemOpen ? 'opened' : ''}`}
                        >
                          {time?.map((time, i) => (
                            <p key={i}>
                              {time}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default ProfileOverview