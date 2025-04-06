import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Trivia from "./pages/Trivia";
import LeetCode from "./pages/LeetCode";
import Home from "./pages/Home";  // Create a new Home component for the home page

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>KTP Daily Challenges</h1>

        {/* Navigation Links */}
        <nav className="navbar">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/trivia" className="nav-button">Trivia</Link>
          <Link to="/leetcode" className="nav-button">LeetCode</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/leetcode" element={<LeetCode />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
