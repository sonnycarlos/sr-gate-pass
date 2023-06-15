import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Menu, NavigationBar } from '../../components'

import {
  ArrowRight,
  Back,
  ChevronDown,
  Image,
  PDF,
  Remove,
  Upload
} from '../../assets/svg'

import '../../css/edit_profile.css'

function EditProfileStep3() {
  // Handle Scroll
  const handleScroll = () => {
    const header = document.getElementById('header')

    if (window.scrollY > 64) {
      header.style.boxShadow = '0px 4px 16px rgba(139, 139, 139, 0.25)'
    }
    
    if (window.scrollY < 64) {
      header.style.boxShadow = 'none'
    }
  }

  // Use Effect
  useEffect(() => {
    document.title = 'Edit Profile'

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id='edit_profile'>
      {/* Menu */}
      {/* <Menu /> */}

      {/* Navigation Bar */}
      <NavigationBar />

      <header id='header'>
        <div>
          {/* Back Button */}
          <Link to='#' className='text btn'>
            <Back />
            <span>Back</span>
          </Link>

          {/* Progress Bar */}
          <div id='progress-bar' className='progress-bar'>
            <span className='active bar'></span>
            <span className='active bar'></span>
            <span className='bar'></span>
          </div>
        </div>
      </header>

      {/* Heading */}
      <h1>Edit Profile</h1>

      {/* Form */}
      <form>
        <h2>Proof of Residency</h2>

        <div className='inputFields'>
          <div className='form-group'>
            <label>
              Land Certificate 
              <span className='required-symbol'>*</span>
              <span className='guide'>(or any document to prove)</span>
            </label>

            <div className='input-image-field'>
              <input type='file' accept='application/pdf' />
              
              <Upload />

              <div>
                <p>Click to upload</p>
                <p>5 mb maximum file size</p>
              </div>
            </div>
          </div>

          <div className='files'>
            <div className='file'>
              <div className='icon-and-info'>
                <PDF />

                <div className='info'>
                  <p className='name'>land-certificate-contract-to-sell.pdf</p>
                  <p className='size'>2 MB</p>
                </div>
              </div>

              <button>
                <Remove />
              </button>
            </div>

            <div className='file'>
              <div className='icon-and-info'>
                <PDF />

                <div className='info'>
                  <p className='name'>land-certificate-contract-to-sell.pdf</p>
                  <p className='size'>2 MB</p>
                </div>
              </div>

              <button>
                <Remove />
              </button>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <label>
            Valid ID 
            <span className='required-symbol'>*</span>
            <span className='guide'>(or any document to prove)</span>
          </label>

          <div className='input-image-field'>
            <input type='file' accept='application/pdf' />
            
            <Upload />

            <div>
              <p>Click to upload</p>
              <p>5 mb maximum file size</p>
            </div>
          </div>
        </div>

        <div className='files'>
          <div className='file'>
            <div className='icon-and-info'>
              <Image />

              <div className='info'>
                <p className='name'>my-valid-id.pdf</p>
                <p className='size'>2 MB</p>
              </div>
            </div>

            <button>
              <Remove />
            </button>
          </div>
        </div>

        <input type='submit' value='Save' className='solid btn' />
      </form>
    </section>
  )
}

export default EditProfileStep3