import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchorders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders", {},
        { headers: { token } }
      )
      setData(response.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchorders()
  }, [token])

  const getStatusClass = (status) => {
    const s = status?.toLowerCase().replace(/\s+/g, '-')
    return s || 'pending'
  }

  if (!loading && data.length === 0) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
          <Link to="/"><button className="cart-empty-btn" style={{marginTop:'12px',background:'tomato',color:'white',border:'none',padding:'12px 28px',borderRadius:'999px',fontWeight:'700',cursor:'pointer'}}>Order Now</button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <p className="my-orders-subtitle">{data.length} order{data.length !== 1 ? 's' : ''} placed</p>

      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Order" />

            <p className="order-items-text">
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} × ${item.quantity}`
                  : `${item.name} × ${item.quantity}, `
              )}
            </p>

            <p className="order-amount">${order.amount}.00</p>

            <span className="order-item-count">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </span>

            <div className="order-status">
              <span className={`order-status-dot ${getStatusClass(order.status)}`}></span>
              <b>{order.status}</b>
            </div>

            <button onClick={fetchorders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
