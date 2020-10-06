import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {PropTypes} from "prop-types";
import {
  register,
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
  URL_DATASET_DETAIL,
  QUERY_DATASET_DETAIL_IRI,
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
  STATUS_LOADING,
  STATUS_FAILED,
  DATASET_DETAIL_KEYWORDS,
  DATASET_DETAIL_PROPERTIES,
  DATASET_DETAIL_DESCENDANTS,
  DATASET_DETAIL_METADATA,
  DATASET_DETAIL_FORMS,
  DATASET_DETAIL_DISTRIBUTION_LIST,
} from "../nkod-component-names";

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
  useEffect(() => {
    if (dataset.resourceStatus === Status.Undefined) {
      dispatch(fetchDataset(iri));
    }
    if (dataset.resourceStatus === Status.Ready) {
      dispatch(fetchDatasetQuality(dataset.iri));
    }
  }, [dataset]);
  //
  const LoadingView = getRegisteredElement(STATUS_LOADING);
  const FailedView = getRegisteredElement(STATUS_FAILED);
  switch(dataset.resourceStatus) {
  case Status.Undefined:
  case Status.Loading:
    return (<LoadingView/>);
  case Status.Failed:
    return (<FailedView/>);
  case Status.Ready:
    return datasetReadyView(
      t, tLabel, tLiteral, tUrl,
      language, openModal, dataset, quality);
  default:
    return null;
  }
};

DatasetView.propTypes = {
  "iri": PropTypes.string.isRequired,
};

register({
  "name": ELEMENT_DATASET_DETAIL,
  "element": DatasetView,
});

function datasetReadyView(
  t, tLabel, tLiteral, tUrl, language, openModal, dataset, quality) {
  const Keywords = getRegisteredElement(DATASET_DETAIL_KEYWORDS);
  const Properties = getRegisteredElement(DATASET_DETAIL_PROPERTIES);
  const Descendants = getRegisteredElement(DATASET_DETAIL_DESCENDANTS);
  const WebPageMetadata = getRegisteredElement(DATASET_DETAIL_METADATA);
  const DcatApForms = getRegisteredElement(DATASET_DETAIL_FORMS);
  const Distributions = getRegisteredElement(DATASET_DETAIL_DISTRIBUTION_LIST);
  return (
    <div className="container">
      <WebPageMetadata
        tLabel={tLabel}
        tLiteral={tLiteral}
        dataset={dataset}
      />
      <h1>
        {tLabel(dataset.iri)}
        <a
          href={getGlobal(DEREFERENCE_PREFIX) + dataset.iri}
          title={t("followLink")}
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
      {dataset.parentDataset && (
        <p>
          {t("datasetIsPartOf")}&nbsp;
          <a href={datasetLinkUrl(tUrl, dataset.parentDataset)}>
            {tLabel(dataset.parentDataset)}
          </a>
        </p>
      )}
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
      <Distributions parts={dataset.distributions}/>
      <Descendants
        iri={dataset.iri}
        t={t}
        tLabel={tLabel}
        tLiteral={tLiteral}
        tUrl={tUrl}
      />
    </div>
  );
}

function getPublisherSearchLink(dataset, tUrl) {
  return tUrl(
    URL_DATASET_LIST,
    {[QUERY_DATASET_LIST_PUBLISHER]: dataset.publisher}
  );
}

function datasetLinkUrl(tUrl, iri) {
  return tUrl(URL_DATASET_DETAIL, {[QUERY_DATASET_DETAIL_IRI]: iri});
}
