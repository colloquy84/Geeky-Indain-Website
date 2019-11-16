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
  state = {firstPageLoaded: false, hideSideBar : false, currentLoadedPage : '', parentPages:[]};

  componentWillReceiveProps(newProps){
    const {sideNav, parentRouteUrl} = newProps;
    if(sideNav && sideNav.title && parentRouteUrl){
      const path = location.pathname;
      console.log("location: ", location);
      console.log("SideBarWrapper -> path: "+path);
      if(path && path.indexOf("/") >= 0 && path.indexOf("/") != path.lastIndexOf("/")){
        console.log("SideBarWrapper -> loading from url path");
        this.loadContentFromParentUrlOrRoutePage(path,
            this.getDefaultParentPages(sideNav, parentRouteUrl));
      }else{
        console.log("SideBarWrapper -> loading from sidenav props", sideNav);
        this.loadContentFromParentUrlOrRoutePage(sideNav.mainPage, this.getDefaultParentPages(sideNav, parentRouteUrl));
      }
    }
  }

  getDefaultParentPages(sideNav, parentURL){
    const parentPages = [];
    if(sideNav ){
      parentPages.push({key:parentURL,
          page:parentURL,
          name:sideNav.title})
    }
    console.log("parent Pages ->", parentPages);
    return parentPages;
  }

  loadContentFromParentUrlOrRoutePage(urlOrRoute, parentPages){
    if(urlOrRoute && urlOrRoute.lastIndexOf("/") >= 0 ){
      const newCurrentLoadedPage = urlOrRoute.substring(urlOrRoute.lastIndexOf("/")+1);
      if(newCurrentLoadedPage){
          console.log("SideBarWrapper -> currentLoadedPage: "+ this.state.currentLoadedPage+
          ", newCurrentLoadedPage:"+newCurrentLoadedPage);
        this.setState({currentLoadedPage: newCurrentLoadedPage, parentPages:parentPages});
      }
    }else{
      console.log("SideBarWrapper -> currentLoadedPage: "+ this.state.currentLoadedPage+
      ", newCurrentLoadedPage:"+urlOrRoute);
      this.setState({currentLoadedPage: urlOrRoute, parentPages:parentPages});
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
    this.setState({hideSideBar: !this.state.hideSideBar});
  };

  onLinkChange = (currentLoadedPage, parentPages, newPage)=> {
      console.log("SideBarWrapper -> currentLoadedPage:"+currentLoadedPage+", newPage: "+newPage
            +", parentPages"+parentPages);
      this.setState({currentLoadedPage: newPage,parentPages:parentPages});
  }

  render() {
    return (
      <div className="geek-main-content"> {
        this.props.loading ? ( <
          Spinner / >
        ) : (
          <div className="sideBarwrapper">
            { this.props.sideNav && <SideBar sideNav = { this.props.sideNav}
              hideSideBar={this.state.hideSideBar}
              onLinkChange = {this.onLinkChange}
              parentPages={this.state.parentPages}
              currentLoadedPage = {this.state.currentLoadedPage}/>
            }
            <Route path={this.props.parentRouteUrl+"/:id"}>
              <MainContent colapseLinkClicked = {this.sideBarToggled}
                  parentPages={this.state.parentPages}
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
