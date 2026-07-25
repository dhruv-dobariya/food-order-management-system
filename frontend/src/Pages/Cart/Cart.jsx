import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext as uc } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addTocart, getToatalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const cartFoods = food_list.filter(item => cartItems[item._id] > 0)
  const subtotal = getToatalCartAmount()
  const delivery = subtotal === 0 ? 0 : 2
  const total = subtotal === 0 ? 0 : subtotal + delivery

  if (cartFoods.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet</p>
          <Link to="/">
            <button className="cart-empty-btn">Browse Menu</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='cart'>
      <h2>Your Cart</h2>

      {/* Table Header */}
      <div className="cart-items-title">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Rows */}
      {cartFoods.map((item, index) => (
        <div key={index}>
          <div className="cart-items-item">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p className="item-name">{item.name}</p>
            <p className="item-price">${item.price}</p>
            <div className="cart-qty-control">
              <button className="cart-qty-btn" onClick={() => removeFromCart(item._id)}>−</button>
              <span className="cart-qty-num">{cartItems[item._id]}</span>
              <button className="cart-qty-btn" onClick={() => addTocart(item._id)}>+</button>
            </div>
            <p className="item-price">${(item.price * cartItems[item._id]).toFixed(2)}</p>
            <button className="cart-remove-btn" onClick={() => {
              for (let i = 0; i < cartItems[item._id]; i++) removeFromCart(item._id)
            }}>✕</button>
          </div>
          <hr />
        </div>
      ))}

      {/* Bottom: Total + Promo */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p className="cart-price">${subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p className="cart-price">${delivery.toFixed(2)}</p>
          </div>
          <div className="cart-total-details total-row">
            <b>Total</b>
            <b className="cart-price">${total.toFixed(2)}</b>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT →</button>
        </div>

        <div className="cart-promocode">
          <h3>🎁 Have a Promo Code?</h3>
          <p>Enter your coupon code for a discount on your order.</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Enter promo code' />
            <button>Apply</button>
          </div>
          <div className="cart-savings">
            ✅ Free delivery on orders over $20
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
