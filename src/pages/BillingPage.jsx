import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";

export default function BillingPage() {
  const [plan, setPlan] = useState(null);
  const [payment, setPayment] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState("Pro");
  const [upgradeCycle, setUpgradeCycle] = useState("Yearly");
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardInput, setCardInput] = useState("");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [cumulative, setCumulative] = useState(0);

  useEffect(() => {
    billingAPI.getPlan().then(setPlan);
    billingAPI.getPaymentMethod().then(setPayment);
    billingAPI.getUpcoming().then(setUpcoming);
    billingAPI.getInvoices(yearFilter).then(data => {
      setInvoices(data);
      setCumulative(data.reduce((sum, inv) => sum + (inv.amount || 0), 0));
    });
  }, [yearFilter]);

  const handleUpgrade = async () => {
    await billingAPI.upgrade({ plan: upgradePlan, billingCycle: upgradeCycle });
    setShowUpgrade(false);
    billingAPI.getPlan().then(setPlan);
    billingAPI.getUpcoming().then(setUpcoming);
    alert("Plan upgraded!");
  };

  const handleCardSave = async () => {
    await billingAPI.saveCard({ card: cardInput });
    setShowCardModal(false);
    billingAPI.getPaymentMethod().then(setPayment);
    alert("Card updated!");
  };

  return (
    <div className="card" style={{ maxWidth: 700 }}>
      <h2 className="card-title">Billing & Invoices</h2>
      <div style={{ marginBottom: 24 }}>
        <strong>Current Plan:</strong>{" "}
        {plan ? `${plan.type} (${plan.billingCycle})` : "Loading..."}
        <button className="btn-primary" style={{ marginLeft: 12 }} onClick={() => setShowUpgrade(true)}>
          Upgrade
        </button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <strong>Payment Method:</strong>{" "}
        {payment ? payment.display : "No card on file"}
        <button className="btn-secondary" style={{ marginLeft: 12 }} onClick={() => setShowCardModal(true)}>
          Add/Edit Card
        </button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <strong>Upcoming Charges:</strong>{" "}
        {upcoming ? (
          <>
            ₹{upcoming.amount} on {new Date(upcoming.date).toLocaleDateString()}{" "}
            {upcoming.discount ? (
              <span style={{ color: "#10b981", marginLeft: 16 }}>
                Save {upcoming.discount}% with yearly plan!{" "}
                <button className="btn-secondary" style={{ fontSize: 12, marginLeft: 8 }} onClick={() => setShowUpgrade(true)}>
                  Switch to yearly
                </button>
              </span>
            ) : null}
          </>
        ) : "Loading..."}
      </div>
      <div style={{ marginBottom: 24 }}>
        <strong>Invoice History:</strong>
        <div style={{ margin: "8px 0 8px 0" }}>
          <label>
            Filter by year:{" "}
            <select value={yearFilter} onChange={e => setYearFilter(Number(e.target.value))}>
              {[2024, 2023, 2022].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>
        </div>
        <ul style={{ marginTop: 8 }}>
          {invoices.map(inv => (
            <li key={inv.month}>
              {inv.month} - ₹{inv.amount}
              <a
                href={inv.url}
                download
                style={{ marginLeft: 12, color: "#2563eb", textDecoration: "underline" }}
              >
                Download PDF
              </a>
              <button
                className="btn-secondary"
                style={{ marginLeft: 8, fontSize: 12, padding: "2px 10px" }}
                onClick={() => billingAPI.emailInvoice(inv.url)}
              >
                Email Invoice
              </button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 12, color: "#10b981" }}>
          Cumulative Spend: ₹{cumulative}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Upgrade Plan</h3>
            <div>
              <label>
                Plan:
                <select value={upgradePlan} onChange={e => setUpgradePlan(e.target.value)}>
                  <option value="Startup">Startup</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Billing Cycle:
                <select value={upgradeCycle} onChange={e => setUpgradeCycle(e.target.value)}>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly (Save 20%)</option>
                </select>
              </label>
            </div>
            <div style={{ margin: "1rem 0" }}>
              <strong>
                {upgradePlan} ({upgradeCycle}) = ₹
                {upgradePlan === "Startup" ? (upgradeCycle === "Yearly" ? 8000 : 999) :
                 upgradePlan === "Pro" ? (upgradeCycle === "Yearly" ? 16000 : 1999) :
                 (upgradeCycle === "Yearly" ? 32000 : 3999)}
                /{upgradeCycle === "Yearly" ? "yr" : "mo"}
              </strong>
            </div>
            <button className="btn-primary" onClick={handleUpgrade}>Confirm Upgrade</button>
            <button className="btn-secondary" onClick={() => setShowUpgrade(false)} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {showCardModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add/Edit Card</h3>
            <input
              type="text"
              placeholder="Card Number (simulate: 4242 4242 4242 4242)"
              value={cardInput}
              onChange={e => setCardInput(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <button className="btn-primary" onClick={handleCardSave}>Save Card</button>
            <button className="btn-secondary" onClick={() => setShowCardModal(false)} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
