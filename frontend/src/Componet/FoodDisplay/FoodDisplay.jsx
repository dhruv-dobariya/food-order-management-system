import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  const filtered = food_list.filter(item =>
    category === "All" || category === item.category
  )

  return (
    <div className='food-display' id="food-display">
      <div className="food-display-heading">
        <h2>Top dishes <span>near you</span></h2>
        {filtered.length > 0 && (
          <span className="food-display-count">{filtered.length} Items</span>
        )}
      </div>

      <div className="food-display-list">
        {filtered.length === 0
          ? (
            <div className="food-display-empty">
              <div className="empty-icon">🍽️</div>
              <h3>No dishes found</h3>
              <p>Try selecting a different category</p>
            </div>
          )
          : filtered.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        }
      </div>
    </div>
  )
}

export default FoodDisplay
