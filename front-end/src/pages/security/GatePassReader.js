import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QrReader from 'react-qr-reader'

import { useSrContext } from '../../context'

import { Back, Check } from '../../assets/svg'

import '../../css/gate_pass_reader.css'

function GatePassReader() {
  const navigate = useNavigate()
  const [initialState, dispatch] = useSrContext()
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const [sectionActive, setSectionActive] = useState('scanQRCode')

  const handleScan = async (scanData) => {
    setLoadingScan(true)
    console.log(`loaded data data`, scanData)

    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData)
      setData(scanData)
      setLoadingScan(false)
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  return (
    <section id='gate_pass_reader'>
      {/* Header */}
      <header>
        <Link to='/home' className='text btn'>
          <Back />
          <span>Back</span>
        </Link>

        <Link to='/guests-history' className='text btn'>
          View History
        </Link>
      </header>

      {/* QR Code Reader */}
      <div className={`scanQRCode section ${sectionActive === 'scanQRCode' && 'active'}`}>
        <div className='headingAndSubtitle'>
          <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
            Scan QR Code
          </h1>
          <p>Scan the QR code of the booked guest</p>
        </div>

        <QrReader
          delay={1000}
          onError={handleError}
          onScan={handleScan}
        />
      </div>

      {/* Input Code */}
      <div className={`inputCode section ${sectionActive === 'inputCode' && 'active'}`}>
        <div className='headingAndSubtitle'>
          <h1 style={{ fontFamily: initialState.isiOSDevice ? '-apple-system, BlinkMacSystemFont, sans-serif' : 'SFProDisplay-Bold' }}>
            Input Code
          </h1>
          <p>Enter the Booking ID of the guest.</p>
        </div>

        <form className='inputFieldCont'>
          <div className='form-group'>
            <label>Booking Number</label>
            <input type='text' placeholder='E.g. 3301666A51BCD10EFU' />
          </div>

          <button type='submit'>
            <Check color='#FFF' />
          </button>
        </form>
      </div>

      {/* Actions */}
      <div className='actions'>
          <button 
            onClick={() => setSectionActive('scanQRCode')}
            className={`btn ${sectionActive === 'scanQRCode' ? 'solid' : 'text'}`}
          >
            Scan QR Code
          </button>

          <button 
            onClick={() => setSectionActive('inputCode')}
            className={`btn ${sectionActive === 'inputCode' ? 'solid' : 'text'}`}
          >
            Enter Code
          </button>
        </div>

      {data !== '' && <p>{data}</p>}
    </section>
  )
}

export default GatePassReader