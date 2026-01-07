import { useEffect, useState } from "react";
import "./question.css";
import { useNavigate, useParams } from "react-router-dom";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const [timer, setTimer] = useState(id * 30);
  const nextPage = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = `https://eaxeli.com/api/v1/questions/quiz`;
    fetch(api)
      .then((res) => res.json())
      .then((res) => setQuestions(res.questions))
      .catch((err) => alert(err));

    setInterval(() => {
      setLoading(true);
    }, 1500);
  }, []);
  useEffect(() => {
    if (timer <= 0) return nextPage(`/score/${score}/${id}`);
    let time;
    time = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(time);
  }, [timer]);
  const checkanswer = (e) => {
    console.log(selected);
    console.log(questions);

    if (questions?.[count]?.answer == e) {
      setScore((num) => num + 1);
    }
    setSelected([...selected, count]);
  };

  return (
    <div className="quiz-box">
      <div className="timer">
        <span>Quiz</span>
        <p>Timer: {timer}s</p>
      </div>
      <div className="loader"></div>
      {!loading ? (
        <p className="load">loading...</p>
      ) : (
        <div className="question-box">
          <div className="question">
            <span>{count + 1}. </span>
            {questions?.[count]?.question}
          </div>
          <div className="options">
            <ul style={{ "--count": "" }}>
              {questions?.[count]?.type == "multiple-choice" ? (
                questions?.[count]?.options?.map((opt, id) => (
                  <li
                    className={selected.includes(count) ? "hide" : "none"}
                    onClick={() => checkanswer(opt)}
                    key={id}
                  >
                    {opt}
                  </li>
                ))
              ) : (
                <ul className={selected.includes(count) ? "hide" : "none"}>
                  <li onClick={() => checkanswer("True")}>true</li>
                  <li onClick={() => checkanswer("False")}>false</li>
                </ul>
              )}
            </ul>
          </div>
          <div className="bottom">
            <div className="hint">hint: {questions?.[count]?.hint}</div>
            <div className="btn">
              <button
                onClick={() => setCount((num) => num - 1)}
                className={count <= 0 ? "hide" : "none"}
              >
                prev
              </button>

              {count >= id - 1 ? (
                <button onClick={() => nextPage(`/score/${score}/${id}`)}>
                  submit
                </button>
              ) : (
                <button
                  onClick={() => setCount((num) => num + 1)}
                  className={count >= id - 1 ? "hide" : "none"}
                >
                  next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
