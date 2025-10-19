import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const selectedVal = useRef();
  const changePath = useNavigate();
  const nextPage = () => {
    console.log(selectedVal.current.value);
    changePath(`questions/${selectedVal.current.value}`);
    console.log(selectedVal);
  };
  return (
    <div className="intro-page">
      <h1>Simple Quiz</h1>
      <p>
        I built a simple and interactive quiz application using React. The app
        allows users to answer multiple-choice questions and get instant
        feedback on their performance. It has a clean and user-friendly
        interface, making it easy for anyone to use. The questions are displayed
        one at a time, and the user’s score updates as they progress. I also
        used React components to manage the UI efficiently and React state to
        keep track of answers and scores. This project helped me improve my
        React skills and understand concepts like state management, props, and
        event handling.
      </p>
      <div className="btns">
        <div className="drop-down">
          Enter number of question:
          <select ref={selectedVal}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <button onClick={nextPage}>Submit</button>
      </div>
    </div>
  );
};

export default IntroPage;
