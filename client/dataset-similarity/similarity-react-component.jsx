import React, {useState} from "react";
import {PropTypes} from "prop-types";

import {withDatasetDetail} from "./similarity-reack-hook";
import {getElement} from "../viewer-react/core/register";
import {Link} from "react-router-dom";
import {createUrl, selectLiteral} from "../viewer-react/service/i18";
import {useLabelApi} from "../viewer-react/service/label";
import {EvaluationLikeButton} from "../dataset-similarity-evaluation";
import {Button} from "reactstrap";

export function SimilarDatasetGroupItem(props) {

  const [expanded, setExpanded] = useState(false);

  if (props.useGroups && props.group.length > 1) {
    return renderGroup(props, expanded, setExpanded);
  } else {
    return renderDataset(props, props.group[0]);
  }

}

SimilarDatasetGroupItem.propTypes = {
  "language": PropTypes.string.isRequired,
  "group": PropTypes.array.isRequired,
  "useGroups": PropTypes.bool.isRequired
};

function renderGroup(props, expanded, setExpanded) {

  const containerStyle = {
    "borderBottom": "2px solid var(--color-text-default)",
    "marginTop": "1rem",
  };

  const topStyle = {
    "display": "flex",
  };

  const nestedStyle = {
    ...topStyle,
    "paddingLeft": "6rem",
  };

  const buttonStyle = {
    "backgroundColor": "transparent",
    "borderColor": "transparent",
  };

  const icon = expanded ? "expand_less" : "expand_circle_down";

  const first = props.group[0];
  const tail = props.group.slice(1).map(dataset => dataset.iri);
  return (
    <div style={containerStyle}>
      <div style={topStyle}>
        <Button style={buttonStyle} onClick={() => setExpanded(!expanded)}>
          <i className="material-icons ps-2">{icon}</i>
        </Button>
        <SimilarDatasetItem
          dataset={first}
          language={props.language}
          children={tail}
        />
      </div>
      {expanded && props.group.slice(1).map((dataset) => (
        <div style={nestedStyle} key={dataset.iri}>
          <SimilarDatasetItem
            dataset={dataset}
            language={props.language}
          />
        </div>
      ))}
    </div>
  )
}

function renderDataset(props, dataset) {
  const containerStyle = {
    "borderBottom": "2px solid var(--color-text-default)",
    "marginTop": "1rem",
    "display": "flex",
  };

  return (
    <div style={containerStyle}>
      <SimilarDatasetItem
        dataset={dataset}
        language={props.language}
      />
    </div>
  )
}

function SimilarDatasetItem(props) {
  const selectLabel = useLabelApi();
  const {loading, failed, dataset} =
    withDatasetDetail(props.language, props.dataset.iri);

  if (loading) {
    const Component = getElement("application.loading").element;
    return (<Component/>);
  }

  if (failed) {
    const Component = getElement("application.failed").element;
    return (
      <div>
        <Component/>
      </div>
    );
  }

  if (dataset === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <div>
        <Link to={datasetDetailLinkUrl(props.language, props.dataset.iri)}>
          <h4>{selectLabel(dataset.iri)}</h4>
        </Link>
        <p style={{
          "overflow": "hidden",
          "display": "-webkit-box",
          "WebkitLineClamp": "3",
          "WebkitBoxOrient": "vertical",
          "minHeight": "3rem",
        }}>
          {selectLiteral(props.language, dataset.description)}
        </p>
      </div>
      <EvaluationLikeButton
        dataset={props.dataset.iri}
        children={props.children}
      />
    </React.Fragment>
  );
}

SimilarDatasetItem.propTypes = {
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
  "children": PropTypes.array
};

function datasetDetailLinkUrl(language, iri) {
  return createUrl(language, "/dataset", {"dataset": iri});
}
