import React, { useState } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "User",
    email: "user@example.com",
    org: "Acme Inc.",
    timezone: "Asia/Kolkata",
    notifications: true
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="card" style={{ maxWidth: 700 }}>
      <h2 className="card-title">Account Settings</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label>Name</label>
          <input name="name" value={profile.name} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input name="email" value={profile.email} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Organization</label>
          <input name="org" value={profile.org} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Timezone</label>
          <select name="timezone" value={profile.timezone} onChange={handleChange}>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={profile.notifications}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Enable Email Notifications
          </label>
        </div>
        <button className="btn-primary" type="button">Save Changes</button>
      </form>
    </div>
  );
}
