import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import PropTypes from "prop-types";
import { bindActionCreators} from "redux";
import { toast } from "react-toastify";
import './sideBarWrapper.css';
import './sideBar.css';
import BreadCrumb from "../breadCrumb/BreadCrumb";

import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Spinner from "../Spinner";

class SideBarWrapper extends React.Component {
  state = {firstPageLoaded: false, hideOverlaySideBar : false,hideSlidingSideBar:false, currentLoadedPage : {},
      parentPagesForSideNav:[],
      parentPagesForBreadCrumb:[], isMobile: false};

  componentWillReceiveProps(newProps){
    const {sideNav, parentRouteUrl} = newProps;
    if(sideNav && sideNav.title && parentRouteUrl){
      const path = location.pathname;
      console.log("location: ", location);
      console.log("SideBarWrapper -> path: "+path);
      if(path && path.indexOf("/") >= 0 && path.indexOf("/") != path.lastIndexOf("/")){
        console.log("SideBarWrapper -> loading from url path");
        this.loadContentFromParentUrlOrRoutePage(sideNav,path,
            this.getDefaultParentPages(sideNav, parentRouteUrl));
      }else{
        console.log("SideBarWrapper -> loading from sidenav props", sideNav);
        this.loadContentFromParentUrlOrRoutePage(sideNav, sideNav.mainPage, this.getDefaultParentPages(sideNav, parentRouteUrl));
      }
    }
  }

  getDefaultParentPages(sideNav, parentURL){
    const parentPages = [];
    if(sideNav ){
      parentPages.push({key:parentURL,
          page:parentURL,
          name:sideNav.title,
          shortName:sideNav.shortName})
    }
    console.log("parent Pages ->", parentPages);
    return parentPages;
  }

  getCurrentLoadedPage(currentPageLink, allLinks){
    let currrentPage =null;
    for(let index =0; index < allLinks.length; index++){
      if(allLinks[index].page == currentPageLink){
        currrentPage = allLinks[index];
        break;
      }
      if(allLinks[index].subLinks && allLinks[index].subLinks.length >0){
        currrentPage = this.getCurrentLoadedPage(currentPageLink, allLinks[index].subLinks);
        if(currrentPage && currrentPage.page == currentPageLink){
          break;
        }
      }
    }
    return currrentPage;
  }

  getCurrentLoadedPageDetails(sideNav, currentPageLink){
    const {parentRouteUrl} = this.props;
    if(sideNav){
      if(sideNav.mainPage == currentPageLink || parentRouteUrl == currentPageLink){
        return {key:parentRouteUrl,
            page:sideNav.mainPage,
            name:sideNav.title,
            shortName:sideNav.shortName};
      }else{
        const currentLoadedPage = this.getCurrentLoadedPage(currentPageLink, sideNav.links);
        if(currentLoadedPage == null){
          window.location = "/404";
        }else{
          return currentLoadedPage;
        }
      }
    }
  }

  addParentPagesFromURLRoute(sideNav,urlOrRoute,parentPages){
    const newParentPages = parentPages.slice();
    const allUrlPaths = urlOrRoute.split("/");
    if(allUrlPaths.length > 2){
      for(let index =2; index < allUrlPaths.length; index++){
        newParentPages.push(this.getCurrentLoadedPageDetails(sideNav, allUrlPaths[index]));
      }
    }
    return newParentPages;
  }

  loadContentFromParentUrlOrRoutePage(sideNav, urlOrRoute, parentPages){
    const parentPagesForSideNav = parentPages.slice();
    if(urlOrRoute && urlOrRoute.lastIndexOf("/") >= 0 ){
      const newCurrentLoadedPage = urlOrRoute.substring(urlOrRoute.lastIndexOf("/")+1);
      if(newCurrentLoadedPage){
          console.log("SideBarWrapper -> currentLoadedPage: "+ this.state.currentLoadedPage+
          ", newCurrentLoadedPage:"+newCurrentLoadedPage);
          const currentLoadedPage = this.getCurrentLoadedPageDetails(sideNav, newCurrentLoadedPage)
        this.setState({currentLoadedPage: currentLoadedPage, parentPagesForSideNav:parentPagesForSideNav,
            parentPagesForBreadCrumb:this.addParentPagesFromURLRoute(sideNav,urlOrRoute, parentPages),
          isMobile: window.nnerWidth < 993});
      }
    }else{
      console.log("SideBarWrapper -> currentLoadedPage: "+ this.state.currentLoadedPage+
      ", newCurrentLoadedPage:"+urlOrRoute);
      const currentLoadedPage = this.getCurrentLoadedPageDetails(sideNav, urlOrRoute)
      this.setState({currentLoadedPage: currentLoadedPage, parentPagesForSideNav:parentPagesForSideNav,
          parentPagesForBreadCrumb:parentPages, isMobile: window.nnerWidth < 993});
    }
  }

  componentDidMount() {
    const {
      pageType, actions
    } = this.props;

    if (pageType.length != 0) {
      actions.getSideNav(pageType).catch(error => {
        toast.error("Loading page "+pageType+"failed" + error.message,{
          autoClose:false
        });
      });
    }

    window.addEventListener('resize', () => {
        this.setState({
            isMobile: window.innerWidth < 993
        });
    }, false);
    this.setState({
        isMobile: !this.state.isMobile
    });
    setInterval(()=>{
      this.setState({
          isMobile: window.innerWidth < 993
      });
    }, 100);
  }

  sideBarToggled = () => {
    if(this.state.isMobile){
      this.setState({hideOverlaySideBar: !this.state.hideOverlaySideBar});
    }else{
      this.setState({hideSlidingSideBar: !this.state.hideSlidingSideBar});
    }

  };

  onOverlaySideBarClose= () => {
    this.setState({hideOverlaySideBar: !this.state.hideOverlaySideBar,
      hideSlidingSideBar: !this.state.hideSlidingSideBar});
  }

  onLinkChange = (currentLoadedPage, parentPages, newPage)=> {
      console.log("SideBarWrapper -> currentLoadedPage:"+currentLoadedPage+", newPage: "+newPage
            +", parentPages"+parentPages);
      const parentPagesForBreadCrumb = parentPages.slice();
      parentPagesForBreadCrumb.push(newPage);
      if(this.state.isMobile){
        this.setState({currentLoadedPage: newPage,parentPagesForBreadCrumb:parentPagesForBreadCrumb,
            hideOverlaySideBar: !this.state.hideOverlaySideBar});
      }else{
        this.setState({currentLoadedPage: newPage,parentPagesForBreadCrumb:parentPagesForBreadCrumb});
      }
  }

  onBreadCrumbLinkClick = (parentPagesForBreadCrumb, newPage)=> {
      const newParentPagesForBreadCrumb = [];
      for(let index =0; index < parentPagesForBreadCrumb.length; index++){
        newParentPagesForBreadCrumb.push(parentPagesForBreadCrumb[index]);
        if(newPage.page == parentPagesForBreadCrumb[index].page){
          break;
        }
      }
      this.setState({currentLoadedPage: newPage,parentPagesForBreadCrumb:newParentPagesForBreadCrumb});
  }

  render() {
    return (
      <> {
        this.props.loading ? (
          <Spinner />
        ) : (
          <div className="sideBarwrapper">
            { this.props.sideNav && <SideBar sideNav = { this.props.sideNav}
              hideOverlaySideBar={this.state.hideOverlaySideBar}
              hideSlidingSideBar={this.state.hideSlidingSideBar}
              onOverlaySideBarClose={this.onOverlaySideBarClose}
              onLinkChange = {this.onLinkChange}
              parentPages={this.state.parentPagesForSideNav}
              currentLoadedPage = {this.state.currentLoadedPage}
              isMobile={this.state.isMobile}/>
            }
            <div id="content" className="pt-0 pb-0">
              <div className="contentTopBar">
                <div className="sidebarToggler mb-md-10">
                  <a onClick={() => this.sideBarToggled()}>
                    <i className="fas fa-bars"></i>
                  </a>
                </div>
                <BreadCrumb links={this.state.parentPagesForBreadCrumb}
                    onBreadCrumbLinkClick={this.onBreadCrumbLinkClick}/>
              </div>
              <Route path={this.props.parentRouteUrl+"/:id"}>
                <MainContent colapseLinkClicked = {this.sideBarToggled}
                    parentPages={this.state.parentPagesForBreadCrumb}
                    parentPage ={this.props.pageType}
                    onBreadCrumbLinkClick = {this.onBreadCrumbLinkClick}
                    currentLoadedPage = {this.state.currentLoadedPage}/>
              </Route>
            </div>
          </div>
        )
      }
    </>
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
