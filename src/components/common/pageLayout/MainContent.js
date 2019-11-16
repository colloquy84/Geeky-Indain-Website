import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageDetailAction from "../../../redux/actions/pageDetailAction";
import { bindActionCreators} from "redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import "./mainContent.css";

class MainContent extends React.Component {
  state = {currentLoadedPage:''};

  componentDidMount() {
    // if(newProps.currentLoadedPage != this.props.currentLoadedPage){
      this.getPageContent(this.props.currentLoadedPage).catch(error => {
        alert("Loading "+this.props.currentLoadedPage+" page failed" + error);
      });
    // }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentLoadedPage != this.props.currentLoadedPage){
      this.getPageContent(newProps.currentLoadedPage).catch(error => {
        alert("Loading "+newProps.currentLoadedPage+" page failed" + error);
      });
    }
  }

  getPageContent = async page => {
    if(page != this.state.currentLoadedPage){
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
                {this.props.parentPages && this.props.parentPages.map((page) => {
                  return <span key={page.key}>{page.name+"-"+page.page +"/"} </span>
                })
              }
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
  currentLoadedPage: PropTypes.string.isRequired,
  colapseLinkClicked: PropTypes.func.isRequired,
  parentPages: PropTypes.array,
  pageContent: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
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
