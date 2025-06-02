import React, { useEffect, useState } from "react";
import { campaignAPI } from "../services/api";

function CampaignHistoryPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      const data = await campaignAPI.getAll();
      setCampaigns(data || []);
      setLoading(false);
      // Fetch stats for each campaign
      for (const c of data) {
        campaignAPI.getStats(c._id).then(s => setStats(prev => ({ ...prev, [c._id]: s })));
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: "4.5rem auto 2rem auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2 className="card-title" style={{ textAlign: "center", marginBottom: 24, marginTop: 0 }}>Campaign History</h2>
      {loading ? <p>Loading...</p> : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created</th>
                <th>Audience Size</th>
                <th>Sent</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.created_at).toLocaleString()}</td>
                  <td>{stats[c._id]?.audienceSize ?? "-"}</td>
                  <td>{stats[c._id]?.sent ?? "-"}</td>
                  <td>{stats[c._id]?.failed ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CampaignHistoryPage;
