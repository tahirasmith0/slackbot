import React, { useState } from "react";
import axios from "axios";

const LeetCode = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3001/run", {
        code: code,
        language: language,
      });

      const { stdout, stderr, compile_output, message } = response.data;

      if (stderr || compile_output) {
        setOutput(stderr || compile_output);
      } else if (stdout) {
        setOutput(stdout);
      } else {
        setOutput(message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to run code");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="leetcode">
      <h2>LeetCode Problem</h2>
      <div className="language-selector">
        <label>Choose Language: </label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <h3>FizzBuzz Problem</h3>
      <pre>{`Given an integer n, return a string array answer (1-indexed) where:

answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.

Example 1:

Input: n = 3
Output: ["1", "2", "Fizz"]

Example 2:

Input: n = 5
Output: ["1", "2", "Fizz", "4", "Buzz"]`}</pre>

      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Write your solution here..."
        rows="10"
        cols="50"
      ></textarea>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? "Running..." : "Submit"}
      </button>

      <div className="output">
        {errorMessage && <p className="error">{errorMessage}</p>}
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default LeetCode;
