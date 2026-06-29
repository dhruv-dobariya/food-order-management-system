import React from 'react'
import './Cart.css'

import { StoreContext } from '../../context/StoreContext'
 import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const { cartItems, food_list, removeFromCart,getToatalCartAmount,url } = useContext(StoreContext);
  const navigate= useNavigate();

  return (
    <>
      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />

          {food_list.map((item , index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}</p>
                    <p  onClick={()=>removeFromCart(item._id)}  className='cross'>X</p>
                  </div>
                  <hr />
                </div>


              )
            }

          })}
        </div>
        {/* ----chek out page ------*/}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              {/* ------------1---------------- */}
              <div className="cart-total-details">
                <p>Subtoatl</p>
                <p>${getToatalCartAmount()}</p>
              </div>
              <hr />
              {/* ------------------2-------------- */}
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getToatalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              {/* ---------------3---------- */}

              <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getToatalCartAmount()===0?0:getToatalCartAmount()+2}</b>
              </div>
              
            </div>
            <button  on onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>IF You have a promo code ,Enter it here</p>
                <div className='cart-promocode-input'>
                  <input type="text" placeholder='promo code'/>
                  <button>Submit</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
