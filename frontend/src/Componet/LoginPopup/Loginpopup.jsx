import React, { useContext, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Loginpopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({ name: "", email: "", password: "" })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    const endpoint = currState === "Login"
      ? `${url}/api/user/login`
      : `${url}/api/user/register`

    const response = await axios.post(endpoint, data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup' onClick={() => setShowLogin(false)}>
      <form
        onSubmit={onLogin}
        className='login-popup-container'
        onClick={e => e.stopPropagation()}
      >
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Welcome Back 👋" : "Create Account"}</h2>
          <button
            type="button"
            className="login-popup-close"
            onClick={() => setShowLogin(false)}
          >✕</button>
        </div>

        <p className="login-popup-subtitle">
          {currState === "Login"
            ? "Sign in to your account to continue"
            : "Join us and start ordering today"
          }
        </p>

        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input
              type="text"
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              placeholder='Your full name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Email address'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        <button type='submit'>
          {currState === "Sign Up" ? "Create Account →" : "Sign In →"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the <b>Terms of Use</b> & <b>Privacy Policy</b></p>
        </div>

        <p className="login-popup-toggle">
          {currState === "Login"
            ? <>New to Tomato? <span onClick={() => setCurrState("Sign Up")}>Create account</span></>
            : <>Already have an account? <span onClick={() => setCurrState("Login")}>Sign in</span></>
          }
        </p>
      </form>
    </div>
  )
}

export default Loginpopup
