// Trivia.jsx
import React, { useEffect, useState } from "react";
import "./Trivia.css";

const Trivia = () => {
  const [trivia, setTrivia] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch trivia question from the API
    fetch("http://localhost:3000/api/trivia")
      .then((response) => response.json())
      .then((data) => setTrivia(data))
      .catch((error) => console.error("Error fetching trivia:", error));
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setIsAnswered(true);
  };

  const currentQuestion = trivia ? trivia[currentQuestionIndex] : null;

  return (
    <div className="trivia">
      <h2>Trivia Question</h2>
      {currentQuestion ? (
        <>
          <p>{currentQuestion.question}</p>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${isAnswered ? "disabled" : ""}`}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {!isAnswered && (
            <button className="submit-button" onClick={handleSubmit}>
              Submit Answer
            </button>
          )}
          {isAnswered && (
            <div className="result">
              {selectedAnswer === currentQuestion.answer ? (
                <p className="correct">Correct!</p>
              ) : (
                <p className="incorrect">
                  Incorrect. The correct answer was: {currentQuestion.answer}
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Loading trivia...</p>
      )}
    </div>
  );
};

export default Trivia;
