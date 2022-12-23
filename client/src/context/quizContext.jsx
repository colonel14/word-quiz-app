import { createContext, useReducer } from "react";

// Create Initial State of Our Quiz App
const initialState = {
  loading: true, // Initial Loading with True as we waiting to fetch Our Data
  error: null, // Initial Error of null as it will update if there is error with fetching data
  questions: [], // Initial our Quiz Questions with empty array till we fetch our data successfully and then update it with the new values
  currentQuestionIndex: 0, // Initial currentQuestionIndex to keep track of the current question and the progress of our game as it update every time we hit next-button to get the next question
  correctAnswers: 0, // Initial correctAnswers counter to keep tracking of correct answers to get the final score
  showResult: false,
  currentAnswer: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": // Case Of Successfull Fetching
      return {
        ...state,
        loading: action.payload.loading, // Set Loading to False as we successfully finished fetching
        questions: action.payload.data, // Set Question to the fetched Data
        error: null, // Set Error to null as if there was a previous error and successfully fetching our data after that make sure that error returns to default of null
      };
    case "FETCH_FAILED": // Case Of Successfull Fetching
      return {
        ...state,
        loading: action.payload.loading, // Set Loading to False as we successfully finished fetching
        error: action.payload.error, // Set Error the the error of the fetching
      };

    case "SELECT_ANSWER": // Case of Select The Answer
      const currentAnswer = action.payload; // Get The Current Answer Selected from the payload

      // Update number of correct answers if the current Answer we get from the payload === to the currentQuestionIndex
      const correctAnswers =
        state.questions[state.currentQuestionIndex].pos == currentAnswer
          ? state.correctAnswers + 1
          : state.correctAnswers;
      return {
        ...state, // Return Our State
        correctAnswers, // Update the number of correct answers
        currentAnswer, // Update the current Answer to use it to update button classes with wrong-answer or right-answer classes
      };
    case "NEXT_QUESTION": // Case of Hit Next-question Button
      // Check whether we get to the last question so we Make showResult == True
      const showResult =
        state.questions.length === state.currentQuestionIndex + 1;

      // Check Whether to update the current question index when hit next-question or just stay with the current state as we in the last question
      const currentQuestionIndex = showResult
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;

      return {
        ...state,
        currentQuestionIndex, // Update the currentQuestionIndex to get the next Question
        showResult, // Update showResult to know whether to show the result page or not yet
        currentAnswer: "", // Set CurrentAnswer to empty as we move to a new question
      };

    case "RESTART": // Case of Try-Again reset the quiz app
      return initialState;

    default:
      return state;
  }
};

export const QuizContext = createContext(); // Start our Context

// Create our Context Provider component and accept children as props to wrap all our entire application
export const QuizContextProvider = ({ children }) => {
  const value = useReducer(reducer, initialState); // Initialize our reducer function to dispatch function anywhere in the application

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
