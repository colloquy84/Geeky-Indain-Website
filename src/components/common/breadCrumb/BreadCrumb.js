import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./breadCrumb.css";

class BreadCrumb extends React.Component {
  state = {};

  getLinksForBreadCrumb(links){
    const linksForBreadCrumb = [];
    if(links && links.length >0){
      for(let index =0; index < links.length; index++){
        const link =links[index];
        if(index == 0){
          linksForBreadCrumb.push({page:link.page, shortName:link.shortName, originalPageLink:link.page})
        }else{
          linksForBreadCrumb.push({page:linksForBreadCrumb[index -1].page+"/"+link.page,
                shortName:link.shortName, originalPageLink:link.page})
        }
      }
    }
    return linksForBreadCrumb;
  }

  onBreadCrumbLinkClick = (index) =>{
    const {links} = this.props;
    this.props.onBreadCrumbLinkClick(links, links[index]);
  }

  notLastLink(link, links){
    return link.originalPageLink != links[links.length - 1].page
  }

  render(){
    return (
      <div id="breadCrumb" className="d-none d-md-inline-block">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/"><i className="fa fa-home"/></a></li>
          {this.props.links && this.props.links.length >0
             && this.getLinksForBreadCrumb(this.props.links).map((link, index) =>
               {
                  return  <li key={link.page} className="breadcrumb-item">
                            {this.notLastLink(link, this.props.links)?
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
