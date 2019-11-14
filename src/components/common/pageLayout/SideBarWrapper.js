import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import PropTypes from "prop-types";
import { bindActionCreators} from "redux";
import './sideBar.css';

import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Spinner from "../Spinner";

class SideBarWrapper extends React.Component {
  state = {firstPageLoaded: false, sideBarVisible : false, currentLoadedPage : '', parentRouteUrl:''};

  componentWillReceiveProps(newProps){
    const path = location.pathname;
    console.log("SideBarWrapper -> path: "+path);
    if(path && path.indexOf("/") >= 0 && path.indexOf("/") != path.lastIndexOf("/")){
      console.log("SideBarWrapper -> loading from url path");
      this.loadContentFromParentUrlOrRoutePage(path,
          path.substring(0,path.lastIndexOf("/")));
    }else{
      const sideNav = newProps.sideNav;
      console.log("SideBarWrapper -> loading from sidenav props", sideNav);
      if(sideNav && sideNav.links && sideNav.links.length >0 ){
        this.loadContentFromParentUrlOrRoutePage(sideNav.links[0].page, this.props.parentRouteUrl);
      }
    }
  }

  loadContentFromParentUrlOrRoutePage(urlOrRoute, parentRouteUrl){
    if(urlOrRoute && urlOrRoute.lastIndexOf("/") >= 0 ){
      const newCurrentLoadedPage = urlOrRoute.substring(urlOrRoute.lastIndexOf("/")+1);
      if(newCurrentLoadedPage){
          console.log("SideBarWrapper -> currentLoadedPage: "+ this.state.currentLoadedPage+
          ", newCurrentLoadedPage:"+newCurrentLoadedPage);
        this.setState({currentLoadedPage: newCurrentLoadedPage, parentRouteUrl:parentRouteUrl});
      }
    }else{
      console.log("SideBarWrapper -> currentLoadedPage: "+ this.state.currentLoadedPage+
      ", newCurrentLoadedPage:"+urlOrRoute);
      this.setState({currentLoadedPage: urlOrRoute, parentRouteUrl:parentRouteUrl});
    }
  }

  componentDidMount() {
    const {
      pageType, actions
    } = this.props;

    if (pageType.length != 0) {
      actions.getSideNav(pageType).catch(error => {
        alert("Loading page "+pageType+"failed" + error);
      });
    }
  }

  sideBarToggled = () => {
    this.setState({sideBarVisible: !this.state.sideBarVisible});
  };

  onLinkChange = (currentLoadedPage, parentRouteUrl, newPage)=> {
      console.log("SideBarWrapper -> currentLoadedPage:"+currentLoadedPage+", newPage: "+newPage
            +", parentRouteUrl"+parentRouteUrl);
      this.setState({currentLoadedPage: newPage,parentRouteUrl:parentRouteUrl});
  }

  render() {
    return (
      <div className="geek-main-content"> {
        this.props.loading ? ( <
          Spinner / >
        ) : (
          <div className="sideBarwrapper">
            { this.props.sideNav && <SideBar sideNav = { this.props.sideNav}
              sideBarVisible={this.state.sideBarVisible}
              onLinkChange = {this.onLinkChange}
              parentRouteUrl={this.props.parentRouteUrl}
              currentLoadedPage = {this.state.currentLoadedPage}/>
            }
            <Route path={this.props.parentRouteUrl+"/:id"}>
              <MainContent colapseLinkClicked = {this.sideBarToggled}
                  parentRouteUrl={this.state.parentRouteUrl}
                  parentPage ={this.props.pageType}
                  currentLoadedPage = {this.state.currentLoadedPage}/>
            </Route>
          </div>
        )
      }
    </div>
    );
  }
}

SideBarWrapper.propTypes = {
  pageType: PropTypes.string.isRequired,
  sideNav: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  parentRouteUrl:PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    sideNav: state.currentPage.sideNav,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSideNav: bindActionCreators(pageDetailAction.getSideNav, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarWrapper);
