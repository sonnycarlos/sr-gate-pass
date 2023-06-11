import React from 'react'
import { Link } from 'react-router-dom'

import { axios } from '../../config/index'

import { 
  BrandLogo,
  ArrowRight,
  EyeOn
} from '../../assets/svg/index'

import '../../css/login_and_registration.css'
import '../../css/style.css'

function Login() {
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
      <form>
        <div className='inputFields'>
          <div className='form-group'>
            <label>Email Address</label>
            <input 
              type='email'
              placeholder='Your email address here'
            />
          </div>

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
        </div>

        <div>
          <div className='form-check'>
            <input type='checkbox' />
            <p>Keep me sign in</p>
          </div>

          <Link to='#'>Forgot Password</Link>
        </div>

        <div className='btn-container'>
          <input type='submit' value='Continue' className='solid btn' />
          <ArrowRight color='#FFF' />
        </div>

        <div className='registrationLink'>
          <p>Don't have an account? <Link to='#'>Register for free!</Link></p>
        </div>
      </form>
    </section>
  )
}

export default Login