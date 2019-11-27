import React from "react";
import PropTypes from "prop-types";
import {componentMap} from '../../../util/componentMap';

class DynamicHTMLComponent extends React.Component {

  getStartTag = (component, classNames) => {
    const tag = componentMap[component];
    const classes = classNames ? classNames : "";
    if (tag) {
      return "<" + tag + " class=\"" + classes + "\">";
    }
    return "<p class=\"" + classes + "\">"
  }

  getEndTag = (component) => {
    const tag = componentMap[component];
    if (tag) {
      return "</" + tag + ">"
    }
    return "</p>";
  }

  getComponentToRender = (content) => {
    return  this.getStartTag(content.component, content.classNames) +
          content.data +
          this.getEndTag(content.component);
  }

  render(){
    const {content} = this.props;
    const DynamicComponent= this.getComponentToRender(content);
    return (
        <>
          {content &&
            <div dangerouslySetInnerHTML={{ __html: DynamicComponent }} />
          }
        </>
      )
    }
}

DynamicHTMLComponent.propTypes = {
  content:PropTypes.object
};

export default DynamicHTMLComponent;
