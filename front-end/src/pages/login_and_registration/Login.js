import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useSrContext,
  KEEP_ME_LOGGED_IN,
  SET_AUTH_ROUTE_DEST,
  logInUser,
  requestOtp,
  validateUser
} from '../../context/index'

import { 
  BrandLogo,
  ArrowRight,
  EyeOff,
  EyeOn
} from '../../assets/svg/index'

import '../../css/login_and_registration.css'
import '../../css/style.css'

function Login() {
  const [credentials, setCredentials] = useState({ emailAddress: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false)
  const [, dispatch] = useSrContext()

  const navigate = useNavigate()

  // On Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await logInUser(dispatch, { emailAddress: credentials.emailAddress, password: credentials.password })

    if (res.status === 200) {
      if (keepMeLoggedIn) {
        dispatch({ type: KEEP_ME_LOGGED_IN })
      }

      console.log(res)
      dispatch({ type: SET_AUTH_ROUTE_DEST, payload: '/home' })

      await requestOtp({ action: 'registration', receiver: credentials.emailAddress })
      navigate('/verification')
    }

    if (res.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage })
    }
  }
  
  // Use Effect
  useEffect(() => {
    document.title = 'Login'

    async function validate() {
      let loggedIn = window.localStorage.getItem('loggedIn')

      if (loggedIn) {
        let res = await validateUser()

        if (res?.status === 200) {
          navigate('/home')
        }
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
        <h1>Welcome</h1>
        <p>Get started by entering the email address you registered.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='inputFields'>
          <div className='form-group'>
            <label>Email Address</label>
            
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
            <label>Password</label>
            
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

        <div>
          <div className='form-check'>
            <input 
              type='checkbox' 
              checked={keepMeLoggedIn}
              onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
            />
            <p>Keep me sign in</p>
          </div>

          <Link to='#'>Forgot Password</Link>
        </div>

        <div 
          id='error-message'
          style={{ display: `${error.isError ? 'block' : 'none'}` }}
        >
          <p>
            {error.errorMessage} If you don’t remember your credentials,
            <a href='#' className='text btn'>reset it now.</a>
          </p>
        </div>

        <div className='btn-container'>
          <input type='submit' value='Continue' className='solid btn' />
          <ArrowRight color='#FFF' />
        </div>

        <div className='registrationLink'>
          <p>Don't have an account? <Link to='/registration'>Register for free!</Link></p>
        </div>
      </form>
    </section>
  )
}

export default Login