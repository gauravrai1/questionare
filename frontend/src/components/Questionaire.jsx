// components/Home/Questionaire.jsx
import { useState, useEffect } from "react";
import Qa from "./qa";

const API_BASE_URL = "http://localhost:3000/api"; // Replace with your actual API base URL

const Questionaire = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [buttonClass, setButtonClass] = useState("bg-blue-500 dark:md:hover:bg-blue-600"); // Initialize buttonClass state

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
      setInputClass("");
      setButtonClass("bg-blue-500 dark:md:hover:bg-blue-600"); // Reset button class for new question
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
        setInputClass("border-green-500 bg-green-100");
        setButtonClass("bg-green-500 dark:md:hover:bg-green-600"); // Reset button class on correct answer
      } else {
        setValidationMessage("Incorrect");
        setAnswer("");
        setInputClass("border-red-500 bg-red-100");
        setButtonClass("bg-red-500 dark:md:hover:bg-red-600"); // Set the button class to red on incorrect answer
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
            <Qa q={question} onAnswer={handleOnAnswer} inputClass={inputClass} />
            <button
              onClick={handleSubmit}
              className={`${buttonClass} text-white font-bold py-2 px-4 rounded mt-4 w-full`}
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
