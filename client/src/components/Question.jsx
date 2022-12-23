import React, { useContext } from "react";
import { QuizContext } from "../context/quizContext";
import Result from "./Result";

const answers = ["noun", "adverb", "adjective", "verb"]; // Create Arrays of answers to map through it to make our code clean
function Question() {
  const [quizState, dispatch] = useContext(QuizContext);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex]; // Get the Current Question by the currentQuestionIndex

  // Check if the Answer is correct if there is currentAnswer set to the context
  const isCorrectAnswer =
    quizState.currentAnswer && currentQuestion.pos === quizState.currentAnswer;

  // Check if the Answer is wrong if there is currentAnswer set to the context

  const isWrongAnswer =
    quizState.currentAnswer && currentQuestion.pos !== quizState.currentAnswer;

  // Set Correct Class if the Answer is correct
  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : "";

  // Set Wrong Class if the Answer is correct
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";

  // Set Disable Class if the Answer is selected to disable any other select to another answer
  const disabledClass = quizState.currentAnswer ? "disabled-answer" : "";

  // Calaculate the progress of the Quiz by using the currentQuestionIndex with indicate the numbers of answered questions
  const progress =
    (quizState.currentQuestionIndex / quizState.questions.length) * 100;

  // If Select Answer
  const selectAnswer = (ans) => {
    // Call the dispatch of SELECT_ANSWER and pass the answer as payload to set the currentAnswer in the context to this payload
    dispatch({ type: "SELECT_ANSWER", payload: ans });
  };
  return (
    <div className="question">
      {!quizState.showResult && (
        <>
          <div className="progress" style={{ width: `${progress}%` }}></div>
          <h2>{currentQuestion.word}</h2>
          <div className="answers">
            {answers.map((answer, index) => (
              <button
                key={index}
                className={
                  quizState.currentAnswer === answer
                    ? ` ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`
                    : `${disabledClass}`
                }
                onClick={() => {
                  selectAnswer(answer);
                }}
              >
                {answer}
              </button>
            ))}
          </div>

          {quizState.currentAnswer && (
            <button
              className="next-button"
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            >
              Next Question
            </button>
          )}
        </>
      )}

      {quizState.showResult && (
        <>
          <Result />
        </>
      )}
    </div>
  );
}

export default Question;
