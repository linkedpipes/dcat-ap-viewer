import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {getRegisteredElement} from "../app/register";
import {CatalogListActions} from "./catalog-list-action";

export const ELEMENT_CATALOG_LIST = "app.catalog-list";

class CatalogListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const CatalogList = getRegisteredElement(ELEMENT_CATALOG_LIST);
    return (
      <CatalogList/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

CatalogListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => dispatch(CatalogListActions.mountCatalogList()),
  "onUnMount": () => dispatch(CatalogListActions.unMountCatalogList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
