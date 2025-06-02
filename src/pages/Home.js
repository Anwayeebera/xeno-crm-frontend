import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import LoginForm from './LoginForm';

const Hero = () => {
    const stats = [
        { number: '100M+', label: 'Users Worldwide', suffix: '+' },
        { number: '15', label: 'Years of Excellence', suffix: '+' },
        { number: '99.9', label: 'Uptime Guarantee', suffix: '%' },
        { number: '50K', label: 'Active Companies', suffix: '+' }
    ];

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">
                            <span className="badge-icon">⭐</span>
                            <span className="badge-text">#1 Rated CRM Platform in 2025</span>
                        </div>
                        
                        <h1 className="hero-title">
                            Build Everlasting Customer Relationships
                        </h1>
                        
                        <p className="hero-subtitle">
                            Transform your business with our powerful CRM platform. 
                            Streamline operations, boost customer satisfaction, and drive growth 
                            with intelligent automation and real-time insights.
                        </p>

                        <div className="hero-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat">
                                    <span className="stat-number">
                                        {stat.number}
                                        <span className="stat-suffix">{stat.suffix}</span>
                                    </span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-cta">
                            <Link to="/signup" className="btn-primary">
                                Start Free Trial
                                <span className="btn-icon">→</span>
                            </Link>
                            <button className="btn-secondary">
                                <span className="play-icon">▶</span>
                                Watch Demo
                            </button>
                        </div>

                        <div className="hero-trust">
                            <p className="trust-text">Trusted by leading companies worldwide</p>
                            <div className="trust-logos">
                                {/* Add company logos here */}
                            </div>
                        </div>
                    </div>

                    <div className="hero-login">
                        <div className="login-card">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;