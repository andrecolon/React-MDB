import React from "react";
import PropTypes from "prop-types";
import { StyledGrid, StyledGridContent } from "../styles/StyledGrid";

const Grid = ({ header, children }) => (
  //Use the children prop to grab the components that are nested inside the of the component we are in
  //The children will contain all the movie thumbs that were MAPPED out on home page
  <StyledGrid>
    <h1>{header}</h1>

    <StyledGridContent>{children}</StyledGridContent>
  </StyledGrid>
);

Grid.propTypes = {
  header: PropTypes.string,
};
export default Grid;
