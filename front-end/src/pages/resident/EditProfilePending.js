import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { 
  useSrContext,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../../context'

import { 
  BadgeHappy
} from '../../assets/svg'

import '../../css/status.css'

function EditProfilePending() {
  const [initialState, dispatch] = useSrContext()
  const navigate = useNavigate()

  // Handle click
  const handleClick = () => {
    window.location.href = window.location.href
    window.location.assign('/my-profile')
  }

  // Use effect
  useEffect(() => {
    document.title = 'Editing Profile Pending'

    let routeHistory = initialState.routeHistory
    dispatch({ type: INSERT_ROUTE, payload: [...routeHistory, 'edit-profile-step-pending'] })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'myProfile' })

    async function validate() {
      let token = window.localStorage.getItem('user')
      let res = await validateUser(dispatch, { token })

      if (res?.status === 401) {
        navigate('/login')
      }
    }

    validate()
  }, [])

  return (
    <section id='status'>
      {/* Badge */}
      <img src={BadgeHappy} alt='Badge' />

      {/* Heading & Paragraph */}
      <div>
        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
          Your request to edit your profile has been sent!
        </h1>
        
        <p>Thank you! Your request will be reviewed by the admin. Just wait for a while and you will receive a text message and email for the response of your request.</p>
      </div>

      {/* Action */}
      <Link onClick={handleClick} className='solid btn'>Finish</Link>
    </section>
  )
}

export default EditProfilePending