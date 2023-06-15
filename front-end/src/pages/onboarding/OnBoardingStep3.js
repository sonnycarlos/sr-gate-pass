import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../../config'

import {
  BrandLogo,
  ArrowRight,
  Back,
  Image,
  PDF,
  Remove,
  Upload
} from '../../assets/svg'

import '../../css/onboarding.css'
import '../../css/style.css'

function OnBoardingStep3() {
  const [fileSelected, setFileSelected] = useState('')
  const [headingFontSize, setHeadingFontSize] = useState(40)
  const [paragraphFontSize, setParagraphFontSize] = useState(20)

  // Handle Upload
  const handleUpload = (e, file) => {
    const formData = new FormData()
    formData.append('file', fileSelected)
    formData.append('upload_preset', 'kfaije1j')

    e.preventDefault()

    Axios
      .post('https://api.cloudinary.com/v1_1/dfc3s2kfc/raw/upload', formData, { withCredentials: false })
      .then(res => {
        console.log(res)
        console.log(res.data.public_id)
      })
  }

  // Handle Scroll
  const handleScroll = () => {
    const ghostHeader = document.getElementById('ghostHeader')
    const brandLogo = document.getElementById('brandLogo')
    const backBtn = document.getElementById('backBtn')
    const header = document.getElementById('header')
    const progressBar = document.getElementById('progress-bar')
    const bars = document.querySelectorAll('.bar')

    if (window.scrollY > 64) {
      setHeadingFontSize(24)
      setParagraphFontSize(16)
      
      ghostHeader.style.visibility = 'visible'
      brandLogo.style.marginBottom = '41.15px'

      backBtn.style.position = 'fixed'
      backBtn.style.top = '24px'

      progressBar.style.position = 'fixed'
      progressBar.style.top = '30px'
      progressBar.style.marginTop = '0'

      header.style.marginTop = '0'
      
      bars.forEach(bar => {
        bar.style.width = '40px'
      })

      header.style.marginTop = '40px'
      header.style.marginBottom = '32px'
    }
    
    if (window.scrollY < 64) {
      setHeadingFontSize(40)
      setParagraphFontSize(20)

      ghostHeader.style.visibility = 'hidden'
      brandLogo.style.marginBottom = '80px'
      
      backBtn.style.position = 'relative'
      backBtn.style.top = '0'

      progressBar.style.position = 'relative'
      progressBar.style.top = '0'
      progressBar.style.left = '0'
      progressBar.style.marginTop = '64px'

      header.style.marginTop = '0'
      header.style.marginBottom = '0'
    }
  }
  
  // Use Effect
  useEffect(() => {
    document.title = 'On Boarding'

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section style={{ marginBottom: '24px' }} id='onboarding'>
      {/* Ghost Back And Progress Bar */}
      <div id='ghostHeader'></div>
      
      {/* Brand Logo */}
      <img src={BrandLogo} alt='Brand Logo' id='brandLogo' />

      {/* Back Button */}
      <Link to='./login' id='backBtn' className='text btn'>
        <Back />
        <span>Back</span>
      </Link>

      {/* Header */}
      <header id='header'>
        <h1 style={{ fontSize: `${headingFontSize}px` }} >You're almost there!</h1>
        <p style={{ fontSize: `${paragraphFontSize}px` }}>This won't take long so don't worry.</p>
      </header>

      {/* Progress Bar */}
      <div id='progress-bar' className='progress-bar'>
        <span className='active bar'></span>
        <span className='active bar'></span>
        <span className='active bar'></span>
      </div>

      {/* Form */}
      <form onSubmit={handleUpload}>
        <h2>Proof of Residency</h2>

        <div className='inputFields'>
          <div className='form-group'>
            <label>
              Land Certificate 
              <span className='required-symbol'>*</span>
              <span className='guide'>(or any document to prove)</span>
            </label>

            <div className='input-image-field'>
              <input 
                type='file' 
                accept='application/pdf' 
                onChange={(e) => setFileSelected(e.target.files[0])}
              />
              
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

          <div className='form-group'>
            <label>Valid ID</label>

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
                  <p className='name'>my-valid-id.png</p>
                  <p className='size'>2 MB</p>
                </div>
              </div>

              <button>
                <Remove />
              </button>
            </div>
          </div>

          <div className='form-group'>
            <label>
              2x2 Picture 
              <span className='required-symbol'>*</span>
              <span className='guide'>(must be hd and updated)</span>
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
                  <p className='name'>my-2x2-picture.pdf</p>
                  <p className='size'>2 MB</p>
                </div>
              </div>

              <button>
                <Remove />
              </button>
            </div>
          </div>
        </div>

        <div className='actions'>
          <div className='btn-container'>
            <input type='submit' value='Continue' className='solid btn' />
            <ArrowRight color='#FFF' />
          </div>

          <Link to='./login' className='outline btn'>Try it later and log out</Link>
        </div>
      </form>

      <p className='privacyPolicy'>
        Your information will remain confidential and will only be used for verification. To see how we store and use this data, check our <Link to='#'>Privacy Policy.</Link>
      </p>
    </section>
  )
}

export default OnBoardingStep3