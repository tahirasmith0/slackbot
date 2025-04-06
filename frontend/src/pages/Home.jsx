import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import Home.css

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to Daily Challenges</h2>
      <p>Choose a challenge to start:</p>
      <Link to="/trivia">
        <button className="home-button">Trivia</button>
      </Link>
      <Link to="/leetcode">
        <button className="home-button">LeetCode</button>
      </Link>
    </div>
  );
};

export default Home;

