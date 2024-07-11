import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './form.css';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleForm(event) {
        event.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        else {
            const data = JSON.parse(localStorage.getItem("userData")) || [];
            const user = data.find((user) => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                toast.success("Welcome to the Dashboard.")
                navigate('/todo');
            } else {
                toast.error('Invalid email or password');
            }
        }
    }

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <form className="form-content" onSubmit={handleForm}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="form-button">Login</button>
                    <p className="switch-form">
                        Don't have an account? <Link to="/">Signup here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
