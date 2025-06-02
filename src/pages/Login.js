import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, googleLogin } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
        setLoading(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            const response = await googleLogin(credential);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Google authentication failed');
        }
    };

    const handleGoogleFailure = () => {
        setError('Google authentication was cancelled or failed');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="brand">
                        <h1>XENO</h1>
                        <span>CRM</span>
                    </div>
                    <p className="welcome-text">Sign in to your account</p>
                </div>
                <form className="login-form" onSubmit={handleEmailLogin}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                    />
                </div>
                <div className="signup-prompt">
                    Don't have an account? <a href="/signup">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;