import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Hero.css';
import LoginForm from './LoginForm';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Build Everlasting Customer Relationships</h1>
                        <p className="hero-subtitle">
                            Trust the world's favorite CRM to transform your sales, marketing, 
                            and customer service into a unified powerhouse that drives growth and builds lasting connections.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">100M+</span>
                                <span className="stat-label">Users Worldwide</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Years of Excellence</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">99.9%</span>
                                <span className="stat-label">Uptime Guarantee</span>
                            </div>
                        </div>
                        <div className="hero-cta">
                            <button className="btn-primary" onClick={() => navigate('/signup')}>Start Free Trial</button>
                            <button className="btn-secondary" onClick={() => window.open('https://www.youtube.com/', '_blank')}>Watch Demo</button>
                        </div>
                    </div>
                    <div className="hero-login">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
