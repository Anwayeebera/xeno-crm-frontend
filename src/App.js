import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SegmentBuilderPage from "./pages/SegmentBuilderPage";
import CampaignHistoryPage from "./pages/CampaignHistoryPage";
import ProductsPage from "./pages/ProductsPage";
import SolutionsPage from "./pages/SolutionsPage";
import ResourcesPage from "./pages/ResourcesPage";
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";
import MyCampaignsPage from "./pages/MyCampaignsPage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";

import "./styles/App.css";

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/segment-builder"
          element={
            <RequireAuth>
              <SegmentBuilderPage />
            </RequireAuth>
          }
        />
        <Route
          path="/campaign-history"
          element={
            <RequireAuth>
              <CampaignHistoryPage />
            </RequireAuth>
          }
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route
          path="/dashboard/campaigns"
          element={
            <RequireAuth>
              <MyCampaignsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/account/billing"
          element={
            <RequireAuth>
              <BillingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/account/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
