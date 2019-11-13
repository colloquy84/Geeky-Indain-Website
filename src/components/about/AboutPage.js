import React from "react";
import SideBarWrapper from "../common/pageLayout/SideBarWrapper";
import PropTypes from "prop-types";

const AboutPage = ({match}) => (
  <SideBarWrapper pageType="about" parentRouteUrl={match.path}/>
);

AboutPage.propTypes = {
  match:PropTypes.object,
};

export default AboutPage;
