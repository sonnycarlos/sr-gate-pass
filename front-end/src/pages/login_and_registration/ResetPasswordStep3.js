import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useSrContext,
  SET_AUTH_ROUTE_DEST,
  INSERT_ROUTE,
  resetPassword,
  requestOtp
} from '../../context/index'

import { 
  BrandLogo,
  ArrowRight,
  Back,
  EyeOff,
  EyeOn
} from '../../assets/svg/index'

import '../../css/reset_password.css'
import '../../css/style.css'

function ResetPasswordStep3() {
  const [credentials, setCredentials] = useState({ input1: '', input2: '' })
  const [showPassword, setShowPassword] = useState({ password1: false, password2: false })
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [initialState, dispatch] = useSrContext()

  const navigate = useNavigate()

  // On Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (credentials.input1 !== credentials.input2) {
      setError({ isError: true, errorMessage: `Your passwords doesn't match` })
      return
    }

    let res = await resetPassword({ emailAddress: initialState?.user?.emailAddress, password: credentials.input1 })

    console.log(res)

    if (res.status === 200) {
      console.log(res)
      navigate('/reset-password-successfully')
    }

    if (res.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage })
    }
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Reset Password'

    let routeHistory = initialState?.routeHistory
    dispatch({ type: INSERT_ROUTE, payload: [...routeHistory, 'forgot-password'] })
  }, [])

  return (
    <section id='reset_password'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Back Button */}
      <Link to='/forgot-password-otp' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header>
        <h1>Reset Password</h1>
        <p>Your new password must be different from your previous used passwords.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='inputFields'>
          <div 
            className='form-group'
            style={{ borderBottom: `${error.isError && '1px solid #C01F28'}` }}
          >
            <label>
              Password
              <span className='required-symbol'>*</span>
            </label>
            
            <div className='input-field'>
              <input 
                type={showPassword.password1 ? 'text' : 'password'}
                name='password'
                placeholder='Your password here'
                value={credentials.input1}
                onChange={e => setCredentials({ ...credentials, input1: e.target.value })}
              />

              <a onClick={() => setShowPassword({ ...showPassword, password1: !showPassword.password1 })} className='suffix'>
                {showPassword.password1 ? <EyeOff /> : <EyeOn />}
              </a>
            </div>
          </div>
          
          <div 
            className='form-group'
            style={{ borderBottom: `${error.isError && '1px solid #C01F28'}` }}
          >
            <label>
              Password
              <span className='required-symbol'>*</span>
            </label>
            
            <div className='input-field'>
            <input 
                type={showPassword.password2 ? 'text' : 'password'}
                name='confirm-password'
                placeholder='Confirm your password here'
                value={credentials.input2}
                onChange={e => setCredentials({ ...credentials, input2: e.target.value })}
              />

              <a onClick={() => setShowPassword({ ...showPassword, password2: !showPassword.password2 })} className='suffix'>
                {showPassword.password2 ? <EyeOff /> : <EyeOn />}
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
      </form>
    </section>
  )
}

export default ResetPasswordStep3