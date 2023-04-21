import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {
  t,
  tUrl,
  tLiteral,
  link,
  useLabelApi,
} from "../../viewer-api";
import {TagList} from "../../components/tag-line";
import {Badge} from "reactstrap";

const DATA_SERVICE = "tag-data-service";

export default function DatasetListItem(props) {
  const selectLabel = useLabelApi();

  return (
    <div>
      {tUrl("/dataset", {"dataset": props.dataset.iri}, (url) => (
        <Link to={url}>
          <h4>{selectLabel(props.dataset.iri)}</h4>
        </Link>
      ))}
      {props.showPublisher
        && link(
          "/datasets",
          selectLabel(props.dataset.publisher),
          {"publisher": props.dataset.publisher},
        )}
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {tLiteral(props.dataset.description)}
      </p>
      <DatasetItemTags selectLabel={selectLabel} dataset={props.dataset} />
      <hr/>
    </div>
  );
}

DatasetListItem.propTypes = {
  "dataset": PropTypes.shape({
    "iri": PropTypes.string.isRequired,
    "publisher": PropTypes.string,
    "description": PropTypes.object.isRequired,
    "formats": PropTypes.arrayOf(PropTypes.string).isRequired,
    "containsService": PropTypes.bool.isRequired,
  }).isRequired,
  "showPublisher": PropTypes.bool.isRequired,
};

function DatasetItemTags({selectLabel, dataset}) {
  const badges = [];
  const badgeStyle = {
    "marginLeft": "1em",
    "marginBottom": "0.5em",
    "fontSize": "0.7em",
  };

  if (dataset.containsService) {
    badges.push((<Badge
      key={DATA_SERVICE}
      style={badgeStyle}
      className="badge-data-service"
      outline
      pill
    >
      {t(DATA_SERVICE)}
    </Badge>));
  }

  const formats = dataset.formats ?? [];
  badges.push(...formats.map(item => (
    <Badge
      key={item}
      style={badgeStyle}
      color="info"
      outline
      pill
    >
      {selectLabel(item)}
    </Badge>
  )));

  if (badges.length === 0) {
    return null;
  }

  return (
    <div style={{"marginTop": "0.2em"}}>
      {badges}
    </div>
  );
}

