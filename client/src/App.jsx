import { useContext, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";
import Question from "./components/Question";
import { QuizContext } from "./context/quizContext";

function App() {
  const [quizState, dispatch] = useContext(QuizContext);

  useFetch("http://localhost:3000/api/v1/words"); // Fetch our Data

  return (
    <div className="App">
      <div>
        <h1>Words Quiz App</h1>
        <div className="card">
          {/* Check wherether our quizState is loading or not to render question or loading message */}
          {!quizState.loading && !quizState.error ? (
            <Question />
          ) : (
            <p>Loading....</p>
          )}
          {/* Check wherether if there is an error in fetching or not to render Error Message */}
          {quizState.error && (
            <p className="error-msg">Error While Fetching Data</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
