import React, { useState } from "react";
import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
} from "./config";

//Import Components

import HeroImage from "./components/elements/HeroImage";
import SearchBar from "./components/elements/Searchbar";
import Grid from "./components/elements/Grid";
import MovieThumb from "./components/elements/MovieThumb";
import Spinner from "./components/elements/Spinner";
import LoadMoreBtn from "./components/elements/LoadMoreBtn";

//Custom hook
import { useHomeFetch } from "./components/hooks/useHomeFetch";
import NoImage from "./components/images/no_image.jpg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [
    {
      //We can destructure the 'state' further by multilevel destructuring
      //This is done so 'state.props' is not constantly called, instead we are structuring out the properties to be used
      state: { movies, currentPage, totalPages, heroImage },
      loading,
      error,
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);

  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  const loadMoreMovies = () => {
    const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${
      currentPage + 1
    }`;
    const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;
    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;

    fetchMovies(endpoint);
  };
  if (error) return <div>Something is amiss... </div>;
  if (!movies[0]) return <Spinner />;
  return (
    <>
      {!searchTerm && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
          title={heroImage.original_title}
          text={heroImage.overview}
        />
      )}
      <SearchBar callback={searchMovies} />
      {/* Only prop in the grid component - hearder */}
      <Grid header={searchTerm ? "search result" : "popular movies"}>
        {movies.map((movie) => (
          //Always specify a key
          <MovieThumb
            key={movie.id}
            // /* JSX will set this event as true..don't worry about it */
            clickable
            image={
              movie.poster_path // look for the movie path
                ? //if it doesnt exsist -
                  `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage //return proxy img - see import on 23
            }
            movieID={movie.id}
            movieName={movie.original_title}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
      <Spinner />
    </>
  );
};
//We don't always want to use a div to wrap components - thus React fragments <React.fragment></React.fragment> or implicit return

export default Home;
