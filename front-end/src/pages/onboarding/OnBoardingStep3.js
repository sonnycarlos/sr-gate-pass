import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../../config'

import { 
  useSrContext, 
  ON_BOARDING_TO_PROFILE 
} from '../../context'

import { uploadFile, formatBytes, verifyUser } from '../../utils'

import {
  BrandLogo,
  ArrowRight,
  Back,
  PDF,
  Picture,
  Remove,
  Upload
} from '../../assets/svg'

import '../../css/onboarding.css'
import '../../css/style.css'

function OnBoardingStep3() {
  const [files, setFiles] = useState({})
  const [filesToUpload, setFilesToUpload] = useState({
    landCertificate: [],
    validId: [],
    picture: []
  })
  const [headingFontSize, setHeadingFontSize] = useState(40)
  const [paragraphFontSize, setParagraphFontSize] = useState(20)
  const [initialState, dispatch] = useSrContext()

  const navigate = useNavigate()

  // Handle upload
  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: ON_BOARDING_TO_PROFILE, payload: files })

    filesToUpload.landCertificate.map((file) => uploadFile(file))
    filesToUpload.validId.map((file) => uploadFile(file))
    uploadFile(filesToUpload.picture[0])

    let res = await verifyUser({
      ...initialState?.user,
      landCertificate: files?.landCertificate,
      validId: files?.validId,
      picture: files?.picture
    })

    if (res.status === 201) {
      setTimeout(() => {
        navigate('/onboarding-successfully')
      }, 2000)
    }
  }

  // Handle file
  const handleFile = (e, prop) => {
    const selectedFiles = e.target.files
    const selectedFileArray = Array.from(selectedFiles)

    const newArr = selectedFileArray.map(file => ({
      name: file.name,
      size: file.size
    }))

    setFiles({ ...files, [prop]: newArr })
    setFilesToUpload({ ...filesToUpload, [prop]: selectedFileArray })
  }

  // Remove rile
  const removeFile = (i, prop) => {
    const updatedFiles = [...files[prop]]
    updatedFiles.splice(i, 1)

    setFiles({ ...files, [prop]: updatedFiles })
  }

  // Handle scroll
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
  
  // Use effect
  useEffect(() => {
    document.title = 'On Boarding'

    console.log(initialState)

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
      <Link to='/onboarding-step-2' id='backBtn' className='text btn'>
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
      <form onSubmit={handleSubmit}>
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
                name='landCertificate'
                accept='application/pdf' 
                onChange={(e) => handleFile(e, 'landCertificate')}
                multiple
                required
              />
              
              <Upload />

              <div>
                <p>Click to upload</p>
                <p>5 mb maximum file size</p>
              </div>
            </div>
          </div>

          <div 
            className='files'
            style={{ display: `${files.landCertificate?.length !== 0 ? 'grid' : 'none'}` }}
          >
            {files.landCertificate?.map((file, i) => (
              <div key={i} className='file'>
                <div className='icon-and-info'>
                  <PDF />

                  <div className='info'>
                    <p className='name'>{file?.name}</p>
                    <p className='size'>{formatBytes(file?.size)}</p>
                  </div>
                </div>

                <a onClick={() => removeFile(i, 'landCertificate')}>
                  <Remove />
                </a>
              </div>
            ))}
          </div>

          <div className='form-group'>
            <label>
              Valid ID
              <span className='required-symbol'>*</span>
              <span className='guide'>(front and back)</span>
            </label>

            <div className='input-image-field'>
              <input 
                type='file' 
                accept='image/*' 
                onChange={(e) => handleFile(e, 'validId')}
                multiple
                required
              />
              
              <Upload />

              <div>
                <p>Click to upload</p>
                <p>5 mb maximum file size</p>
              </div>
            </div>
          </div>

          <div 
            className='files'
            style={{ display: `${files.validId?.length !== 0 ? 'grid' : 'none'}` }}
          >
            {files.validId?.map((file, i) => (
              <div key={i} className='file'>
                <div className='icon-and-info'>
                  <Picture />

                  <div className='info'>
                    <p className='name'>{file?.name}</p>
                    <p className='size'>{formatBytes(file?.size)}</p>
                  </div>
                </div>

                <a onClick={() => removeFile(i, 'validId')}>
                  <Remove />
                </a>
              </div>
            ))}
          </div>

          <div className='form-group'>
            <label>
              2x2 Picture 
              <span className='required-symbol'>*</span>
              <span className='guide'>(must be hd and updated)</span>
            </label>

            <div className='input-image-field'>
              <input
                type='file' 
                accept='image/*' 
                onChange={(e) => handleFile(e, 'picture')}
                required
              />
              
              <Upload />

              <div>
                <p>Click to upload</p>
                <p>5 mb maximum file size</p>
              </div>
            </div>
          </div>

          <div 
            className='files'
            style={{ display: `${files.picture?.length !== 0 ? 'grid' : 'none'}` }}
          >
            {files.picture?.map((file, i) => (
              <div key={i} className='file'>
                <div className='icon-and-info'>
                  <Picture />

                  <div className='info'>
                    <p className='name'>{file?.name}</p>
                    <p className='size'>{formatBytes(file?.size)}</p>
                  </div>
                </div>

                <a onClick={() => removeFile(i, 'picture')}>
                  <Remove />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className='actions'>
          <div className='btn-container'>
            <input type='submit' value='Continue' className='solid btn' />
            <ArrowRight color='#FFF' />
          </div>

          <Link to='/login' className='outline btn'>Try it later and log out</Link>
        </div>
      </form>

      <p className='privacyPolicy'>
        Your information will remain confidential and will only be used for verification. To see how we store and use this data, check our <Link to='#'>Privacy Policy.</Link>
      </p>
    </section>
  )
}

export default OnBoardingStep3