import React from "react";
import {connect} from "react-redux";
import {statusSelector, catalogsSelector} from "./catalog-list-reducer";
import {fetchCatalogList} from "./catalog-list-actions";
import {CatalogList} from "./catalog-list";

import {isDataReady} from "@/app-services/http-request";
import {HttpRequestStatus} from "@/app-ui/http-request-status";
import {CATALOG_LIST_URL} from "@/app/navigation";
import {getString} from "@/app-services/strings";
import HeadLinks from "@/app-ui/head-links";
import {PropTypes} from "prop-types";
import {fetchLabel, labelsSelector} from "../../app-services/labels";

class _CatalogsViewContainer extends React.Component {

  componentDidMount() {
    this.props.fetchData();
    this.props.catalogs.forEach(
      (publisher) => {
        this.props.fetchLabel(publisher["id"]);
        this.props.fetchLabel(publisher["publisherIRI"]);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.catalogs && prevProps.catalogs !== this.props.catalogs) {
      this.props.catalogs.forEach(
        (publisher) => {
          this.props.fetchLabel(publisher["id"]);
          this.props.fetchLabel(publisher["publisherIRI"]);
        });
    }
  }

  render() {
    if (isDataReady(this.props.status)) {
      return (
        <React.Fragment>
          <HeadLinks title={getString("catalogs")}
                     url={CATALOG_LIST_URL}/>
          <CatalogList catalogs={this.props.catalogs} labels={this.props.labels}/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <HeadLinks title={getString("catalogs")}
                     url={CATALOG_LIST_URL}/>
          <HttpRequestStatus status={this.props.status}/>
        </React.Fragment>
      )
    }
  }

  componentWillUnmount() {

  }

}

_CatalogsViewContainer.propTypes = {
  "fetchData": PropTypes.func.isRequired,
  "status": PropTypes.string.isRequired,
  "catalogs": PropTypes.arrayOf(PropTypes.object).isRequired,
  "labels": PropTypes.object.isRequired,
  "fetchLabel": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "status": statusSelector(state),
  "catalogs": catalogsSelector(state),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  "fetchData": () => dispatch(fetchCatalogList()),
  "fetchLabel": (iri) => dispatch(fetchLabel(iri)),
});

export const CatalogsViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CatalogsViewContainer);
