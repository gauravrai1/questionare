import React from "react";

const Qa = ({ q = {}, onAnswer, inputClass }) => {
  const { id, question, options } = q;

  const handleInputChange = (e) => {
    onAnswer(e.target.value);
  };

  const handleSelectChange = (e) => {
    onAnswer(e.target.value);
  };

  return (
    <div>
      {options ? (
        <div className="mb-4">
          <label htmlFor={`question-${id}`} className="block font-bold mb-2">
            {question}
          </label>
          <select
            id={`question-${id}`}
            className={`border rounded px-3 py-2 w-full ${inputClass}`}
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mb-4">
          <label htmlFor={`question-${id}`} className="block font-bold mb-2">
            {question}
          </label>
          <input
            type="text"
            id={`question-${id}`}
            className={`border rounded px-3 py-2 w-full ${inputClass}`}
            placeholder="Enter your answer"
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default Qa;
