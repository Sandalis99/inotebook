import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, password } = credentials

    const response = await fetch("https://inotebook-api-rl0h.onrender.com/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })

    const json = await response.json()
    console.log(json)

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken)
      props.showAlert("Account Created Successfully", "success")
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
      <div className='container mt-2'>
        <h2 className='my-2'>SignUp to continue to iNotebook</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onChange} minLength={5} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="cpassword" onChange={onChange} minLength={5} required />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

        </form>
      </div>
    </>
  )
}

export default Signup