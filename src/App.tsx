import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { IndexTrips } from "./pages/trips";
import { TripsDetail } from "./pages/trips/components/detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexTrips />} />
      <Route path="/:tag" element={<IndexTrips />} />
      <Route path="/detail/:id" element={<TripsDetail />} />
    </Routes>
  );
}

export default App;
