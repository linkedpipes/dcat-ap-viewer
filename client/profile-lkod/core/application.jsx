import React from "react";
import {PropTypes} from "prop-types";

import {
  WithNavigation,
  Canonical,
  LoadingIndicator,
  register,
  getElement,
  WithModalDialog,
} from "../viewer-api";
import "./loading-indicator";

import translations from "./application.json";

function Application(props) {
  const Header = getElement("header").element;
  const Footer = getElement("footer").element;

  return (
    <WithNavigation>
      <Canonical.CanonicalLink/>
      <Header/>
      <LoadingIndicator/>
      <WithModalDialog>
        {React.cloneElement(props.children, {})}
      </WithModalDialog>
      <Footer/>
    </WithNavigation>
  );
}

Application.propTypes = {
  "children": PropTypes.element.isRequired,
};

register({
  "name": "application",
  "element": Application,
  "translations": translations,
});
