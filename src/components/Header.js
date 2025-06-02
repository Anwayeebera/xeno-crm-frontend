import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const products = [
  { label: "CRM Dashboard", icon: "📊", to: "/dashboard", tooltip: "Your main CRM workspace" },
  { label: "Customer Segmentation", icon: "👥", to: "/segment-builder", tooltip: "Smart audience builder" },
  { label: "Campaign Management", icon: "📣", to: "/campaign-history", tooltip: "Manage and launch campaigns" },
  { label: "Analytics & Reporting", icon: "📈", to: "/analytics", tooltip: "Insights & reports" },
  { label: "Marketing Automation", icon: "🤖", to: "/automation", tooltip: "Automate your marketing" },
  { label: "Integration Tools", icon: "🔌", to: "/integrations", tooltip: "Connect your tools" },
  { label: "Mobile App", icon: "📱", to: "/mobile", tooltip: "CRM on the go" }
];

const solutions = [
  { label: "E-Commerce CRM", icon: "🛒", to: "/solutions/ecommerce", tooltip: "For online stores", case: "Boost repeat purchases by 30% (Case: ShopX)" },
  { label: "B2B Marketing", icon: "🏢", to: "/solutions/b2b", tooltip: "For B2B sales", case: "Doubled pipeline velocity (Case: SaaSPro)" },
  { label: "Customer Retention", icon: "🔁", to: "/solutions/retention", tooltip: "Keep your customers", case: "Reduced churn by 20% (Case: FitLife)" },
  { label: "Sales Enablement", icon: "💼", to: "/solutions/sales", tooltip: "Empower your sales team", case: "Shortened sales cycle (Case: FinEdge)" },
  { label: "Post-purchase Engagement", icon: "🎁", to: "/solutions/engagement", tooltip: "Delight after purchase", case: "Increased NPS by 15 (Case: HomeDecor)" },
  { label: "AI-driven Campaigns", icon: "🤖", to: "/solutions/ai", tooltip: "Smarter marketing", case: "Lifted open rates by 40% (Case: BookNest)" }
];

const resources = [
  { label: "Documentation", icon: "📚", to: "/resources/docs" },
  { label: "API Reference", icon: "🔗", to: "/resources/api" },
  { label: "Webinars", icon: "🎥", to: "/resources/webinars" },
  { label: "Tutorial Videos", icon: "🎬", to: "/resources/tutorials" },
  { label: "Product Updates", icon: "🆕", to: "/resources/updates" },
  { label: "Blog", icon: "✍️", to: "/resources/blog" },
  { label: "Community Forum", icon: "💬", to: "/resources/forum" },
  { label: "Getting Started", icon: "🚀", to: "/resources/getting-started" }
];

const support = [
  { label: "Contact Support", icon: "☎️", to: "/support/contact" },
  { label: "Live Chat", icon: "💬", to: "/support/chat" },
  { label: "FAQs", icon: "❓", to: "/support/faqs" },
  { label: "Submit a Ticket", icon: "🎫", to: "/support/ticket" },
  { label: "System Status", icon: "🟢", to: "/support/status" },
  { label: "Onboarding Help", icon: "👋", to: "/support/onboarding" }
];

const profileMenu = [
  { label: "My Campaigns", to: "/dashboard/campaigns" },
  { label: "Billing & Invoices", to: "/account/billing" },
  { label: "Account Settings", to: "/account/settings" },
  { label: "Logout", to: "/login", action: "logout" }
];

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName') || "User";

  const handleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);
  const handleProfile = () => setProfileOpen(!profileOpen);

  const handleProfileMenu = (item) => {
    setProfileOpen(false);
    if (item.action === "logout") {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      window.location.href = '/login';
    } else {
      navigate(item.to);
    }
  };

  return (
    <header className="header sticky-nav">
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <div className="xeno-logo">
              <span className="logo-text">XENO</span>
              <span className="logo-tagline">CRM</span>
            </div>
          </div>
          <div className="nav-menu">
            <div className="nav-dropdown"
              onMouseEnter={() => handleDropdown('products')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button className="nav-link" aria-haspopup="true">Products ▾</button>
              {openDropdown === 'products' && (
                <div className="dropdown-menu">
                  {products.map(item => (
                    <Link
                      key={item.label}
                      className="dropdown-item"
                      title={item.tooltip}
                      to={item.to}
                    >
                      <span className="dropdown-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="nav-dropdown"
              onMouseEnter={() => handleDropdown('solutions')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button className="nav-link" aria-haspopup="true">Solutions ▾</button>
              {openDropdown === 'solutions' && (
                <div className="dropdown-menu">
                  {solutions.map(item => (
                    <Link
                      key={item.label}
                      className="dropdown-item"
                      title={item.tooltip}
                      to={item.to}
                    >
                      <span className="dropdown-icon">{item.icon}</span>
                      {item.label}
                      <span className="dropdown-case">{item.case}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="nav-dropdown"
              onMouseEnter={() => handleDropdown('resources')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button className="nav-link" aria-haspopup="true">Resources ▾</button>
              {openDropdown === 'resources' && (
                <div className="dropdown-menu">
                  {resources.map(item => (
                    <Link
                      key={item.label}
                      className="dropdown-item"
                      to={item.to}
                    >
                      <span className="dropdown-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="nav-dropdown"
              onMouseEnter={() => handleDropdown('support')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button className="nav-link" aria-haspopup="true">Support ▾</button>
              {openDropdown === 'support' && (
                <div className="dropdown-menu">
                  {support.map(item => (
                    <Link
                      key={item.label}
                      className="dropdown-item"
                      to={item.to}
                    >
                      <span className="dropdown-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                  <div className="dropdown-sla">
                    <span>Standard SLA: 24h | Premium SLA: 2h</span>
                  </div>
                </div>
              )}
            </div>
            {/* <Link to="/pricing" className="nav-link">Pricing</Link> */}
            <Link to="/segment-builder" className="nav-link">Audience Segments</Link>
            <Link to="/campaign-history" className="nav-link">Campaign History</Link>
          </div>
          <div className="nav-actions">
            {!token ? (
              <>
                <Link to="/login" className="btn-login">Sign In</Link>
                <Link to="/signup" className="btn-signup">Start Free Trial</Link>
              </>
            ) : (
              <div className="profile-dropdown" onClick={handleProfile}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2563eb&color=fff&rounded=true&size=32`}
                  alt="avatar"
                  className="profile-avatar"
                />
                <span className="profile-name">{userName}</span>
                <span className="profile-caret">▼</span>
                {profileOpen && (
                  <div className="profile-menu">
                    {profileMenu.map(item => (
                      <button key={item.label} className="profile-menu-item" onClick={() => handleProfileMenu(item)}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
