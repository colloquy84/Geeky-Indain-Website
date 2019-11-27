import React from "react";
import SideBarWrapper from "../common/pageLayout/SideBarWrapper";
import PropTypes from "prop-types";

const JavaHome = ({match}) => (
  <SideBarWrapper pageType="javaHome" parentRouteUrl={match.path}/>
);

JavaHome.propTypes = {
  match:PropTypes.object,
};

export default JavaHome;
