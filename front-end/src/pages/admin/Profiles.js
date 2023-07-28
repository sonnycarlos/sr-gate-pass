import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

import { 
  useSrContext,
  UPDATE_GUESTS_COUNT,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../../context'

import {
  fetchRequests,
  fetchResidents
} from '../../utils'

import { domain } from '../../constants'

import { 
  Search, 
  MoreHorizontal, 
  Plus,
  User 
} from '../../assets/svg'

import '../../css/profiles.css'

function Profiles() {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const [profiles, setProfiles] = useState([])
  const guestsCount = initialState.guestsCount
  const [chipActive, setChipActive] = useState('residents')
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  // Handle click
  const handleClick = (id) => {
    window.localStorage.setItem('profileType', 'resident')
    navigate(`/profile-overview/${id}`)
  }

  // Load residents
  const loadResidents = async () => {
    setChipActive('residents')
    const res = await fetchResidents({})
      setProfiles(res.data)
  }

  // Load requests
  const loadRequests = async () => {
    setChipActive('requests')
    const res = await fetchRequests({})
      setProfiles(res.data)
  }

  // Use effect
  useEffect(() => {
    document.title = 'Profiles'

    console.log(document.getElementById('items').offsetHeight)
    
    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routeHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    document.cookie = `routeHistory=${routeHistory}`
    routeHistory.push('profiles')
    document.cookie = `routeHistory=${routeHistory}`
    
    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'profiles' })

    window.localStorage.removeItem('verification')

    // Validate user
    async function validate() {
      const token = window.localStorage.getItem('user')
      const res = await validateUser(dispatch, { token })

      console.log(res.data)

      if (res?.status === 401) {
        navigate('/login')
      }

      // Prevent access to this page if not security type
      if (details.type === 'homeowner' || details.type === 'tenant') {
        navigate('../home')
      }
    }

    // Fetch residents
    async function getResidents() {
      const res = await fetchResidents({})
      console.log(res.data)
      setProfiles(res.data)
    }

    validate()
    getResidents()

    // Implement real time
    const socket = io(domain)

    socket.on('guestCount', () => {
      dispatch({ type: UPDATE_GUESTS_COUNT, payload: guestsCount + 1 })
      console.log('Updated')
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <section id='profiles'>
      {/* Header */}
      <div className='header'>
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Profiles
        </h1>

        <Link to='/add-profile' className='solid btn'>
          <span>Add</span>
          <Plus color='#FFF' />
        </Link>
      </div>

      {/* Stack */}
      <div className='stack'>
        <div className='chipsAndSearch'>
          <div id='chips'>
            <div 
              onClick={() => loadResidents()}
              className={`chip ${chipActive === 'residents' && 'active'}`}
            >
              <p>Residents</p>
            </div>
            
            <div 
              onClick={() => setChipActive('workers')}
              className={`chip ${chipActive === 'workers' && 'active'}`}
            >
              <p>Workers</p>
            </div>
            
            <div
              onClick={() => loadRequests()}
              className={`chip ${chipActive === 'requests' && 'active'}`}
            >
              <p>Requests</p>
            </div>
          </div>

          <div className='search'>
            <div className='form-group'>
              <div className='input-field'>
                <span className='prefix'>
                  <Search />
                </span>

                <input 
                  type='text' 
                  placeholder='Search guest' 
                />
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className='list'>
          <div className='header row'>
            <div className='checkBox'></div>

            <div className='resident'>
              <p>Resident</p>
            </div>

            {chipActive !== 'requests' && (
              <div className='gender'>
                <p>Gender</p>
              </div>
            )}

            <div className='emailAddress'>
              <p>Email Address</p>
            </div>

            <div className='address'>
              <p>Address</p>
            </div>

            <div className='type'>
              <p>Type</p>
            </div>

            {chipActive === 'requests' && (
              <div className='status'>
                <p>Status</p>
              </div>
            )}
          </div>

          <div id='items' className='items'>
            {profiles?.slice(0, screenWidth >= 1920 ? 12 : 24)?.map(({ _id, firstName, lastName, gender, address, emailAddress, type, username, picture, isApprove }) => (
              <div 
                key={_id} 
                onClick={() => handleClick(_id)} 
                className='item row'
              >
                <div className='checkBox'>
                  <input type='checkbox' onClick={(e) => e.stopPropagation()} />
                </div>

                <div className='resident'>
                  <div 
                    style={{ backgroundImage: `url('https://res.cloudinary.com/dfc3s2kfc/raw/upload/v1687096624/${picture[0].name}')` }}
                    className='profilePicture'
                  ></div>

                  <div className='nameAndUsername'>
                    <p className='name'>{firstName + ' ' + lastName}</p>
                    <p className='username'>@{username}</p>
                  </div>
                </div>

                {chipActive !== 'requests' && (
                  <div className='gender'>
                    <p>{gender?.charAt(0).toUpperCase() + gender?.slice(1)}</p>
                  </div>
                )}

                <div className='emailAddress'>
                  <p>{emailAddress}</p>
                </div>

                <div className='address'>
                  <p>{address}</p>
                </div>

                <div className='type'>
                  <p>
                    <User color='#1E1E1E' />
                    {type === 'homeowner' ? 'Homeowner' : 'Tenant'}
                  </p>
                </div>

                {chipActive === 'requests' && (
                  <div className='status'>
                    <p style={{ color: isApprove ? '#32A75A' : '#606060' }}>
                      {isApprove === true ? 'Approved' : 'Pending'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div id='pagination'>
          <p>Showing 1 out of {profiles?.length} results</p>

          <div className='actions'>
            <button className='text btn'>Previous</button>
            <button className='active text btn'>1</button>
            <button className='text btn'>2</button>
            <button className='text btn'>3</button>
            <button className='text btn'>4</button>
            <button className='text btn'><MoreHorizontal color='#606060' /></button>
            <button className='text btn'>50</button>
            <button className='text btn'>Next</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profiles