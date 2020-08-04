import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {PropTypes} from "prop-types";
import {
  register,
  fetchLabels,
  selectT,
  selectTUrl,
  selectTLabel,
  selectTLiteral,
  selectLanguage,
  getGlobal,
  getRegisteredElement,
  showModal,
  DEREFERENCE_PREFIX,
  URL_DATASET_LIST,
  QUERY_DATASET_LIST_PUBLISHER,
} from "../../client-api";
import {
  Status,
  datasetSelector,
  qualitySelector,
  fetchDataset,
  fetchDatasetQuality,
  ELEMENT_DATASET_DETAIL,
} from "../../../client/dataset-detail";
import {Link} from "react-router-dom";
import {
  DATASET_DETAIL_KEYWORDS,
  DATASET_DETAIL_PROPERTIES,
} from "../nkod-component-names";
import Parts from "./parts.jsx";
import DcatApForms from "../dcat-ap-forms";
import Descendants from "./descendants";

const DatasetView = ({iri}) => {
  const dispatch = useDispatch();
  const t = useSelector(selectT);
  const tLabel = useSelector(selectTLabel);
  const tLiteral = useSelector(selectTLiteral);
  const tUrl = useSelector(selectTUrl);
  const language = useSelector(selectLanguage);
  const openModal = (body) => dispatch(showModal(undefined, body));
  const dataset = useSelector(datasetSelector);
  const quality = useSelector(
    (state) => qualitySelector(state, iri));
  if (dataset.status === Status.Undefined) {
    dispatch(fetchDataset(iri));
    return datasetIsLoadingView();
  }
  if (dataset.status === Status.Loading) {
    return datasetIsLoadingView();
  }
  if (dataset.status !== Status.Ready) {
    console.error("Invalid state:", dataset.status);
    return datasetLoadingFailedView();
  }
  fetchQuality(dispatch, dataset, quality);
  dispatch(fetchLabels(collectLabels(dataset)));
  return datasetReadyView(
    t, tLabel, tLiteral, tUrl,
    (labels) => dispatch(fetchLabels(labels)),
    language, openModal, dataset, quality);
};

DatasetView.propTypes = {
  "iri": PropTypes.string.isRequired,
};

register({
  "name": ELEMENT_DATASET_DETAIL,
  "element": DatasetView,
});

function datasetIsLoadingView() {
  return (
    <div className="container">
      DATASET DETAIL VIEW - LOADING
    </div>
  );
}

function datasetLoadingFailedView() {
  return (
    <div className="container">
      DATASET DETAIL VIEW - FAILED
    </div>
  );
}

function fetchQuality(dispatch, dataset, quality) {
  if (quality.status === Status.Undefined) {
    dispatch(fetchDatasetQuality(dataset.iri));
  }
}

function datasetReadyView(
  t, tLabel, tLiteral, tUrl, fetchLabels,
  language, openModal, dataset, quality) {
  const link = getGlobal(DEREFERENCE_PREFIX) + dataset.iri;
  const Keywords = getRegisteredElement(DATASET_DETAIL_KEYWORDS);
  const Properties = getRegisteredElement(DATASET_DETAIL_PROPERTIES);
  return (
    <div className="container">
      <h1>
        {tLabel(dataset.iri)}
        <a
          href={link}
          title={t("follow_link")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-icons pl-2">open_in_new</i>
        </a>
        <DcatApForms
          t={t}
          dataset={dataset}
          language={language}
        />
      </h1>
      <h2>
        <Link to={getPublisherSearchLink(dataset, tUrl)}>
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
        tLiteral={tLiteral}
        tUrl={tUrl}
        dataset={dataset}
        quality={quality}
        openModal={openModal}
      />
      <hr/>
      <Parts parts={dataset.distributions}/>
      <Descendants
        iri={dataset.iri}
        tLabel={tLabel}
        tLiteral={tLiteral}
        tUrl={tUrl}
        fetchLabels={fetchLabels}
      />
    </div>
  );
}

function collectLabels(dataset) {
  const asArray = (value) => {
    if (value === undefined) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  };

  return [
    dataset.publisher,
    ...asArray(dataset.frequency),
    ...asArray(dataset.spatial),
    ...asArray(dataset.themes),
    ...asArray(dataset.datasetThemes),
  ];
}

function getPublisherSearchLink(dataset, tUrl) {
  return tUrl(
    URL_DATASET_LIST,
    {[QUERY_DATASET_LIST_PUBLISHER]: dataset.publisher}
  );
}
