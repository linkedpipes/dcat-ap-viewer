import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {register, createUrl, t, selectLiteral} from "../viewer-api";

import {useDatasetVdf} from "./vdf-service";

import translations from "./dataset-detail-vdf.json";

function DatasetDetailVdf(props) {
  const [usedAsCodelistBy, usingCodelists, datasets] =
    useDatasetVdf(props.language, props.dataset.iri);

  const datasetUsedAsCodelistBy =
    usedAsCodelistBy.map(iri => datasets[iri])
      .filter(item => item !== undefined);

  const datasetUsingCodelists =
    usingCodelists.map(iri => datasets[iri])
      .filter(item => item !== undefined);

  return (
    <React.Fragment>
      {datasetUsedAsCodelistBy.length > 0 &&
        <React.Fragment>
          <hr/>
          <h2>{t("dataset-detail.vdfPublishers")}</h2>
          <DatasetList
            datasets={datasetUsedAsCodelistBy}
            selectLabel={props.selectLabel}
            language={props.language}/>
        </React.Fragment>
      }
      {datasetUsingCodelists.length > 0 &&
        <React.Fragment>
          <hr/>
          <h2>{t("dataset-detail.vdfCodelist")}</h2>
          <DatasetList
            datasets={datasetUsingCodelists}
            selectLabel={props.selectLabel}
            language={props.language}/>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

DatasetDetailVdf.propTypes = {
  "dataset": PropTypes.object.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.vdf",
  "element": DatasetDetailVdf,
  "translations": translations,
});

function DatasetList({datasets, selectLabel, language}) {
  return (
    <React.Fragment>
      {datasets.map((dataset) => (
        <DatasetItem
          key={dataset.iri}
          selectLabel={selectLabel}
          language={language}
          dataset={dataset}
        />
      ))}
    </React.Fragment>
  )
}

function DatasetItem(props) {
  const dataset = props.dataset;
  return (
    <div>
      <Link to={datasetDetailLinkUrl(props.language, dataset.iri)}>
        <h4>{selectLiteral(props.language, dataset.title)}</h4>
      </Link>
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {selectLiteral(props.language, dataset.description)}
      </p>
      <hr/>
    </div>
  );
}

function datasetDetailLinkUrl(language, iri) {
  return createUrl(language, "/dataset", {"dataset": iri});
}
