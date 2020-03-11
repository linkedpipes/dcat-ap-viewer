import React from "react";
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {register} from "../../../../client/app/register";
import {
  ELEMENT_DATASET_DETAIL,
  QUERY_DATASET_LIST_PUBLISHER,
  URL_DATASET_LIST,
} from "../../../../client/app/component-list";
import {connect} from "react-redux";
import Keywords from "./keywords";
import Properties from "./properies";
import {
  fetchLabels,
  selectT,
  selectTUrl,
  selectTLabel,
  selectTLiteral,
  getGlobal,
  selectLanguage,
  showModal,
} from "../../../client-api";
import {
  fetchQualityDataset,
  selectDatasetQuality,
} from "../../../../client/quality/dataset";
import {DistributionList} from "../../../../client/distribution/list/index";
import withStatus from "../../user-iterface/status";
import {NKOD} from "../../../../client/vocabulary/vocabulary";
import {
  getFormLink,
  DATASET_EDIT,
  DATASET_DELETE,
  CATALOG_DELETE,
} from "../../../../client/form/dataset";
import {selectFormData} from "../../../../client/form/dataset";

class DatasetView extends React.PureComponent {

  componentDidMount() {
    this.props.fetchQuality(this.props.dataset.iri);
  }

  render() {
    const {
      t, tUrl, tLabel, tLiteral, dataset, quality,
      language, openModal, fetchLabels, form,
    } = this.props;
    // TODO Optimize and write best-practice where to put.
    const toFetch = [
      dataset.publisher,
      ...asArray(dataset.frequency),
      ...asArray(dataset.spatial),
      ...asArray(dataset.themes),
      ...asArray(dataset.datasetThemes),
    ];
    fetchLabels(toFetch);
    // TODO <SemanticRelatedDatasets dataset={dataset["@id"]}/>
    // TODO <SemanticTermsDatasets dataset={dataset["@id"]}/>
    const link = (getGlobal("dereference-iri-prefix") || "") + dataset.iri;
    const datasetListUrl = tUrl(URL_DATASET_LIST,
      {[QUERY_DATASET_LIST_PUBLISHER]: dataset.publisher});
    return (
      <div className="container">
        <h1>
          {tLabel(dataset.iri)}
          <a href={link} target="_blank" rel="noopener noreferrer">
            <i className="material-icons pl-2">open_in_new</i>
          </a>
          {dialogLinks(dataset, form, language)}
        </h1>
        <h2>
          {/* TODO Update link to search. */}
          <Link to={datasetListUrl}>
            {tLabel(dataset.publisher)}
          </Link>
        </h2>
        <p>{tLiteral(dataset.description)}</p>
        <hr/>
        <Keywords
          t={t}
          tUrl={tUrl}
          keywords={dataset.keywords}
          language={language}
        />
        <Properties
          t={t}
          tLabel={tLabel}
          tUrl={tUrl}
          dataset={dataset}
          quality={quality}
          openModal={openModal}
        />
        <hr/>
        <DistributionList/>
      </div>
    )
  }

}

DatasetView.propTypes = {
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
  "fetchQuality": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
  "form": PropTypes.object,
};

register({
  "name": ELEMENT_DATASET_DETAIL,
  "element": connect((state) => ({
    "t": selectT(state),
    "tUrl": selectTUrl(state),
    "tLabel": selectTLabel(state),
    "tLiteral": selectTLiteral(state),
    "language": selectLanguage(state),
    "quality": selectDatasetQuality(state),
    "form": selectFormData(state),
  }), (dispatch) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
    "fetchQuality": (iri) => dispatch(fetchQualityDataset(iri)),
    "openModal": (body) => dispatch(showModal(undefined, body)),
  }))(withStatus(DatasetView)),
});

function dialogLinks(dataset, form, language) {
  const isFromForm = dataset["@type"].includes(NKOD.SourceForm);
  const isFromLkod =
    dataset["@type"].includes(NKOD.SourceCkan) ||
    dataset["@type"].includes(NKOD.SourceDcat) ||
    dataset["@type"].includes(NKOD.SourceSparql);
  const actionStyle = {"color": "grey"};
  if (isFromForm) {
    return (
      <span>
        <a
          href={getFormLink(language, DATASET_EDIT, dataset.iri)}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            edit
          </i>
        </a>
        <a
          href={getFormLink(language, DATASET_DELETE, dataset.iri)}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            delete_forever
          </i>
        </a>
      </span>
    )
  } else if (isFromLkod) {
    return (
      <span>
        <a
          href={getFormLink(language, CATALOG_DELETE, form["lkod"])}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i className="material-icons pl-2" style={actionStyle}>
            delete_forever
          </i>
        </a>
      </span>
    )
  }
  return null;
}

function asArray(value) {
  if (value === undefined) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
