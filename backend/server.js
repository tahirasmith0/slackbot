// server.js
import express from "express";
import { triviaQuestions} from './data.js'; // Import trivia and leaderboard data
import cors from "cors"

const app = express();
const port = 3000;

// Enable CORS if you're using different ports for frontend and backend
app.use(cors());

// Route to get trivia questions
app.get('/api/trivia', (req, res) => {
  res.json(triviaQuestions); // Send the trivia questions as a response
});

// Route to get LeetCode problems
app.get('/api/leetcode', (req, res) => {
  res.json(leetcodeProblems); // Send the LeetCode problems as a response
});

// Route to get the leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard); // Send the leaderboard data as a response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
