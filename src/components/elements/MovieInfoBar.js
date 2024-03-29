import React from "react";
import PropTypes from "prop-types";

import FontAwesome from "react-fontawesome";
import { calcTime, convertMoney } from "../../helpers";

import { StyledMovieInfoBar } from "../styles/StyledMovieInfoBar";
import Movie from "../Movie";

const MovieInfoBar = ({ time, budget, revenue }) => (
  <StyledMovieInfoBar>
    <div className="movieinfobar-content">
      <div className="movieinforbar-content-col">
        <FontAwesome className="fa-time" name="clock-o" size="2x" />
        <span className="movieinfobar-info">
          Running Time: {calcTime(time)}
        </span>
        <div className="movieinforbar-content-col">
          <FontAwesome className="fa-budget" name="money" size="2x" />
          <span className="movieinfobar-info">
            Budget: {convertMoney(budget)}
          </span>
        </div>
        <div className="movieinforbar-content-col">
          <FontAwesome className="fa-revenue" name="ticket" size="2x" />
          <span className="movieinfobar-info">
            Revenue: {convertMoney(revenue)}
          </span>
        </div>
      </div>
    </div>
  </StyledMovieInfoBar>
);
MovieInfoBar.propTypes = {
  time: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number,
};
export default MovieInfoBar;
