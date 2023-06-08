import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { Link } from 'react-router-dom'

import {
  BrandLogo,
  Back
} from '../../assets/svg/index'

import '../../css/verification.css'

function Verification() {
  const [otp, setOtp] = useState('');
  
  return (
    <section id='verification'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Back Button */}
      <Link to='./login' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header>
        <h1>Verification</h1>
        <p>Check your email address and input the OTP code to login.</p>
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

        <input type='submit' value='Login' className='solid btn' />
      </form>
    </section>
  )
}

export default Verification