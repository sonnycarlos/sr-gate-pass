import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useSrContext,
  FORGOT_PASSWORD,
  INSERT_ROUTE} from '../../context/index'

import { checkUser, requestOtp } from '../../utils/index'

import { 
  BrandLogo,
  ArrowRight,
  Back,
} from '../../assets/svg/index'

import '../../css/reset_password.css'
import '../../css/style.css'

function ResetPasswordStep1() {
  const [emailAddress, setEmailAddress] = useState('')
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [initialState, dispatch] = useSrContext()

  const navigate = useNavigate()

  // On Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await checkUser({ emailAddress })

    console.log(res)

    if (res.status === 200) {
      console.log(res)
      window.localStorage.setItem('verification', true)

      await dispatch({ type: FORGOT_PASSWORD, payload: emailAddress })
      await requestOtp({ action: 'reset password', receiver: emailAddress })

      navigate('/forgot-password-otp')
    }

    if (res.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage })
    }
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Reset Password'

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routesHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
  }, [])

  return (
    <section id='reset_password'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Back Button */}
      <Link to={`../${initialState?.routeHistory[initialState?.routeHistory?.length - 1]}`} className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header>
        <h1>Reset Password</h1>
        <p>Get started by entering the email address you registered.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='inputFields'>
          <div 
            className='form-group'
            style={{ borderBottom: `${error.isError && '1px solid #C01F28'}` }}
          >
            <label>
              Email Address
              <span className='required-symbol'>*</span>
            </label>
            
            <div className='input-field'>
              <input 
                type='email'
                name='emailAddress'
                placeholder='Your email address here'
                value={emailAddress}
                onChange={e => setEmailAddress(e.target.value)}
              />
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

export default ResetPasswordStep1