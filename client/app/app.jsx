import React from "react";
import {withRouter} from "react-router";
import {replace} from "connected-react-router";
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import LoaderIndicator from "./loading-indicator";
import {ModalContainer} from "../modal";
import {PropTypes} from "prop-types";
import {
  setLanguage,
  selectLanguage,
  selectT,
  selectTUrl,
  selectUrl,
  createUrl,
} from "./navigation";
import {getRegisteredElement} from "./register";
import {
  ELEMENT_HEADER,
  ELEMENT_FOOTER,
  ELEMENT_INITIAL_LOADING,
} from "./component-list";
import {fetchInitialData, fetchLanguage} from "./../api/api-action";
import {
  selectInitialDataFailed,
  selectInitialDataReady,
  selectShowWaitScreen,
  showWaitScreen,
} from "./app-reducer";
import {QUERY_LANGUAGE} from "./component-list";
import CanonicalLink from "./canonical-link";
import PageTitle from "./page-title";

const Header = getRegisteredElement(ELEMENT_HEADER);
const Footer = getRegisteredElement(ELEMENT_FOOTER);
const InitialLoadingIndicator = getRegisteredElement(ELEMENT_INITIAL_LOADING);

const INITIAL_LOAD_TIME_IN_MS = 250;

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.prepareLanguageOnDidMount();
    this.props.dispatch(fetchInitialData());
    // We allow to show initial loading screen after some time.
    // Best case scenario user does not see it at all.
    setTimeout(() => {
      this.props.dispatch(showWaitScreen());
    }, INITIAL_LOAD_TIME_IN_MS);
  }

  prepareLanguageOnDidMount() {
    let language;
    if (this.props.language === this.props.url.language) {
      language = this.props.url.language;

    } else {
      language = this.props.url.language;
      this.props.dispatch(setLanguage(language));
    }
    this.props.dispatch(fetchLanguage(language));
    // Redirect to make sure that all arguments and path have the
    // same language.
    this.updateUrlPath(language);
  }

  updateUrlPath(language) {
    const newPath = createUrl(
      this.props.url.path,
      language,
      {
        [QUERY_LANGUAGE]: undefined,
        ...this.props.url.query,
      });
    this.props.dispatch(replace(newPath));
  }

  // TODO React on changes during application use?
  // componentDidUpdate(prevProps) {
  // if (prevProps.query !== this.props.query) {
  //   this.checkForLanguageChange();
  // }
  // }

  render() {
    // TODO Wait before the language gets loaded?
    if (this.props.initDataReady) {
      return (
        <div>
          <CanonicalLink/>
          <PageTitle/>
          <Header
            url={this.props.url}
            language={this.props.language}
            t={this.props.t}
            tUrl={this.props.tUrl}
          />
          <LoaderIndicator/>
          {React.cloneElement(this.props.children, {})}
          <Footer
            t={this.props.t}
            language={this.props.language}
            tUrl={this.props.tUrl}
          />
          <ModalContainer/>
        </div>
      );
    } else if (this.props.showWaitScreen) {
      return (
        <div>
          <InitialLoadingIndicator
            lang={this.props.language}
            failed={this.props.failed}
          />
        </div>
      );
    } else {
      // Render nothing, can happen at the start before
      // language is loaded, this is used for at most
      // INITIAL_LOAD_TIME_IN_MS ms.
      return null;
    }
  }

}

AppComponent.propTypes = {
  "language": PropTypes.string.isRequired,
  "dispatch": PropTypes.func.isRequired,
  "children": PropTypes.element.isRequired,
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "initDataReady": PropTypes.bool.isRequired,
  "failed": PropTypes.bool.isRequired,
  "showWaitScreen": PropTypes.bool.isRequired,
  "url": PropTypes.object.isRequired,
};

export const App = hot(module)(withRouter(connect(
  (state) => ({
    "language": selectLanguage(state),
    "initDataReady": selectInitialDataReady(state),
    "failed": selectInitialDataFailed(state),
    "showWaitScreen": selectShowWaitScreen(state),
    "t": selectT(state),
    "tUrl": selectTUrl(state),
    "url": selectUrl(state),
  })
)(AppComponent)));
