import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../reducer/UserSlice";
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userState = useSelector((state) => state.user);
    const loading = userState.loading;
    const error = userState.error;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        let userCredential = {
            email, password
        };
        dispatch(loginUser(userCredential)).then((result) => {
            if (result.payload) {
                setEmail('');
                setPassword('');
                navigate('/');
            }
        });
    };

    return (
        <div className="container">
            <div class="login-box">
                <h2>Login</h2>
                <form className="form-group custom-form" onSubmit={handleSubmitEvent}>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                        placeholder="john.deo@gamil.com"
                    />
                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                        placeholder="your password"
                    />
                    <br />
                    <button className="btn btn-primary login-btn" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {error && (
                        <div className="alert alert-danger" role="alert">{error}</div>
                    )}
                    <br/>
                    <p class="register-link">
                        Don't have an account? <a href="/register">Register here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
