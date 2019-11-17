import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./breadCrumb.css";

class BreadCrumb extends React.Component {
  state = {links:[]};

  componentWillReceiveProps(newProps){
    const {links} = newProps;
    if(links && links.length >0){
      const stateLinks = [];
      for(let index =0; index < links.length; index++){
        const link =links[index];
        if(index == 0){
          stateLinks.push({page:link.page, shortName:link.shortName})
        }else{
          stateLinks.push({page:stateLinks[index -1].page+"/"+link.page, shortName:link.shortName})
        }
      }
      this.setState({links:stateLinks})
    }
  }

  onBreadCrumbLinkClick(index){
    const {propLinks} = this.state;
    this.props.onBreadCrumbLinkClick(propLinks[index]);
  }

  notLastLink(link){
    const {links} = this.state;
    return link.page != links[links.length - 1].page
  }

  render(){
    const {links} = this.state;
    return (
      <div id="breadCrumb">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/"><i className="fa fa-home"/></a></li>
          {links && links.length >0
             && links.map((link, index) =>
               {
                  return  <li key={link.page} className="breadcrumb-item">
                            {this.notLastLink(link)?
                              <NavLink  to={link.page} onClick={() => this.onBreadCrumbLinkClick(index)}>
                              {link.shortName}</NavLink>
                            :
                              <span>{link.shortName}</span>
                            }
                          </li>
              }
             )}
           </ol>
         </nav>
      </div>
    );
  }
}

BreadCrumb.propTypes = {
  links: PropTypes.array,
  onBreadCrumbLinkClick: PropTypes.func.isRequired
};

export default BreadCrumb;
