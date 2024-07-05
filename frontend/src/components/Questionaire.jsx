// components/Home/Questionaire.jsx
import { useState, useEffect } from "react";
import Qa from "./qa";

const API_BASE_URL = "http://localhost:3000/api"; // Replace with your actual API base URL

const Questionaire = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/random`);
      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }
      const data = await response.json();
      setQuestion(data);
      setAnswer(""); // Clear previous answer when fetching new question
      setValidationMessage("");
    } catch (error) {
      console.error("Error fetching question:", error);
      // Handle error gracefully
    }
  };

  const handleOnAnswer = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: question.id, answer }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }
      const data = await response.json();
      // Assuming the API response includes correct and correctAnswer fields
      if (data.correct) {
        setValidationMessage("Correct!");
      } else {
        setValidationMessage("Incorrect. Correct answer: " + data.correctAnswer);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setValidationMessage("Failed to submit answer. Please try again.");
    }
  };

  const handleNextQuestion = () => {
    fetchRandomQuestion();
  };

  return (
    <>
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 ">
        {question && (
          <>
            <Qa q={question} onAnswer={handleOnAnswer} />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              style={{ zIndex: 10 }}
            >
              Submit
            </button>
            {validationMessage && (
              <p className={`mt-2 ${validationMessage.includes("Correct") ? "text-green-600" : "text-red-600"}`}>
                {validationMessage}
              </p>
            )}
            <button
              onClick={handleNextQuestion}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Next Question
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Questionaire;
