import React, { useState } from 'react';
import '../styles/LoginForm.css';
import { loginUser } from '../services/api';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            console.log('Login successful:', response);
            // Redirect to Dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn-login-form">Sign In</button>
        </form>
    );
};

export default LoginForm;
