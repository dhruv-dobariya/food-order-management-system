import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="Tomato Logo" />
            <p>
              Bringing delicious, fresh meals straight to your door. Quality ingredients, 
              amazing flavors, and lightning-fast delivery — that's the Tomato promise.
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="Facebook" />
              <img src={assets.twitter_icon} alt="Twitter" />
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
          </div>

          <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
              <li>+1-212-456-7890</li>
              <li>contact@tomato.com</li>
              <li>Mon – Fri, 9am – 10pm</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2024 Tomato.com — All Rights Reserved</p>
          <div className="footer-bottom-links">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer