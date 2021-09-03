import React, {useEffect, useState} from "react";
import {PropTypes} from "prop-types";

import {getElement, register} from "../../viewer-react/core/register";
import {
  withSimilarDatasets,
} from "../../dataset-similarity";
import {t} from "../../viewer-react/service/i18";
import {
  SimilarDatasetGroupItem,
} from "../../dataset-similarity/similarity-react-component";

function DatasetDetailParts(props) {
  const [useGroups, toggleUseGroups] = usePersistentState(
    "similarity-evaluation-use-groups", false);
  const {loading, failed, groups} = withSimilarDatasets(
    props.dataset.iri, useGroups);

  if (loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (failed) {
    const Component = getElement("application.failed").element;
    return (<Component/>);
  }
  return (
    <React.Fragment>
      <h2>{t("similarDatasets")}</h2>
      <div style={{"float": "right"}}>
        <div className="form-check form-switch">
          <input className="form-check-input"
            type="checkbox"
            id="groupDatasets"
            checked={useGroups}
            onChange={toggleUseGroups}/>
          <label className="form-check-label"
            htmlFor="groupDatasets"
          >Group datasets</label>
        </div>
      </div>
      <br/>
      {groups.map((group) => (
        <SimilarDatasetGroupItem
          key={group[0].iri}
          group={group}
          language={props.language}
          useGroups={useGroups}/>
      ))}
      <br/>
    </React.Fragment>
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
    },
    "en": {
      "similarDatasets": "Similar datasets",
    },
  },
});

function usePersistentState(name, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storageValue = localStorage.getItem(name);
    if (storageValue === null) {
      return;
    }
    setValue(JSON.parse(storageValue));
  }, []);

  return [
    value,
    () => {
      try {
        localStorage.setItem(name, JSON.stringify(!value));
      } catch (ex) {
        // No data saved for you dear user. Can be by private mode.
      }
      setValue(!value);
    },
  ];
}