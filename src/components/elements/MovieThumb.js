import React from "react";
import PropTypes from "prop-types";

import { StyledMovieThumb } from "../styles/StyledMovieThumb";
import { Link } from "@reach/router";

const MovieThumb = ({ image, movieID, clickable }) => (
  <StyledMovieThumb>
    {clickable ? ( //If true it will return a clickable link
      <Link to={`/${movieID}`}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
    ) : (
      /// if it is false it will not have a clickable link instead
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

MovieThumb.propTpes = {
  image: PropTypes.string,
  movieID: PropTypes.number,
  clickable: PropTypes.bool,
};

export default MovieThumb;
