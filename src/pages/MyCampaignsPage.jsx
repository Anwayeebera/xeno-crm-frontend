import React, { useEffect, useState } from "react";
import { campaignAPI } from "../services/api";

const statusColors = {
  Sent: "#10b981",
  Scheduled: "#2563eb",
  Failed: "#ef4444"
};

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    campaignAPI.getAll().then(setCampaigns);
  }, []);

  const filtered = campaigns.filter(c =>
    (filter === "All" || c.status === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()))
  );

  // Example handlers for actions
  const handleView = (id) => {
    window.location.href = `/campaign-history?id=${id}`;
  };
  const handleEdit = (id) => {
    window.location.href = `/segment-builder?edit=${id}`;
  };
  const handleDuplicate = (id) => {
    alert("Duplicate campaign " + id);
    // Implement duplication logic here
  };

  return (
    <div className="card" style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 className="card-title" style={{ margin: 0 }}>My Campaigns</h2>
        <button className="btn-primary" onClick={() => window.location.href = "/segment-builder"}>
          Create New Campaign
        </button>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: 8, borderRadius: 6, border: "1px solid #e5e7eb" }}
        />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
          <option value="All">All Status</option>
          <option value="Sent">Sent</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Target Audience</th>
              <th>Open Rate / CTR</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <span style={{
                    color: "#fff",
                    background: statusColors[c.status] || "#6b7280",
                    borderRadius: 12,
                    padding: "2px 12px",
                    fontWeight: 600,
                    fontSize: 13
                  }}>
                    {c.status}
                  </span>
                </td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
                <td>{c.audience_segment_id || "-"}</td>
                <td>{c.open_rate ? `${c.open_rate}% / ${c.ctr || 0}%` : "-"}</td>
                <td>
                  <div className="campaign-actions">
                    <button
                      className="campaign-action-btn"
                      onClick={() => handleView(c._id)}
                    >
                      View
                    </button>
                    <button
                      className="campaign-action-btn"
                      onClick={() => handleEdit(c._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="campaign-action-btn"
                      onClick={() => handleDuplicate(c._id)}
                    >
                      Duplicate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>No campaigns found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
