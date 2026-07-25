import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <div className="header-badge">🔥 Fresh & Fast Delivery</div>

        <h2>Order your <span>favourite</span><br />food here</h2>

        <p>Explore our delicious menu filled with mouth-watering dishes made from fresh ingredients. Something for every taste bud — delivered fast.</p>

        <div className="header-actions">
          <a href="#explore-menu">
            <button className="header-btn-primary">View Menu →</button>
          </a>
          <a href="#app-download">
            <button className="header-btn-secondary">Get the App</button>
          </a>
        </div>

        <div className="header-stats">
          <div className="header-stat">
            <strong>50+</strong>
            <span>Menu Items</span>
          </div>
          <div className="header-stat">
            <strong>30 min</strong>
            <span>Avg Delivery</span>
          </div>
          <div className="header-stat">
            <strong>4.8 ★</strong>
            <span>Rating</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
