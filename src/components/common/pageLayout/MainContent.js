import React from "react";
import PropTypes from "prop-types";

const MainContent = ({ pageContent, colapseLinkClicked}) => (
  <div id="content">
      <button type="button" id="sidebarCollapse" className="btn btn-info mb-2 mt-1" onClick={() => colapseLinkClicked()}>
          <i className="fas fa-align-left"></i>
          <span></span>
      </button>
      <h3>{pageContent.heading}</h3>
      {pageContent.dataList && pageContent.dataList.map((content, index) => {
        return (
          <p key={index}>{content.data}</p>
        );
      })}
  </div>
);

MainContent.propTypes = {
  pageContent: PropTypes.object.isRequired,
  colapseLinkClicked: PropTypes.func.isRequired

};

export default MainContent;
