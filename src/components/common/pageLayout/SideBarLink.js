import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";


class SideBarLink extends React.Component {
  state = {};

  onLinkClick = (newPage)=> {
    if(newPage != this.props.currentLoadedPage){
      console.log("SideBarLink -> currentLoadedPage:"+this.props.currentLoadedPage+", newPage: "+newPage
            +", parentPages"+this.props.parentPages);
      this.props.parentLinkChangeHandler(this.props.currentLoadedPage, this.props.parentPages, newPage);
    }else{
      console.log("SideBarLink -> current loaded page is same currentLoadedPage:"+this.props.currentLoadedPage
        +", newPage: "+newPage);
    }
  }

  getParentRouteURL(){
    const {parentPages} = this.props;
    let parentRouteURL = ""
    for(let index=0; index < parentPages.length; index++){
      parentRouteURL = parentRouteURL+ parentPages[index].page +"/";
    }
    return parentRouteURL;
  }

  getParentPages(link){
    const parentPages = this.props.parentPages.slice();
    parentPages.push({key:link.page, page:link.page, name:link.name,shortName:link.shortName})
    return parentPages;
  }

  render() {
    const { link, parentLinkChangeHandler, currentLoadedPage, parentPages} = this.props;
    return (
      <>
        {link && link.subLinks && link.subLinks.length !=0 && parentPages?
          (
              <li key={link.key}>
                  <NavLink to={this.getParentRouteURL()+link.page} onClick={() => this.onLinkClick(link)}
                      className={currentLoadedPage.page == link.page?"activeLink borderedLink":"borderedLink"}>
                      <i className={link.iconClass}/>{link.name}
                  </NavLink>
                  <a href={"#"+link.key+"-ul"}
                      data-toggle="collapse" aria-expanded="false"
                      className="preDropDownAnchor dropdown-toggle collapsed">
                  </a>
                <ul className="collapse list-unstyled" id={link.key+"-ul"}>
                  {link.subLinks.map(subLink => {
                      return <SideBarLink link={subLink} parentLinkChangeHandler={parentLinkChangeHandler} key={subLink.key}
                                parentPages={this.getParentPages(link)}
                                currentLoadedPage={currentLoadedPage}/>;
                    })
                  }
                </ul>
            </li>
          ):
          (
            <li>
                {parentPages &&
                  <NavLink key={link.key} to={this.getParentRouteURL()+link.page}
                      className={currentLoadedPage.page == link.page?"activeLink  borderedLink":" borderedLink"}
                     onClick={() => this.onLinkClick(link)}><i className=
                     {link.iconClass}/>{link.name}
                  </NavLink>
                }
              </li>
          )
        }
      </>
    );
  }
}

SideBarLink.propTypes = {
  link: PropTypes.object.isRequired,
  parentLinkChangeHandler: PropTypes.func.isRequired,
  parentPages: PropTypes.array,
  currentLoadedPage: PropTypes.object.isRequired
};

export default SideBarLink;
