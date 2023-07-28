import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import html2canvas from 'html2canvas'
import QRCodeStyling from 'qr-code-styling'

import {
  useSrContext,
  INSERT_ROUTE,
  SET_ACTIVE_PAGE,
  validateUser
} from '../../context'

import {
  fetchResident,
  formatBytes
} from '../../utils'

import { 
  Back, 
  Calendar, 
  ChevronDown,
  Picture,
  PDF,
  Remove,
  Upload
} from '../../assets/svg'

import '../../css/add_profile.css'

function AddProfile() {
  const navigate = useNavigate()
  const qrCodeCanvasRef = useRef(null)
  const [initialState, dispatch] = useSrContext()
  const [info, setInfo] = useState({
    firstName: 'Sonny',
    middleName: '',
    lastName: 'Carlos',
    birthday: '',
    gender: 'male',
    phoneNumber: '',
    address: 'Phase 1, Block 50, Unit 9',
    username: '',
    type: 'Resident',
    residentType: '',
    landCertificate: [],
    validId: [],
    picture: []
  })
  const [files, setFiles] = useState({})
  const [error, setError] = useState({ isError: false, errorMessage: '' })
  const [isModalOpen, setIsModalOpen] = useState(true)
  const details = JSON.parse(window.localStorage.getItem('profile'))

  // Handle file
  const handleFile = (e, prop) => {
    const selectedFiles = e.target.files
    const selectedFileArray = Array.from(selectedFiles)

    const newArr = selectedFileArray.map(file => ({
      name: file.name,
      size: file.size
    }))

    setFiles({ ...files, [prop]: newArr })
    setInfo({ ...info, [prop]: selectedFileArray })
  }

  // Remove rile
  const removeFile = (i, prop) => {
    const updatedFiles = [...files[prop]]
    updatedFiles.splice(i, 1)

    setFiles({ ...files, [prop]: updatedFiles })
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsModalOpen(true)

    // try {
    //   const canvas = await html2canvas(qrCodeCanvasRef.current)
    //   const qrCodeImage = canvas.toDataURL()

    //   const formData = new FormData()
    //   formData.append('file', qrCodeImage)
    //   formData.append('upload_preset', 'kfaije1j')

    //   const res = await Axios.post(
    //     'https://api.cloudinary.com/v1_1/dfc3s2kfc/image/upload',
    //     formData,
    //     { withCredentials: false }
    //   )
      
    //   // await approveUser({ 
    //   //   id: inputs.id, 
    //   //   action: inputs.action, 
    //   //   token: inputs.token, 
    //   //   qrCodeImage: `${res.data?.public_id}.png` 
    //   // })
    // } catch (error) {
    //   console.log('An error occurred while approving the user.', error)
    // }
  }

  // Use effect
  useEffect(() => {
    const qrCodeStyling = new QRCodeStyling({
      width: 250,
      height: 250,
      // data: `${info.username}`,
      data: `sonnycarlos`,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H',
      },
      imageOptions: {
        hideBackgroundDots: false,
        imageSize: 0.4,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#000000',
        type: 'extra-rounded', 
      },
      backgroundOptions: {
        color: '#FFFFFF',
      },
      cornersSquareOptions: {
        type: 'dot', 
      }
    })

    qrCodeStyling.append(qrCodeCanvasRef.current)
    qrCodeStyling.update()
  }, [info.username])

  // Use effect
  useEffect(() => {
    document.title = 'Add Profile'

    const cookie = document.cookie?.split('; ')?.find((row) => row.startsWith('routeHistory='))?.split('=')[1]
    const routeHistory = cookie?.split(',')

    document.cookie = `routeHistory=${routeHistory}`
    routeHistory.push('addProfile')
    document.cookie = `routeHistory=${routeHistory}`
    
    dispatch({ type: INSERT_ROUTE, payload: routeHistory })
    dispatch({ type: SET_ACTIVE_PAGE, payload: 'profiles' })

    window.localStorage.removeItem('verification')

    // Validate user
    async function validate() {
      const token = window.localStorage.getItem('user')
      const res = await validateUser(dispatch, { token })

      console.log(res.data)

      if (res?.status === 401) {
        navigate('/login')
      }

      // Prevent access to this page if not security type
      if (details.type === 'homeowner' || details.type === 'tenant') {
        navigate('../home')
      }
    }

    validate()
  }, [])
  
  return (
    <section id='add_profile'>
      {/* Back Button & Heading */}
      <div className='backBtnAndHeading'>
        <Link 
          to={`../${initialState.routeHistory[initialState.routeHistory.length - 1]}`} 
          className='text btn'
        >
          <Back />
          <span>Back</span>
        </Link>

        <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>Add Profile</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='stack'>
        <div className='headingAndActions'>
          <h2>About</h2>

          <div className='actions'>
            <Link to='/profiles' className='text btn'>Cancel</Link>
            <input type='submit' className='solid btn' />
          </div>
        </div>

        <div className='inputFields'>
          <div className='row'>
            <div className='form-group'>
              <label>
                First Name
                <span className='required-symbol'>*</span>
              </label>

              <input 
                type='text'
                name='firstName'
                placeholder='Your first name here'
                value={info.firstname}
                onChange={e => setInfo({ ...info, firstName: e.target.value })}
                style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
              />
            </div>

            <div className='form-group'>
              <label>
                Middle Name
                <span className='required-symbol'>*</span>
              </label>

              <input 
                type='text'
                name='middleName'
                placeholder='Your middle name here'
                value={info.middlename}
                onChange={e => setInfo({ ...info, middleName: e.target.value })}
                style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
              />
            </div>

            <div className='form-group'>
              <label>
                Last Name
                <span className='required-symbol'>*</span>
              </label>

              <input 
                type='text'
                name='lastName'
                placeholder='Your last name here'
                value={info.lastname}
                onChange={e => setInfo({ ...info, lastName: e.target.value })}
                style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
              />
            </div>
          </div>

          <div className='row'>
            <div className='form-group'>
              <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                Date of Birth 
                <span className='required-symbol'>*</span>
              </label>

              <div className='date input-field'>
                <input 
                  type='date'
                  name='birthdate'
                  value={info.birthdate}
                  onChange={e => setInfo({ ...info, birthdate: e.target.value })}
                />

                <span className='suffix'>
                  <Calendar />
                </span>
              </div>
            </div>

            <div className='form-group'>
              <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                Gender
                <span className='required-symbol'>*</span>
              </label>

              <div className='select input-field'>
                <select 
                  name='gender'
                  onChange={e => setInfo({ ...info, gender: e.target.value })}
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>

                <span className='suffix'>
                  <ChevronDown color='#99A8BA' />
                </span>
              </div>
            </div>

            <div className='form-group'>
              <label>
                Phone Number
                <span className='required-symbol'>*</span>
              </label>

              <input 
                type='text'
                name='phoneNumber'
                placeholder='Your phone number here'
                value={info.phoneNumber}
                onChange={e => info({ ...info, phoneNumber: e.target.value })}
                style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
              />
            </div>
          </div>

          <div className='row'>
            <div className='form-group'>
              <label>
                Home Address
                <span className='required-symbol'>*</span>
              </label>

              <input 
                type='text'
                name='address'
                placeholder='Your home address here'
                value={info.address}
                onChange={e => setInfo({ ...info, address: e.target.value })}
                style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
              />
            </div>

            <div className='form-group'>
              <label>
                Username
                <span className='required-symbol'>*</span>
              </label>

              <input 
                type='text'
                name='username'
                placeholder='Your username here'
                value={info.username}
                onChange={e => setInfo({ ...info, username: e.target.value })}
                style={{ borderBottom: `${error.isError &&  '1px solid #C01F28'}` }}
              />
            </div>

            <div className='form-group'>
              <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                Type
                <span className='required-symbol'>*</span>
              </label>

              <div className='select input-field'>
                <select 
                  name='type'
                  onChange={e => setInfo({ ...info, type: e.target.value })}
                >
                  <option value='Resident'>Resident</option>
                  <option value='Worker'>Worker</option>
                </select>

                <span className='suffix'>
                  <ChevronDown color='#99A8BA' />
                </span>
              </div>
            </div>
          </div>

          {info.type === 'Resident' && (
            <div className='row'>
              <div className='form-group'>
                <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                  Resident Type
                  <span className='required-symbol'>*</span>
                </label>

                <div className='select input-field'>
                  <select 
                    name='residentType'
                    onChange={e => setInfo({ ...info, type: e.target.value })}
                  >
                    <option value='Homeowner'>Homeowner</option>
                    <option value='Tenant'>Tenant</option>
                  </select>

                  <span className='suffix'>
                    <ChevronDown color='#99A8BA' />
                  </span>
                </div>
              </div>

              <div className='form-group'></div>
              <div className='form-group'></div>
            </div>
          )}

          {info.type === 'Resident' && (
            <div className='files row'>
              <div>
                <div className='form-group'>
                  <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
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
              </div>

              <div>
                <div className='form-group'>
                  <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
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
              </div>

              <div>
                <div className='form-group'>
                  <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                    2x2 Picture 
                    <span className='required-symbol'>*</span>
                    <span className='guide'>(must be hd and updated)</span>
                  </label>

                  <div className='input-image-field'>
                    <input
                      type='file' 
                      accept='image/*' 
                      onChange={(e) => handleFile(e, 'picture')}
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
            </div>
          )}

          {info.type === 'Worker' && (
            <div className='files row'>
              <div>
                <div className='form-group'>
                  <label style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
                    2x2 Picture 
                    <span className='required-symbol'>*</span>
                    <span className='guide'>(must be hd and updated)</span>
                  </label>

                  <div className='input-image-field'>
                    <input
                      type='file' 
                      accept='image/*' 
                      onChange={(e) => handleFile(e, 'picture')}
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
              
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      </form>

      {/* Modal */}
      <div style={{ display: `${isModalOpen ? 'grid' : 'none'}` }} className='modal'>
        <div className='container'>
          <div className='gatePass'>
            {/* Profile Picture */}
            <div  
              style={{ backgroundImage: info.picture[0] }}
              className='profilePicture'
            >
            </div>

            {/* Name & Address */}
            <div className='nameAndAddress'>
              <h1 className='name'>
                {`${info?.firstName} ${info?.lastName}`}
              </h1>
              
              <p className='address'>{info?.address}</p>
            </div>

            {/* QR Code */}
            <div ref={qrCodeCanvasRef} id='qr-code'></div>
          </div>

          <div className='actions'>
            <button onClick={() => setIsModalOpen(false)} className='outline btn'>Cancel</button>
            <button onClick={() => setIsModalOpen(false)} className='solid btn'>Print</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddProfile