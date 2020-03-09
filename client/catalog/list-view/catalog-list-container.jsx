import React from "react";
import {connect} from "react-redux";
import {
  selectReady,
  selectError,
  selectCatalogs,
} from "./catalog-list-reducer";
import {ELEMENT_CATALOG_LIST} from "../../app/component-list";
import {getRegisteredElement} from "../../app/register";
import {PropTypes} from "prop-types";
import {fetchCatalogList} from "../../api/api-action";
import {catalogListMount, catalogListUnMount} from "./catalog-list-actions";

class CatalogListContainer extends React.PureComponent {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const CatalogList = getRegisteredElement(ELEMENT_CATALOG_LIST);
    const {ready, error, catalogs} = this.props;
    return (
      <CatalogList ready={ready} error={error} catalogs={catalogs}/>
    )
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

CatalogListContainer.propTypes = {
  "ready": PropTypes.bool.isRequired,
  "error": PropTypes.number.isRequired,
  "catalogs": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "ready": selectReady(state),
  "error": selectError(state),
  "catalogs": selectCatalogs(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => {
    dispatch(catalogListMount());
    dispatch(fetchCatalogList());
  },
  "onUnMount": () => {
    dispatch(catalogListUnMount());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CatalogListContainer);
