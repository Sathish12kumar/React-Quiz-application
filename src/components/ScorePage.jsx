import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const ScorePage = () => {
  const nextPage = useNavigate();
  const { score, total } = useParams();
  const data = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        label: "Score",
        data: [score, total - score],
        backgroundColor: ["#66a5ae", "#FF0000"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="score-page">
      <h1>Your Score!</h1>
      <div className="score-board">
        <Doughnut data={data} options={options} />
        <div className="score-point">
          <div className="datas">
            <div className="correct">{score}</div> <span>/</span>{" "}
            <div className="total">{total}</div>
          </div>
          <button onClick={() => nextPage("/")}>Retake Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
