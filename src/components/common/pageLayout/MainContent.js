import React from "react";
import PropTypes from "prop-types";

const MainContent = ({ pageContent }) => (
  <div>
      <h3>{pageContent.heading}</h3>
      {pageContent.dataList && pageContent.dataList.map((content, index) => {
        return (
          <p key={index}>{content.data}</p>
        );
      })}
  </div>
);

MainContent.propTypes = {
  pageContent: PropTypes.object.isRequired
};

export default MainContent;
