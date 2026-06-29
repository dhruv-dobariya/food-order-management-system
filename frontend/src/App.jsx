import React, { useState } from 'react'
import Navbar from './Componet/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Componet/Footer/Footer'
import Loginpopup from './Componet/LoginPopup/Loginpopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin,setShowLogin]=useState(false)
  return (
    <>

    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}

      <div className='app'>

        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/order' element={<PlaceOrder />}></Route>
         <Route path="/verify" element={<Verify />} ></Route>
         <Route path='/myorders' element={<MyOrders/>}></Route>
        </Routes>
        <Footer/>
      </div>
      {/* 3:10:57 */}
    </>
  )
}

export default App
