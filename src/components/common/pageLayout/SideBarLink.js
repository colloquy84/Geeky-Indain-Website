import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";


class SideBarLink extends React.Component {
  state = {};

constructor(props){
  super(props);
  this.isIntialLoad = true;
}


  onLinkClick = (newPage)=> {
    if(newPage != this.props.currentLoadedPage){
      console.log("SideBarLink -> currentLoadedPage:", this.props.currentLoadedPage+", newPage: "+newPage
            +", parentPages"+this.props.parentPages);
      this.props.parentLinkChangeHandler(this.props.currentLoadedPage, this.props.parentPages, newPage);
    }else{
      console.log("SideBarLink -> current loaded page is same currentLoadedPage:",this.props.currentLoadedPage
        +", newPage: ", newPage);
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


  isCurrentLoadedPageIsChildrenOfTheseLinks(allLinks, currentPageLink){
    let currrentPage = null;
    for(let index =0; index < allLinks.length; index++){
      if(allLinks[index].page == currentPageLink){
        currrentPage = allLinks[index];
        break;
      }
      if(allLinks[index].subLinks && allLinks[index].subLinks.length >0){
        currrentPage = this.isCurrentLoadedPageIsChildrenOfTheseLinks(allLinks[index].subLinks,
                      currentPageLink);
        if(currrentPage && currrentPage.page == currentPageLink){
          break;
        }
      }
    }
    return currrentPage;
  }

  isCurrentLoadedPageIsChildrenOfThisLink(link, currentLoadedPage, allComponentLoaded,
      classesOnSucces, classesOnFailure){
    console.log("linkName: "+link.name+", isInitalLoad: "+this.isIntialLoad,
      ", allComponentLoaded: "+allComponentLoaded);
    let returnedClass= classesOnFailure;
    if(this.isIntialLoad){
      if(link.page == currentLoadedPage.page){
        returnedClass = classesOnSucces;
      }else{
          const detailsOfCurrentLoadedPage =
              this.isCurrentLoadedPageIsChildrenOfTheseLinks(link.subLinks,
                currentLoadedPage.page);
          if(detailsOfCurrentLoadedPage != null){
            returnedClass =  classesOnSucces;
          }
      }
    }
    if(allComponentLoaded){
      this.isIntialLoad = false;
    }
    // console.log("Returned class: "+returnedClass);

    return returnedClass;
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
                      className={this.isCurrentLoadedPageIsChildrenOfThisLink(link,currentLoadedPage, false,
                        "preDropDownAnchor dropdown-toggle", "preDropDownAnchor dropdown-toggle collapsed")}>
                  </a>
                <ul className={this.isCurrentLoadedPageIsChildrenOfThisLink(link,currentLoadedPage, true,
                      "collapse list-unstyled show","collapse list-unstyled")} id={link.key+"-ul"}>
                  {link.subLinks.map(subLink => {
                      return <SideBarLink link={subLink} parentLinkChangeHandler={parentLinkChangeHandler} key={subLink.key}
                                parentPages={this.getParentPages(link)}
                                currentLoadedPage={currentLoadedPage}
                                isIntialLoad={this.props.isIntialLoad}/>;
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
  currentLoadedPage: PropTypes.object.isRequired,
  isIntialLoad: PropTypes.bool
};

export default SideBarLink;
