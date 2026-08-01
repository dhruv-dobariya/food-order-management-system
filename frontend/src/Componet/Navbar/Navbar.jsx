import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home")
    const [mobileOpen, setMobileOpen] = useState(false)
    
    const { getToatalCartAmount, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
        setMobileOpen(false)
    }

    const closeMobile = () => setMobileOpen(false)

    return (
        <>
            <div className='navbar'>
                <Link to='/' onClick={() => setMenu("home")}>
                    <img src={assets.logo} alt="Tomato Food" className="logo" />
                </Link>

                <ul className="navbar-menu">
                    <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                    <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                    <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                    <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact</a>
                </ul>

                <div className="navbar-right">
                    <img src={assets.search_icon} alt="Search" />

                    <div className="navbar-serch-icon">
                        <Link to='/cart'>
                            <img src={assets.basket_icon} alt="Cart" />
                        </Link>
                        {getToatalCartAmount() > 0 && <div className="dot"></div>}
                    </div>

                    {!token
                        ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                        : <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="Profile" />
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => { navigate('/myorders'); closeMobile() }}>
                                    <img src={assets.bag_icon} alt="" />
                                    <p>My Orders</p>
                                </li>
                                <hr />
                                <li onClick={logout}>
                                    <img src={assets.logout_icon} alt="" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    }

                    <div className="navbar-hamburger" onClick={() => setMobileOpen(true)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`} onClick={closeMobile}>
                <div className="navbar-mobile-menu-inner" onClick={e => e.stopPropagation()}>
                    <span className="navbar-mobile-close" onClick={closeMobile}>✕</span>
                    <Link to="/" onClick={() => { setMenu("home"); closeMobile() }}>🏠 Home</Link>
                    <a href='#explore-menu' onClick={() => { setMenu("menu"); closeMobile() }}>🍽️ Menu</a>
                    <a href='#app-download' onClick={() => { setMenu("mobile-app"); closeMobile() }}>📱 Mobile App</a>
                    <a href='#footer' onClick={() => { setMenu("contact-us"); closeMobile() }}>📞 Contact</a>
                    <Link to='/cart' onClick={closeMobile}>🛒 Cart {getToatalCartAmount() > 0 && `($${getToatalCartAmount()})`}</Link>
                    {token
                        ? <>
                            <span onClick={() => { navigate('/myorders'); closeMobile() }}>📦 My Orders</span>
                            <span onClick={logout}>🚪 Logout</span>
                          </>
                        : <span onClick={() => { setShowLogin(true); closeMobile() }}>🔑 Sign In</span>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar