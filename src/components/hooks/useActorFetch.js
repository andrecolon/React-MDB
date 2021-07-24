import { useState, useEffect, useCallback } from "react";
import { API_URL, API_KEY } from "../../config";

//https://developers.themoviedb.org/3/people/get-person-movie-credits
export const useActorFetch = (movieID) => {
  const [state, setState] = useState({}); //empty state with object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${API_URL}movie/${movieID}?api_key=${API_KEY}`;
      const result = await (await fetch(endpoint)).json();
      console.log("This is my result", result);
      const creditsEndpoint = `${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`;
      const creditsResults = await (await fetch(creditsEndpoint)).json();
      const directors = creditsResults.crew.filter(
        (member) => member.job === "Director"
      );
      console.log("Looking for directors", result, directors.job);

      setState({
        ...result,
        actors: creditsResults.cast,
        directors,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [movieID]);

  useEffect(() => {
    // if (localStorage[movieID]) {
    //     setState(JSON.parse(localStorage[movieID]));
    //     setLoading(false);
    // } else {
    fetchData();
    //}
  }, [fetchData, movieID]);

  useEffect(() => {
    localStorage.setItem(movieID, JSON.stringify(state));
  }, [movieID, state]);

  return [state, loading, error];
};
