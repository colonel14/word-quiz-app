import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/quizContext";

export const useFetch = (url) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url); // Fetch Our Data from the url specified

        // Case of Fetch_success in the reducer function whick will update loading to flase and assign fetched data to the question
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { loading: false, data: data.result },
        });

        setResult(data);
      } catch (error) {
        // Case of Fetch_failed set loading to false and show the eror
        dispatch({
          type: "FETCH_FAILED",
          payload: { loading: false, error: error },
        });
      }
    };
    fetchData();
  }, [url, quizState.showResult]); // Watch any Change in the url or the showResult to refetch our Data

  return result;
};
