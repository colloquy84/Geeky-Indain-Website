import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";


class SideBarLink extends React.Component {
  state = {};

  onLinkClick = (newPage)=> {
    if(newPage != this.props.currentLoadedPage){
      console.log("SideBarLink -> currentLoadedPage:"+this.props.currentLoadedPage+", newPage: "+newPage
            +", parentRouteUrl"+this.props.parentRouteUrl);
      this.props.parentLinkChangeHandler(this.props.currentLoadedPage, this.props.parentRouteUrl, newPage);
    }else{
      console.log("SideBarLink -> current loaded page is same currentLoadedPage:"+this.props.currentLoadedPage
        +", newPage: "+newPage);
    }
  }

  render() {
    const { link, parentLinkChangeHandler, parentRouteUrl, currentLoadedPage} = this.props;
    return (
      <>
        {link && link.subLinks && link.subLinks.length !=0 ?
          (
              <li key={link.key}>
                  <NavLink to={parentRouteUrl+"/"+link.page} onClick={() => this.onLinkClick(link.page)}
                      className={currentLoadedPage == link.page?"active navLink":"navLink"}>
                      {link.name}</NavLink>
                  <a href={"#"+link.key+"-ul"}
                      data-toggle="collapse" aria-expanded="false" className="dropdown-toggle collapsed"/>
                <ul className="collapse list-unstyled" id={link.key+"-ul"}>
                  {link.subLinks.map(subLink => {
                      return <SideBarLink link={subLink} parentLinkChangeHandler={parentLinkChangeHandler} key={subLink.key}
                                parentRouteUrl={parentRouteUrl +"/"+link.page}
                                currentLoadedPage={currentLoadedPage}/>;
                    })
                  }
                </ul>
            </li>
          ):
          (
            <li>
              <NavLink key={link.key} to={parentRouteUrl+"/"+link.page}
                  className={currentLoadedPage == link.page?"active navLink":"navLink"}
                 onClick={() => this.onLinkClick(link.page)}>{link.name}</NavLink>
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
  parentRouteUrl: PropTypes.string.isRequired,
  currentLoadedPage: PropTypes.string.isRequired
};

export default SideBarLink;
