import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { audienceAPI, campaignAPI } from "../services/api";

const fields = [
  { value: "spend", label: "Spend (INR)" },
  { value: "visits", label: "Visits" },
  { value: "inactive_days", label: "Inactive for (days)" }
];

const operators = [
  { value: ">", label: ">" },
  { value: "<", label: "<" },
  { value: ">=", label: ">=" },
  { value: "<=", label: "<=" },
  { value: "=", label: "=" }
];

const defaultRule = { field: "spend", operator: ">", value: 10000 };

function SegmentBuilderPage() {
  const [rules, setRules] = useState([{ ...defaultRule }]);
  const [logic, setLogic] = useState("AND");
  const [audienceSize, setAudienceSize] = useState(null);
  const [segmentName, setSegmentName] = useState("");
  const [message, setMessage] = useState("Hi {name}, here’s 10% off on your next order!");
  const [loading, setLoading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const navigate = useNavigate();

  const handleRuleChange = (idx, key, value) => {
    setRules(rules.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  };

  const addRule = () => setRules([...rules, { ...defaultRule }]);
  const removeRule = (idx) => setRules(rules.filter((_, i) => i !== idx));

  const handlePreview = async () => {
    setPreviewing(true);
    try {
      const res = await audienceAPI.preview({ rules, logic });
      setAudienceSize(res.size);
    } catch {
      setAudienceSize("Error");
    }
    setPreviewing(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await campaignAPI.create({
        name: segmentName,
        message_template: message,
        rules: { rules, logic }
      });
      navigate("/campaign-history");
    } catch {
      alert("Failed to launch campaign");
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ maxWidth: 700 }}>
      <h2 className="card-title" style={{ marginBottom: 24 }}>Audience Segment Builder</h2>
      <div style={{ marginBottom: 20 }}>
        <label>
          <span style={{ fontWeight: 500 }}>Segment Name</span>
          <input
            value={segmentName}
            onChange={e => setSegmentName(e.target.value)}
            placeholder="e.g. High Value Inactive Customers"
            style={{ marginTop: 6 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontWeight: 500 }}>Rules</span>
        <div style={{ margin: "12px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontWeight: 500 }}>Combine with</span>
            <select value={logic} onChange={e => setLogic(e.target.value)} style={{ width: 100 }}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
          {rules.map((rule, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#f3f4f6",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 8,
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
              }}
            >
              <select
                value={rule.field}
                onChange={e => handleRuleChange(idx, "field", e.target.value)}
                style={{ minWidth: 120 }}
              >
                {fields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
              <select
                value={rule.operator}
                onChange={e => handleRuleChange(idx, "operator", e.target.value)}
                style={{ minWidth: 60 }}
              >
                {operators.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <input
                type="number"
                value={rule.value}
                onChange={e => handleRuleChange(idx, "value", e.target.value)}
                style={{ width: 100 }}
              />
              {rules.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRule(idx)}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "0 10px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                  title="Remove rule"
                >×</button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            onClick={addRule}
            style={{ marginTop: 4, fontSize: 14, padding: "6px 18px" }}
          >+ Add Rule</button>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>
          <span style={{ fontWeight: 500 }}>Message Template</span>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            style={{ width: "100%", marginTop: 6, borderRadius: 6, border: "1px solid #e5e7eb", padding: 10 }}
            placeholder="e.g. Hi {name}, here’s 10% off on your next order!"
          />
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <button
          className="btn-secondary"
          onClick={handlePreview}
          disabled={previewing}
        >
          {previewing ? "Previewing..." : "Preview Audience Size"}
        </button>
        {audienceSize !== null && (
          <span style={{
            fontWeight: 600,
            color: typeof audienceSize === "number" ? "#10b981" : "#ef4444"
          }}>
            {typeof audienceSize === "number"
              ? `Audience Size: ${audienceSize}`
              : "Error"}
          </span>
        )}
      </div>
      <button
        className="btn-primary"
        onClick={handleSave}
        disabled={loading || !segmentName}
        style={{ width: "100%", fontSize: 16, padding: "12px 0" }}
      >
        {loading ? "Launching Campaign..." : "Save & Launch Campaign"}
      </button>
    </div>
  );
}

export default SegmentBuilderPage;
