import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { 
  useSrContext,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../../context'

import { formatBirthdate } from '../../utils'

import { Edit } from '../../assets/svg'

import '../../css/my_profile.css'

function MyProfile() {
  const [initialState, dispatch] = useSrContext()

  const navigate = useNavigate()

  // Use effect
  useEffect(() => {
    document.title = 'My Profile'

    console.log(initialState)

    let routeHistory = initialState.routeHistory
    dispatch({ type: INSERT_ROUTE, payload: [...routeHistory, 'my-profile'] })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'myProfile' })

    // async function validate() {
    //   let token = window.localStorage.getItem('user')
    //   let res = await validateUser(dispatch, { token })

    //   if (res?.status === 401) {
    //     navigate('/login')
    //   }
    // }

    // validate()
  }, [])

  return (
    <section id='my_profile'>
      <div className='container'>
        {/* Heading */}
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          My Profile
        </h1>

        {/* Note */}
        {initialState.user?.isProfileRequestApprove === false && (
          <div id='note'>
            <p>Your profile is under review</p>
            <p>You requested to edit your profile and the admin need to approve it first.</p>
          </div>
        )}

        {/* Info */}
        <div className='info'>
          <div className='personalInfo'>
            <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
              Personal Information
            </h2>

            <div className='info-group'>
              <label>Full Name</label>
              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {`${initialState.user?.profile?.firstName} `}
                {initialState.user?.profile?.hasOwnProperty('middleName') && `${initialState.user?.profile?.middleName} `}
                {initialState.user?.profile?.lastName}
              </p>
            </div>

            <div className='info-group'>
              <label>Username</label>
              
              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                @{initialState.user?.profile?.username}
              </p>
            </div>

            <div className='info-group'>
              <label>Birthday</label>

              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {formatBirthdate(initialState.user?.profile?.birthdate)}
              </p>
            </div>

            <div className='info-group'>
              <label>Gender</label>

              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {initialState?.user?.profile?.gender}
              </p>
            </div>

            <div className='info-group'>
              <label>Phone Number</label>

              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {initialState.user?.profile?.phoneNumber}
              </p>
            </div>
          </div>

          <div className='propertyInfo'>
            <h2 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Property Information</h2>

            <div className='info-group'>
              <label>Resident Type</label>

              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {initialState.user?.profile?.type[0]?.toUpperCase() + initialState.user?.profile?.type?.slice(1)}
              </p>
            </div>

            <div className='info-group'>
              <label>Home Address</label>

              <p style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                {initialState.user?.profile?.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      {initialState.user?.isProfileRequestApprove && (
        <Link to='/edit-profile-step-1' className='solid circle btn'>
          <Edit color='#FFF' />
        </Link>
      )}
    </section>
  )
}

export default MyProfile