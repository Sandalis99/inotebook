import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("https://inotebook-api-rl0h.onrender.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })

    const json = await response.json()
    console.log(json)

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken)
      props.showAlert("Logged in successfully", "success")
      navigate("/")
    } else {
      props.showAlert("Invalid details", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='mt-3'>
        <h2>Login to continue to iNotebook</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              name="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Login