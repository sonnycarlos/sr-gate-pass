import React from 'react'
import { Link } from 'react-router-dom'

import { 
  BrandLogo,
  Back,
  EyeOn
} from '../../assets/svg/index'

import '../../css/reset_password.css'
import '../../css/style.css'

function ResetPassword() {
  return (
    <section id='reset_password'>
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' />

      {/* Back Button */}
      <Link to='#' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header>
        <h1>Reset Password</h1>
        <p>Your new password must be different from your previous used passwords.</p>
      </header>

      {/* Form */}
      <form>
        <div className='inputFields'>
          <div className='form-group'>
            <label>Password</label>
            
            <div className='input-field'>
              <input 
                type='password'
                placeholder='Your password here'
              />

              <button className='suffix'>
                <EyeOn />
              </button>
            </div>
          </div>
          
          <div className='form-group'>
            <label>Confirm Password</label>
            
            <div className='input-field'>
              <input 
                type='password'
                placeholder='Confirm your password here'
              />

              <button className='suffix'>
                <EyeOn />
              </button>
            </div>
          </div>
        </div>

        <input type='submit' value='Finish' className='solid btn' />
      </form>
    </section>
  )
}

export default ResetPassword