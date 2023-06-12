import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'

import {
  BrandLogo,
  ArrowRight,
  Back
} from '../../assets/svg/index'

import '../../css/reset_password.css'

function ResetPasswordOtp() {
  const [otp, setOtp] = useState('');
  
  // Use Effect
  useEffect(() => {
    document.title = 'Reset Password'
  }, [])

  return (
    <section id='reset_password'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Back Button */}
      <a href='./login' className='text btn'>
        <Back />
        <span>Back</span>
      </a>

      {/* Header */}
      <header>
        <h1>Reset Password</h1>
        <p>Enter the OTP code we sent to <span>sonnycarlos@gmail.com</span></p>
      </header>

      {/* Form */}
      <form>
        <div className='form-group'>
          <label>
            OTP Code
            <span className='required-symbol'>*</span>
          </label>

          <div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              inputStyle='inputStyle'
              numInputs={6}
              separator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>

        <p className='resendCodeLink'>
          Didn't get the code? 
          <button className='text btn'>Resend it now.</button>
        </p>

        <div className='btn-container'>
          <input type='submit' value='Continue' className='solid btn' />
          <ArrowRight color='#FFF' />
        </div>
      </form>
    </section>
  )
}

export default ResetPasswordOtp