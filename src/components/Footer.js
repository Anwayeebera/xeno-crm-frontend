import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-text">XENO</span>
                            <span className="logo-tagline">CRM</span>
                        </div>
                        <p className="footer-description">
                            Empowering businesses with intelligent customer relationship management solutions.
                        </p>
                    </div>
                    <div className="footer-links">
                        <h3>Products</h3>
                        <ul>
                            <li><Link to="#">Sales CRM</Link></li>
                            <li><Link to="#">Marketing Hub</Link></li>
                            <li><Link to="#">Service Suite</Link></li>
                            <li><Link to="#">Analytics</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="#">About Us</Link></li>
                            <li><Link to="#">Careers</Link></li>
                            <li><Link to="#">Press</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Resources</h3>
                        <ul>
                            <li><Link to="#">Blog</Link></li>
                            <li><Link to="#">Documentation</Link></li>
                            <li><Link to="#">Community</Link></li>
                            <li><Link to="#">Support</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        © {new Date().getFullYear()} XENO CRM. All rights reserved.
                    </div>
                    <div className="footer-legal">
                        <Link to="#">Privacy Policy</Link>
                        <Link to="#">Terms of Service</Link>
                        <Link to="#">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;