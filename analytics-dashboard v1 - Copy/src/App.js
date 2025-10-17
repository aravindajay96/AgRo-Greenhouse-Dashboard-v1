import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import EnergyWater from "./EnergyWater";
import PlantDetails from "./PlantDetails";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar (left side icons) */}
        <Sidebar />

        {/* Main content (page view) */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/energy" element={<EnergyWater />} />
            <Route path="/plants" element={<PlantDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
