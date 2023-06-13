import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'

import { Timer } from '../../components/index'
import { renderer } from '../../utils/index'

import {
  useSrContext,
  COUNTDOWN,
  SET_COUNTDOWN_START,
  INSERT_ROUTE,
  requestOtp,
  verifyOtp
} from '../../context/index'

import {
  BrandLogo,
  Back
} from '../../assets/svg/index'

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

      navigate(initialState?.authRouteDest)
    }

    if (res?.status === 400) {
      setError( { isError: true, errorMessage: res.errorMessage + ' ' })
    }
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Verification'

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

        <input type='submit' value='Login' className='solid btn' />
      </form>
    </section>
  )
}

export default Verification