import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('overview');
    const navigate = useNavigate();

    const handleNewShipment = () => {
        navigate('/orders/new');
    };

    const handleExportData = () => {
        // Implement export logic or navigation
        alert('Export feature coming soon!');
    };

    return (
        <div className="dashboard">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <div className="company-logo">
                        <span className="logo-text">XENO</span>
                        <span className="logo-tagline">CRM</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${selectedTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('overview')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`nav-item ${selectedTab === 'customers' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('customers')}
                    >
                        Customers
                    </button>
                    <button 
                        className={`nav-item ${selectedTab === 'shipments' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('shipments')}
                    >
                        Shipments
                    </button>
                    <button 
                        className={`nav-item ${selectedTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => setSelectedTab('analytics')}
                    >
                        Analytics
                    </button>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-title">
                        <h1>Dashboard</h1>
                        <p>Welcome back, User</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-secondary" onClick={handleExportData}>Export Data</button>
                        <button className="btn-primary" onClick={handleNewShipment}>New Shipment</button>
                    </div>
                </header>

                <div className="dashboard-content">
                    {selectedTab === 'overview' && (
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total Shipments</h3>
                                <p className="stat-value">1,234</p>
                                <span className="stat-change positive">+12.5%</span>
                            </div>
                            <div className="stat-card">
                                <h3>Active Orders</h3>
                                <p className="stat-value">56</p>
                                <span className="stat-change positive">+5.3%</span>
                            </div>
                            <div className="stat-card">
                                <h3>Delivered Today</h3>
                                <p className="stat-value">28</p>
                                <span className="stat-change negative">-2.1%</span>
                            </div>
                            <div className="stat-card">
                                <h3>Customer Satisfaction</h3>
                                <p className="stat-value">98%</p>
                                <span className="stat-change positive">+1.2%</span>
                            </div>
                        </div>
                    )}
                    {selectedTab === 'customers' && (
                        <div>Customer management coming soon.</div>
                    )}
                    {selectedTab === 'shipments' && (
                        <div>Shipments management coming soon.</div>
                    )}
                    {selectedTab === 'analytics' && (
                        <div>Analytics dashboard coming soon.</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;