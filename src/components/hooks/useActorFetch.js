import { useState, useEffect, useCallback } from "react";
import { API_URL, API_KEY } from "../../config";

//https://developers.themoviedb.org/3/people/get-person-movie-credits
export const useActorFetch = (actorID) => {
  const [state, setState] = useState({}); //empty state with object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${API_URL}person/${actorID}/movie_credits?api_key=${API_KEY}`;
      console.log(endpoint);
      const result = await (await fetch(endpoint)).json();
      console.log("This is my actor's result", result);
      const creditsEndpoint = `${API_URL}movie/${actorID}/credits?api_key=${API_KEY}`;
      const movie_credits = await (await fetch(creditsEndpoint)).json();
      const person_id = movie_credits.person_id.filter(
        (mCredits) => (mCredits.known_for_department = person_id)
      );
      console.log(person_id);
      setState({
        ...result,
        actors: movie_credits.cast,
        person_id,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [actorID]);

  useEffect(() => {
    // if (localStorage[actorID]) {
    //     setState(JSON.parse(localStorage[actorID]));
    //     setLoading(false);
    // } else {
    fetchData();
    //}
  }, [fetchData, actorID]);

  // useEffect(() => {
  //   localStorage.setItem(actorID, JSON.stringify(state));
  // }, [movieID, state]);

  return [state, loading, error];
};
