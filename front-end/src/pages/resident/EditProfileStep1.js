import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { 
  useSrContext,
  UPDATE_PROFILE_DETAILS,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../../context'

import { checkResidentUsername } from '../../utils'

import {
  ArrowRight,
  Back,
  Calendar,
  Camera,
  ChevronDown
} from '../../assets/svg'

import '../../css/edit_profile.css'

function EditProfileStep1() {
  const details = JSON.parse(window.localStorage.getItem('profile'))
  const [inputs, setInputs] = useState({
    firstName: details?.firstName,
    middleName: details?.middleName,
    lastName: details?.lastName,
    gender: details?.gender,
    birthdate: details?.birthdate,
    phoneNumber: details?.phoneNumber,
    username: details?.username
  })
  const [initialState, dispatch] = useSrContext()
  const [error, setError] = useState({ isError: false, errorMessage: '' })

  const navigate = useNavigate()

  // Hande submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (inputs.username !== initialState.user?.profile?.username) {
      let res = await checkResidentUsername({ username: inputs.username })

      if (res.status === 200) {
        dispatch({ type: UPDATE_PROFILE_DETAILS, payload: inputs })
        navigate('/edit-profile-step-2')
      }

      if (res.status === 400) {
        setError({ isError: true, errorMessage: res.errorMessage })
      }
    }
    
    dispatch({ type: UPDATE_PROFILE_DETAILS, payload: inputs })
    navigate('/edit-profile-step-2')
  }

  // Handle scroll
  const handleScroll = () => {
    const header = document.getElementById('header')

    if (window.scrollY > 64) {
      header.style.boxShadow = '0px 4px 16px rgba(139, 139, 139, 0.25)'
    }
    
    if (window.scrollY < 64) {
      header.style.boxShadow = 'none'
    }
  }

  // Use effect
  useEffect(() => {
    document.title = 'Edit Profile'

    let routeHistory = initialState.routeHistory
    dispatch({ type: INSERT_ROUTE, payload: [...routeHistory, 'edit-profile-step-1'] })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'myProfile' })

    async function validate() {
      let token = window.localStorage.getItem('user')
      let res = await validateUser(dispatch, { token })

      if (res?.status === 401) {
        navigate('/login')
      }
    }

    validate()

    console.log(initialState)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id='edit_profile'>
      <header id='header'>
        <div>
          {/* Back Button */}
          <Link to='/my-profile' className='text btn'>
            <Back />
            <span>Back</span>
          </Link>

          {/* Progress Bar */}
          <div id='progress-bar' className='progress-bar'>
            <span className='active bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
        </div>
      </header>

      {/* Heading */}
      <h1>Edit Profile</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>

        <div className='inputFields'>
          <div className='form-group'>
            <label>
              First Name 
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              name='firstName'
              placeholder='Your first name here'
              value={inputs.firstName}
              onChange={e => setInputs({ ...inputs, firstName: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>Middle Name</label>

            <input 
              type='text'
              name='middleName'
              placeholder='Your middle name here'
              value={inputs.middleName}
              onChange={e => setInputs({ ...inputs, middleName: e.target.value })}
            />
          </div>

          <div className='form-group'>
            <label>
              Last Name 
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              name='lastName'
              placeholder='Your last name here'
              value={inputs.lastName}
              onChange={e => setInputs({ ...inputs, lastName: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>
              Date of Birth 
              <span className='required-symbol'>*</span>
            </label>

            <div className='date input-field'>
              <input 
                type='date'
                name='birthdate'
                value={inputs.birthdate}
                onChange={e => setInputs({ ...inputs, birthdate: e.target.value })}
                required
              />

              <span className='suffix'>
                <Calendar />
              </span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              Gender 
              <span className='required-symbol'>*</span>
            </label>

            <div className='select input-field'>
              <select 
                name='gender'
                onChange={e => setInputs({ ...inputs, gender: e.target.value })}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>

              <span className='suffix'>
                <ChevronDown color='#99A8BA' />
              </span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              Phone Number
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              name='phoneNumber'
              placeholder='Your phone number here'
              value={inputs.phoneNumber}
              onChange={e => setInputs({ ...inputs, phoneNumber: e.target.value })}
              required
            />
          </div>

          <div className='form-group'>
            <label>
              Username
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='text'
              name='username'
              placeholder='Your username here'
              value={inputs.username}
              onChange={e => setInputs({ ...inputs, username: e.target.value })}
              required
            />
          </div>
        </div>

        <div 
          id='error-message'
          style={{ display: `${error.isError ? 'block' : 'none'}` }}
        >
          <p>{error.errorMessage}</p>
        </div>

        <div className='actions'>
          <div className='btn-container'>
            <input type='submit' value='Continue' className='solid btn' />
            <ArrowRight color='#FFF' />
          </div>

          <Link to='/my-profile' className='outline btn'>Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default EditProfileStep1