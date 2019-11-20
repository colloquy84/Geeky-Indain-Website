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

  onOverlaySideBarClose = () => {
    this.props.onOverlaySideBarClose();
  }

  render() {
    return (
      <>
        <nav id="sidebar" className={this.props.isMobile?
              (this.props.hideOverlaySideBar? 'overlaySidebar active':'overlaySidebar')
              :(this.props.hideSlidingSideBar? 'slidingSidebar active': 'slidingSidebar')}>
            {this.props.isMobile &&
                <div id="dismiss" onClick={()=> this.onOverlaySideBarClose()}
                    className={this.props.hideOverlaySideBar?'active':''}>
                  <i className="fas fa-arrow-left"></i>
                </div>
            }
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
    <div className={this.props.hideOverlaySideBar?'sidebar-overlay active':'sidebar-overlay'}
        onClick={()=> this.onOverlaySideBarClose()}></div>
    </>
    );
  }
}

SideBar.propTypes = {
  currentLoadedPage: PropTypes.object,
  hideOverlaySideBar:PropTypes.bool.isRequired,
  hideSlidingSideBar:PropTypes.bool.isRequired,
  onOverlaySideBarClose: PropTypes.func.isRequired,
  sideNav: PropTypes.object.isRequired,
  parentPages: PropTypes.array,
  onLinkChange: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};

export default SideBar;
