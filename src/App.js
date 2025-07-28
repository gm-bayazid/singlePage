import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<LandingPage scrollTo="contact" />} />
      <Route path="/pricing" element={<LandingPage scrollTo="pricing" />} />
      <Route path="/features" element={<LandingPage scrollTo="features" />} />
    </Routes>
  );
}

export default App;
