import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from "../../assets/assets"

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-header">
        <h1>Explore our <span>Menu</span></h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and fuel your day.
        </p>
      </div>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className={`explore-menu-list-item ${category === item.menu_name ? 'active-card' : ''}`}
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  )
}

export default ExploreMenu
