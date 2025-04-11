import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://fakestoreapi.com/auth/login", {
                username,
                password,
            });
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (err) {
            alert("Invalid login!", err);
        }
    };

    return (
        <div className="login-container">
            <div className="glass-card">
                <form onSubmit={handleLogin} className="login-form">
                    <h2 className="neon-title">LOGIN</h2>
                    
                    <div className="input-field">
                        <span className="input-label">Username</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-field">
                    
                    <span className="input-label">Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>
                    
                    <button type="submit" className="glow-button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;