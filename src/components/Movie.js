import React from "react";

//Components
import Navigation from "./elements/Navigation";
import MovieInfo from "./elements/MovieInfo";
import MovieInfoBar from "./elements/MovieInfoBar";
import Actor from "./elements/Actor";
import Grid from "./elements/Grid";
import Spinner from "./elements/Spinner";

// Custom Hooks
import { useMovieFetch } from "./hooks/useMovieFetch";

const Movie = ({ movieID }) => {
  const [movie, loading, error] = useMovieFetch(movieID);
  console.log(movie.id);

  if (error) return error, "Something is wrong! Check Movie Fetch";
  if (loading) return <Spinner />;

  return (
    <>
      <Navigation movie={movie.original_title} />
      {console.log(movieID)}
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor key={actor.credit_id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
