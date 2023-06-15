import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useSrContext,
  SET_AUTH_ROUTE_DEST,
  INSERT_ROUTE,
  registerUser,
  requestOtp
} from '../../context/index'

import { validateUser } from '../../utils/index'

import { 
  BrandLogo,
  ArrowRight,
  EyeOff,
  EyeOn
} from '../../assets/svg/index'

import '../../css/login_and_registration.css'
import '../../css/style.css'

function Registration() {
  const [credentials, setCredentials] = useState({ emailAddress: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [, dispatch] = useSrContext()

  const navigate = useNavigate()

  // On Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await registerUser(dispatch, { type: 'resident', emailAddress: credentials.emailAddress, password: credentials.password })

    console.log(res)

    if (res.status === 201) {
      console.log(res)
      window.localStorage.setItem('verification', true)

      dispatch({ type: SET_AUTH_ROUTE_DEST, payload: '/login' })
      await requestOtp({ action: 'registration', receiver: credentials.emailAddress })

      navigate('/verification')
    }

    if (res.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage })
    }
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Registration'

    localStorage.removeItem('verification')

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routesHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    routeHistory.push('registration')
    document.cookie = `routesHistory=${routeHistory}`

    dispatch({ type: INSERT_ROUTE, payload: routeHistory })

    async function validate() {
      let loggedIn = window.localStorage.getItem('loggedIn')

      if (loggedIn) {
        let res = await validateUser()

        if (res?.status === 200) {
          navigate('/home')
        }
      } else {
        document.cookie = 'token=; Max-Age=0;secure'
      }
    }

    validate()
  }, [])

  return (
    <section id='login_and_registration'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Header */}
      <header>
        <h1>Register</h1>
        <p>Start your journey with us! Create your account for free.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='inputFields'>
          <div className='form-group'>
            <label>
              Email Address
              <span className='required-symbol'>*</span>
            </label>

            <input 
              type='email'
              name='emailAddress'
              placeholder='Your email address here'
              value={credentials.emailAddress}
              onChange={e => setCredentials({ ...credentials, emailAddress: e.target.value })}
              style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
            />
          </div>

          <div className='form-group'>
            <label>
              Password
              <span className='required-symbol'>*</span>
            </label>
            
            <div 
              className='input-field'
              style={{ borderBottom: `${error.isError && '1px solid #C01F28'}` }}
            >
              <input 
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Your password here'
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              />

              <a onClick={() => setShowPassword(!showPassword)} className='suffix'>
                {showPassword ? <EyeOff /> : <EyeOn />}
              </a>
            </div>
          </div>
        </div>

        <div 
          id='error-message'
          style={{ display: `${error.isError ? 'block' : 'none'}` }}
        >
          <p>{error.errorMessage}</p>
        </div>

        <div className='btn-container'>
          <input type='submit' value='Continue' className='solid btn' />
          <ArrowRight color='#FFF' />
        </div>

        <div className='loginLink'>
          <p>Already have an account? <Link to='/login'>Log in now!</Link></p>
        </div>
      </form>
    </section>
  )
}

export default Registration