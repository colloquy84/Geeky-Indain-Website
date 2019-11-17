import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import { bindActionCreators} from "redux";
import { toast } from "react-toastify";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import Spinner from "../Spinner";
import "./mainContent.css";

class MainContent extends React.Component {
  state = {currentLoadedPage:''};

  componentDidMount() {
    // if(newProps.currentLoadedPage != this.props.currentLoadedPage){
      this.getPageContent(this.props.currentLoadedPage.page).catch(error => {
        toast.error("Loading "+this.props.currentLoadedPage.page+" page failed" + error.message,{
          autoClose:false
        });
      });
    // }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentLoadedPage.page != this.props.currentLoadedPage.page){
      this.getPageContent(newProps.currentLoadedPage.page).catch(error => {
        toast.error("Loading "+newProps.currentLoadedPage.page+" page failed" + error.message,{
          autoClose: false
        });
      });
    }
  }

  getPageContent = async page => {
    if(page && page != this.state.currentLoadedPage){
      try {
        console.log("Loaded content for "+page);
        this.setCurrentState({currentLoadedPage: page});
        await this.props.actions.getPageContent(this.props.parentPage, page);
        // toast.success(page + "Page Loaded");
      } catch (error) {
        toast.error(page + "could not be loaded for " + this.props.parentPage +
          " section" + error.message, {
            autoClose: false
          });
      }
    }else{
      console.log("Content for "+this.props.parentPage+" type "+page+" page is already loaded");
    }
  };

  onBreadCrumbLinkClick = (newPage) =>{
    this.props.onBreadCrumbLinkClick(this.props.currentLoadedPage,
        this.props.parentPages, newPage);
  }

  setCurrentState(newState){
    this.setState(newState);
  }

  render(){
    return (
      <div id="content">
        {this.props.loading ? (
          <Spinner / >
        ) : (
          <>
            <div className="mainContentHeader">
              <a className="sidebarToggler" onClick={() => this.props.colapseLinkClicked()}>
                <i className="fas fa-bars"></i>
                </a>
                <BreadCrumb links={this.props.parentPages}
                  onBreadCrumbLinkClick={this.onBreadCrumbLinkClick}/>
            </div>
            <h3>{this.props.pageContent.heading}</h3>
            {this.props.pageContent.dataList && this.props.pageContent.dataList.map((content, index) => {
              return (
                <p key={index}>{content.data}</p>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

MainContent.propTypes = {
  parentPage: PropTypes.string.isRequired,
  currentLoadedPage: PropTypes.object,
  colapseLinkClicked: PropTypes.func.isRequired,
  parentPages: PropTypes.array,
  pageContent: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  onBreadCrumbLinkClick: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pageContent: state.currentPage.pageContent,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPageContent: bindActionCreators(pageDetailAction.getPageContent, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
