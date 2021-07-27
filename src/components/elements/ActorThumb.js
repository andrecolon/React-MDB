import React from "react";
import PropTypes from "prop-types";

import { StyledMovieThumb } from "../styles/StyledMovieThumb";
import { Link } from "@reach/router";

const ActorThumb = ({ image, actorID, clickable }) => (
  <StyledMovieThumb>
    {clickable ? ( //If true it will return a clickable link
      <Link to={`/${actorID}`}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
    ) : (
      /// if it is false it will not have a clickable link instead
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
);

ActorThumb.propTpes = {
  image: PropTypes.string,
  movieID: PropTypes.number,
  clickable: PropTypes.bool,
};

export default ActorThumb;
