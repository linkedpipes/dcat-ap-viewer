import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {
  selectT,
  selectTLabel,
  selectTLiteral,
  register,
  ELEMENT_DATA_SERVICE_DETAIL,
  showModal,
  fetchLabels,
} from "../../../client-api";
import {selectLegalDistribution} from "../../../../client/dataset-detail/legal";
import SchemaListItem from "./access/schema-list-item";
import MediaTypeItem from "./access/media-type-item";
import CompressFormat from "./access/compress-format-item";
import PackageFormat from "./access/package-format-item";
import Authorship from "./legal/authorship";
import DatabaseAuthorship from "./legal/database-authorship";
import PersonalData from "./legal/personal-data";
import ProtectedDatabaseAuthorship from "./legal/protected-database-authorship";
import {
  selectQuality,
  fetchDistributionQuality,
} from "../../../../client/dataset-detail/quality";
import EndpointDescription from "./access/endpoint-description-item";
import EndpointUrl from "./access/endpoint-url-item";

class DataServiceDetail extends React.PureComponent {

  componentDidMount() {
    // TODO Also update on IRI change.
    this.props.fetchQuality();
  }

  render() {
    const {
      t, tLabel, tLiteral, dataService, quality, qualityDataService,
      openModal, legal, fetchLabels,
    } = this.props;
    const title = tLabel(dataService.iri, null);
    fetchLabels([dataService.format, dataService.mediaType]);
    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
        <div className="card p-2">
          <div className="card-body px-2">
            {title !== null &&
              <h5 className="card-title">
                {title}
              </h5>
            }
            {dataFormatItem(tLabel, dataService.format)}
          </div>
          <div className="row">
            <div className="col-6 pr-1">
              {licenseColumn(t, tLiteral, legal, quality, openModal)}
            </div>
            <div className="col-6 pl-1">
              {accessColumn(
                t, tLabel, tLiteral, dataService,
                quality, qualityDataService,
                openModal)}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

DataServiceDetail.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "dataService": PropTypes.object.isRequired,
  "legal": PropTypes.object.isRequired,
  "quality": PropTypes.object,
  "qualityDataService": PropTypes.object,
  "fetchLabels": PropTypes.func.isRequired,
  "fetchQuality": PropTypes.func.isRequired,
};

function dataFormatItem(tLabel, format) {
  const label = tLabel(format);
  if (label === undefined) {
    return null;
  }
  return (
    <h6 className="card-subtitle mb-2 text-muted">
      {label}
    </h6>
  );
}

function licenseColumn(t, tLiteral, legal, quality, openModal) {
  return (
    <div className="card">
      <h6 className="card-title text-muted pl-2 pt-2">
        {t("distribution_license")}
      </h6>
      <ul className="list-group list-group-flush">
        <Authorship
          t={t}
          tLiteral={tLiteral}
          legal={legal}
          quality={quality}
          openModal={openModal}
        />
        <DatabaseAuthorship
          t={t}
          tLiteral={tLiteral}
          legal={legal}
          quality={quality}
          openModal={openModal}
        />
        <ProtectedDatabaseAuthorship
          t={t}
          tLiteral={tLiteral}
          legal={legal}
          quality={quality}
          openModal={openModal}
        />
        <PersonalData
          t={t}
          legal={legal}
          openModal={openModal}
        />
      </ul>
    </div>
  );
}

function accessColumn(
  t, tLabel, tLiteral, dataService, quality, qualityDataService, openModal) {
  return (
    <div className="card">
      <h6 className="card-title text-muted pl-2 pt-2">
        {t("distribution_access")}
      </h6>
      <ul className="list-group list-group-flush">
        <EndpointDescription
          t={t}
          tLiteral={tLiteral}
          dataSource={dataService}
          quality={qualityDataService}
          openModal={openModal}
        />
        <EndpointUrl
          t={t}
          tLiteral={tLiteral}
          dataSource={dataService}
          quality={qualityDataService}
          openModal={openModal}
        />
        <SchemaListItem
          t={t}
          tLabel={tLabel}
          tLiteral={tLiteral}
          distribution={dataService}
          quality={quality}
          openModal={openModal}/>
        <MediaTypeItem
          t={t}
          tLabel={tLabel}
          tLiteral={tLiteral}
          distribution={dataService}
          quality={quality}
          openModal={openModal}/>
        <CompressFormat
          t={t}
          tLabel={tLabel}
          distribution={dataService}
          openModal={openModal}/>
        <PackageFormat
          t={t}
          tLabel={tLabel}
          distribution={dataService}
          openModal={openModal}/>
      </ul>
    </div>
  );
}

register({
  "name": ELEMENT_DATA_SERVICE_DETAIL,
  "element": connect((state, ownProps) => ({
    "t": selectT(state),
    "tLabel": selectTLabel(state),
    "tLiteral": selectTLiteral(state),
    "legal": selectLegalDistribution(state, ownProps.dataService.iri),
    "quality": selectQuality(state, ownProps.dataService.iri),
    "qualityDataService":
      selectQuality(state, ownProps.dataService.dataService),
  }), (dispatch, ownProps) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
    "fetchQuality": () => {
      dispatch(fetchDistributionQuality(ownProps.dataService.iri));
      dispatch(fetchDistributionQuality(ownProps.dataService.dataService));
    },
    "openModal": (body) => dispatch(showModal(undefined, body)),
  }))(DataServiceDetail),
});
