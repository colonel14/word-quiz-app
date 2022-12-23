import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/quizContext";

function Result() {
  const [rank, setRank] = useState(0);
  const [quizState, dispatch] = useContext(QuizContext);
  // Calculate The score
  const score = (quizState.correctAnswers / quizState.questions.length) * 100;

  useEffect(() => {
    // Post Request to get the rank of the score
    const getRank = async () => {
      const {
        data: { rankPos },
      } = await axios.post("http://localhost:3000/api/v1/rank", {
        score: score,
      });
      setRank(rankPos);
    };

    getRank();
  }, [score]);

  return (
    <div className="result">
      <h2>Congrtulations!</h2>
      <div className="rank">
        <p>{rank}</p>
        <p>Rank</p>
      </div>
      <p className="score">
        You've got{" "}
        <span>
          {`${quizState.correctAnswers} / ${quizState.questions.length}`}{" "}
          correct!
        </span>
      </p>
      <button className="restart" onClick={() => dispatch({ type: "RESTART" })}>
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
