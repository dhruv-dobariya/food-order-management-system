import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <div className="app-download-text">
        <span className="app-download-badge">📱 Now Available</span>
        <h2>For a Better Experience<br />Download <span>Tomato App</span></h2>
        <p>Get exclusive deals, real-time order tracking, and a seamless food ordering experience on your phone.</p>
      </div>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Get it on Google Play" />
        <img src={assets.app_store} alt="Download on App Store" />
      </div>
    </div>
  )
}

export default AppDownload
