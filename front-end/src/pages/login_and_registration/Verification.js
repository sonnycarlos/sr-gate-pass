import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'

import { Timer } from '../../components'

import {
  useSrContext,
  COUNTDOWN,
  SET_COUNTDOWN_START,
  INSERT_ROUTE
} from '../../context'

import { 
  renderer, 
  requestOtp,
  verifyOtp 
} from '../../utils'

import {
  BrandLogo,
  Back
} from '../../assets/svg'

import '../../css/verification.css'

function Verification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [initialState, dispatch] = useSrContext()

  const navigate = useNavigate()

  // Resend OTP Code
  const resendOtpCode = async (e) => {
    e.preventDefault()
    dispatch({ type: SET_COUNTDOWN_START, payload: true })
    await requestOtp({ action: 'verification', receiver: initialState.user.emailAddress })
  }

  // On Change
  const onChange = (otp) => setOtp(otp)

  // On Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await verifyOtp({ emailAddress: initialState?.user?.emailAddress, otpCode: otp })

    if (res?.status === 200) {
      if (initialState?.keepMeLoggedIn) {
        window.localStorage.setItem('loggedIn', true)
        window.localStorage.setItem('user', initialState?.user?.token)
      }

      if (initialState?.action === 'Log in') {
        if (initialState?.user?.isVerify) {
          if (initialState?.user?.isValidate) {
            return navigate('/home')
          } else {
            return navigate('/account-creation-pending')
          }
        }

        return navigate('/onboarding-step-1')
      }

      if (initialState?.action === 'Register') {
        return navigate('/login')
      }
    }

    if (res?.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage + ' ' })
    }
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Verification'

    console.log(initialState)

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routesHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
    
    if (!window.localStorage.getItem('verification')) {
      navigate('/login')
    }

    if (localStorage.getItem('otp_resend_countdown') != null) {
      dispatch({ type: SET_COUNTDOWN_START, payload: true })
    }
  }, [])
  
  return (
    <section id='verification'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Back Button */}
      <Link to={`../${initialState?.routeHistory[initialState?.routeHistory.length - 1]}`} className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header>
        <h1>Verification</h1>
        <p>Check your email address and input the OTP code to login.</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>
            OTP Code
            <span className='required-symbol'>*</span>
          </label>

          <div>
            <OtpInput
              value={otp}
              onChange={onChange}
              inputStyle={`${error.isError ? 'inputStyleError' : 'inputStyle'}`}
              numInputs={6}
              separator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>

        <p 
          className='resendCodeLink'
          style={{ color: `${error.isError && '#C01F28'}` }}
        >
          {error.isError && error.errorMessage} 
          Didn't get the code? 
          
          {initialState.countdownStart
            ?
          <Timer 
                countdownName='otp_resend_countdown' 
                delay={COUNTDOWN} 
                renderer={renderer} 
                start={initialState.countdownStart} 
                dispatch={dispatch}
              /> 
                : 
          <a onClick={resendOtpCode} className='text btn'>Resend it now.</a>
          }
        </p>

        <input type='submit' value={initialState?.action} className='solid btn' />
      </form>
    </section>
  )
}

export default Verification