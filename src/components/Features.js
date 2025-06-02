import React from 'react';
import '../styles/Features.css';

const Features = () => {
    return (
        <section className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Businesses Choose XENO CRM</h2>
                    <p className="section-subtitle">
                        Powerful features that transform how you manage customer relationships
                    </p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3 className="feature-title">Sales Pipeline Management</h3>
                        <p className="feature-description">
                            Visualize your sales process, track deals through every stage, 
                            and close more deals faster with intelligent pipeline management.
                        </p>
                    </div>
                    {/* Add more feature cards as needed */}
                </div>
            </div>
        </section>
    );
};

export default Features;
