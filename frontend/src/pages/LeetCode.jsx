import React, { useState } from 'react';
import './LeetCode.css';

const LeetCode = () => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isTestPassed, setIsTestPassed] = useState(false);

  const testCases = [
    { input: 3, expectedOutput: ['1', '2', 'Fizz'] },
    { input: 5, expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz'] },
    // More test cases can be added here
  ];

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const runTests = () => {
    let allTestsPassed = true;
    const results = testCases.map((testCase, index) => {
      const userOutput = runUserCode(testCase.input);
      const isTestPassed = JSON.stringify(userOutput) === JSON.stringify(testCase.expectedOutput);
      if (!isTestPassed) allTestsPassed = false;

      return {
        test: `Test ${index + 1}`,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        userOutput: userOutput,
        passed: isTestPassed,
      };
    });

    setTestResults(results);
    setIsTestPassed(allTestsPassed);
  };

  const runUserCode = (input) => {
    try {
      // Dynamically evaluating the user's code
      // This is an unsafe method and should only be used in a controlled environment
      const func = new Function('n', code);
      return func(input);
    } catch (error) {
      setFeedback('Error in your code. Please check the syntax.');
      return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTestPassed) {
      setFeedback('All tests passed! Solution submitted.');
    } else {
      setFeedback('Some tests failed. Keep trying!');
    }
  };

  return (
    <div className="leetcode">
      <h2>LeetCode Problem: FizzBuzz</h2>
      <h3>
        Given an integer n, return a string array answer (1-indexed) where:
        <ul>
          <li>answer[i] == "FizzBuzz" if i is divisible by 3 and 5.</li>
          <li>answer[i] == "Fizz" if i is divisible by 3.</li>
          <li>answer[i] == "Buzz" if i is divisible by 5.</li>
          <li>answer[i] == i (as a string) if none of the above conditions are true.</li>
        </ul>
      </h3>

      <h4>Example:</h4>
      <p>Input: n = 5</p>
      <p>Output: ["1", "2", "Fizz", "4", "Buzz"]</p>

      <form onSubmit={handleSubmit} className="leetcode-form">
        <label htmlFor="code">Your Code (JavaScript):</label>
        <textarea
          id="code"
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your solution here..."
          rows="6"
          className="code-box"
        />

        <button type="button" onClick={runTests} className="test-button">
          Test Your Code
        </button>

        <button type="submit" className="submit-button" disabled={!isTestPassed}>
          Submit Solution
        </button>
      </form>

      {feedback && <p className="feedback">{feedback}</p>}

      <div className="test-results">
        {testResults.length > 0 && (
          <div>
            <h4>Test Results:</h4>
            <ul>
              {testResults.map((result, index) => (
                <li key={index} className={result.passed ? 'passed' : 'failed'}>
                  <strong>{result.test}</strong>: <br />
                  Input: {result.input} <br />
                  Expected: {JSON.stringify(result.expectedOutput)} <br />
                  Your Output: {JSON.stringify(result.userOutput)} <br />
                  <span className={result.passed ? 'passed' : 'failed'}>
                    {result.passed ? 'Passed' : 'Failed'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeetCode;
