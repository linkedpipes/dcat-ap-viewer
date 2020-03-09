import React from "react";
import {PropTypes} from "prop-types";
import SchemaListItem from "./access/schema-list-item";
import MediaTypeItem from "./access/media-type-item";
import CompressFormat from "./access/compress-format-item";
import PackageFormat from "./access/package-format-item";
import Authorship from "./legal/authorship";
import DatabaseAuthorship from "./legal/database-authorship";
import PersonalData from "./legal/personal-data";
import ProtectedDatabaseAuthorship from "./legal/protected-database-authorship";
import {register} from "../../../../client/app/register";
import {ELEMENT_DATA_SERVICE_DETAIL} from "../../../../client/app/component-list";
import {connect} from "react-redux";
import {selectT} from "../../../../client/app/language";
import {selectTLabel, showModal} from "../../../client-api";
import {selectLegalDistribution} from "../../../../client/legal/distribution";
import {
  fetchQualityDistribution,
  selectQualityDistribution,
} from "../../../../client/quality/distribution";


class DataServiceDetail extends React.PureComponent {

  componentDidMount() {
    // TODO Also update on IRI change.
    this.props.fetchQuality();
  }

  render() {
    const {t, tLabel, distribution, quality, openModal, legal} = this.props;
    const title = tLabel(distribution.iri);
    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
        <div className="card p-2">
          <div className="card-body px-2">
            {title === undefined ?
              <span className="sr-only">
                {t("unnamed_distribution")}
              </span>
              :
              <h5 className="card-title">
                {title}
              </h5>
            }
            {dataFormatItem(tLabel, distribution.format)}
          </div>
          <div className="row">
            <div className="col-6 pr-1">
              {licenseColumn(t, legal, quality, openModal)}
            </div>
            <div className="col-6 pl-1">
              {accessColumn(t, tLabel, distribution, quality, openModal)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DataServiceDetail.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "legal": PropTypes.object.isRequired,
  "quality": PropTypes.object,
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
  )
}

function licenseColumn(t, legal, quality, openModal) {
  return (
    <div className="card">
      <h6 className="card-title text-muted pl-2 pt-2">
        {t("distribution_license")}
      </h6>
      <ul className="list-group list-group-flush">
        <Authorship
          t={t}
          legal={legal}
          quality={quality}
          openModal={openModal}
        />
        <DatabaseAuthorship
          t={t}
          legal={legal}
          quality={quality}
          openModal={openModal}
        />
        <PersonalData
          t={t}
          legal={legal}
          openModal={openModal}
        />
        <ProtectedDatabaseAuthorship
          t={t}
          legal={legal}
          quality={quality}
          openModal={openModal}
        />
      </ul>
    </div>
  )
}

function accessColumn(t, tLabel, distribution, quality, openModal) {
  return (
    <div className="card">
      <h6 className="card-title text-muted pl-2 pt-2">
        {t("distribution_access")}
      </h6>
      <ul className="list-group list-group-flush">
        <EndpointDescription/>
        <EndpointUrl/>
        <SchemaListItem
          t={t}
          tLabel={tLabel}
          distribution={distribution}
          openModal={openModal}/>
        <MediaTypeItem
          t={t}
          tLabel={tLabel}
          distribution={distribution}
          quality={quality}
          openModal={openModal}/>
        <CompressFormat
          tLabel={tLabel}
          distribution={distribution}
          openModal={openModal}/>
        <PackageFormat
          tLabel={tLabel}
          distribution={distribution}
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
    "legal": selectLegalDistribution(state, ownProps.distribution.iri),
    "quality": selectQualityDistribution(state, ownProps.distribution.iri),
  }), (dispatch, ownProps) => ({
    "fetchQuality": () => dispatch(
      fetchQualityDistribution(ownProps.distribution.iri)),
    "openModal": (body) => dispatch(showModal(undefined, body)),
  }))(DataServiceDetail),
});
