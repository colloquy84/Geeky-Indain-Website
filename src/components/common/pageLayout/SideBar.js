import React from "react";
import PropTypes from "prop-types";
import SideBarLink from "./SideBarLink";


class SideBar extends React.Component {
  state = {};

  onLinkChange = (currentLoadedPage, parentPages, newPage)=> {
      console.log("SideBar -> currentLoadedPage:"+currentLoadedPage+", newPage: "+newPage
            +", parentPages", parentPages);
      this.props.onLinkChange(currentLoadedPage, parentPages, newPage);
  }

  render() {
    return (
      <nav id="sidebar" className={this.props.hideSideBar?'active':''}>
          <div className="sidebar-header">
              <a className="navbar-brand geeky-navbar-brand" href="/">
                <img src={require('../../../../assets/Logo/Inline/ICON_ONLY_TransparentBg_RECT.png')}
                width="100" height="50" className="d-inline-block align-top rotate" alt=""></img>
              </a>
          </div>
      <ul className="list-unstyled components">
      {this.props.sideNav && <p>{this.props.sideNav.title}</p>}
      {this.props.sideNav && this.props.sideNav.links &&
        this.props.sideNav.links.map(link => {
          return (
                <SideBarLink link={link} key={link.key} parentPages={this.props.parentPages}
                      parentLinkChangeHandler={this.onLinkChange}
                      currentLoadedPage = {this.props.currentLoadedPage}/>
          );
        })
      }
      </ul>
    </nav>
    );
  }
}

SideBar.propTypes = {
  currentLoadedPage: PropTypes.string.isRequired,
  hideSideBar:PropTypes.bool.isRequired,
  sideNav: PropTypes.object.isRequired,
  parentPages: PropTypes.array,
  onLinkChange: PropTypes.func.isRequired
};

export default SideBar;
