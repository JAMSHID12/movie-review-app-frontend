import { useState } from 'react'
import './register.css'

const Register= () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmitEvent = (e) => {

    }

    return(
        <div className="container">
        <div className="registration-box">
            <h2>Register</h2>
            <form className="form-group custom-form" action={handleFormSubmitEvent}>
                <div className="textbox ">
                    <input type="text" placeholder="Full Name" required/>
                </div>
                <div className="textbox">
                    <input type="email" placeholder="Email" required/>
                </div>
                <div className="textbox">
                    <input type="password" placeholder="Password" required/>
                </div>
                <button className="btn btn-primary register-btn" type="submit">Register</button>
            </form>
            <p className="login-link">
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
        </div>
    )
}

export default Register;