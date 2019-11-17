import React from "react";
import PropTypes from "prop-types";
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

  onBreadCrumbLinkClick(newLink){
    this.props.onBreadCrumbLinkClick(newLink);
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
             && links.map(link =>
               {
                  return  <li key={link.page} className="breadcrumb-item">
                            {this.notLastLink(link)?
                              <a  href={link.page} >
                              {link.shortName}</a>
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
