import { useState, useEffect } from "react";
import { POPULAR_BASE_URL } from "../../config";

export const useHomeFetch = (searchTerm) => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(state);

  const fetchMovies = async (endpoint) => {
    setError(false);
    setLoading(true);

    // return -1 page - if we load more movies we want to append
    const isLoadMore = endpoint.search("page");

    try {
      //await is addded twice - 1 to get the data and the 2 is to parse the datea into json format
      const result = await (await fetch(endpoint)).json();
      //console.log(result)
      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results]
            : [...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (error) {
      setError(true);
      //console.log(error)
    }
    setLoading(false);
  };

  useEffect(() => {
    // if(sessionStorage.homeState){
    //     console.log("Grabbing from sessionStorage")
    //     setState(JSON.parse(sessionStorage.homeState))
    //     setLoading(false)
    // } else {
    fetchMovies(POPULAR_BASE_URL);
    // }
  }, []); // Need a dependancy array in order to stop an infinite render

  useEffect(() => {
    if (!searchTerm) {
      console.log("Writing to sessionStorage");
      sessionStorage.setItem("homestate", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return [{ state, loading, error }, fetchMovies];
};
