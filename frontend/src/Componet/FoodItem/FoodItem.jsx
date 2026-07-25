import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addTocart, removeFromCart, url } = useContext(StoreContext)
  const qty = cartItems[id] || 0

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={name}
          loading="lazy"
        />

        {qty === 0
          ? (
            <img
              className="add"
              onClick={() => addTocart(id)}
              src={assets.add_icon_white}
              alt="Add to cart"
            />
          )
          : (
            <div className='food-item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
              <p>{qty}</p>
              <img onClick={() => addTocart(id)} src={assets.add_icon_green} alt="Add more" />
            </div>
          )
        }
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="4.5 stars" />
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-price-row">
          <p className='food-item-price'>${price}</p>
          <button
            className={`food-item-add-btn ${qty > 0 ? 'in-cart' : ''}`}
            onClick={() => addTocart(id)}
          >
            {qty > 0 ? `In Cart (${qty})` : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
