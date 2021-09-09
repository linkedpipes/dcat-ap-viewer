import React, {useEffect, useState} from "react";
import {PropTypes} from "prop-types";

import {getElement, register} from "../../viewer-react/core/register";
import {
  withSimilarDatasets,
  SimilarDatasetGroupItem,
} from "../../dataset-similarity";
import {t} from "../../viewer-react/service/i18";

function DatasetDetailParts(props) {
  const [threshold, setThreshold] = usePersistentState(
    "similarity-evaluation-group-threshold", 0);

  const {loading, failed, groups} = withSimilarDatasets(
    props.dataset.iri,
    threshold === "" ? "" : ("" + threshold / 100));

  return (
    <div>
      <h2>{t("similarDatasets")}</h2>
      <div style={{"position": "relative"}}>
        <div style={{"position": "absolute", "right": "0", "top": "-2rem"}}>
          <label className="form-label" htmlFor="similarityThreshold">
            Group similarity threshold: {threshold / 100}
          </label>
          <input type="range"
            min="0"
            max="50"
            step="10"
            value={threshold}
            disabled={loading}
            onChange={(event) => setThreshold(event.target.value)}
            className="form-range"
            id="similarityThreshold"
          />
        </div>
      </div>
      {renderContent(loading, failed, groups, props.language)}
      <br/>
    </div>
  );
}

DatasetDetailParts.propTypes = {
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
};

register({
  "name": "dataset-detail.parts",
  "element": DatasetDetailParts,
  "translations": {
    "cs": {
      "similarDatasets": "Podobné datové sady",
      "visibleSimilar": "Zobrazeno {visible} z {length}",
      "showMoreSimilar": "Zobrazit více",
    },
    "en": {
      "similarDatasets": "Similar datasets",
      "visibleSimilar": "Visible {visible} out of {length}",
      "showMoreSimilar": "Show more",
    },
  },
});

function usePersistentState(name, defaultValue) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const storageValue = localStorage.getItem(name);
    if (storageValue === null) {
      setValue(defaultValue);
    } else {
      setValue(JSON.parse(storageValue));
    }
  }, []);

  return [
    value,
    (newValue) => {
      try {
        localStorage.setItem(name, JSON.stringify(newValue));
      } catch (ex) {
        // No data saved for you dear user. Can be by private mode.
      }
      setValue(newValue);
    },
  ];
}

function renderContent(loading, failed, groups, language) {
  if (loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (failed) {
    const Component = getElement("application.failed").element;
    return (<Component/>);
  }

  return groups.map((group) => (
    <SimilarDatasetGroupItem
      key={group[0].iri}
      group={group}
      language={language}/>
  ));

}
