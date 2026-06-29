import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { Form, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const PlaceOrder = () => {

  const { getToatalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))

  }

  // pyament gatway

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getToatalCartAmount() + 2,
    }

    let response = await axios.post(
      url + "/api/order/place",
      orderData,
      { headers: { token } }
    );

    if (response.data.success) {

      const order = response.data.order;
      const orderId = response.data.orderId;

      const options = {
        key: "rzp_test_SxxpM8ebuC3FoB",
        amount: order.amount,
        currency: order.currency,
        name: "Food Delivery",
        description: "Food Order Payment",
        order_id: order.id,

        handler: function () {

          window.location.href =
            `/verify?success=true&orderId=${orderId}`;

        },

        modal: {
          ondismiss: function () {

            window.location.href =
              `/verify?success=false&orderId=${orderId}`;

          }
        },

        prefill: {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          contact: data.phone
        },

        theme: {
          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } else {
      alert("Error Creating Order");
    }
  }
   
  const navigate=useNavigate();

  useEffect(() => {
    if (!token) {
        navigate('/cart')
    }
    else if(getToatalCartAmount()===0){
      navigate('/cart')
    }
  }, [token])
  return (
    <>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
          </div>

          <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />

          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>

          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>

          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />

        </div>

        <div className="place-order-right">
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
                <p>${getToatalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              {/* ---------------3---------- */}

              <div className="cart-total-details">
                <b>Total</b>
                <b>${getToatalCartAmount() === 0 ? 0 : getToatalCartAmount() + 2}</b>
              </div>

            </div>
            <button type='submit' >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder
