import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {
  tUrl,
  tLiteral,
  link,
  useLabelApi,
  translateString,
  NavigationContext
} from "../../viewer-api";
import TagLine from "../../components/tag-line";

const DATA_SERVICE = "tag-data-service";

export default function DatasetListItem(props) {
  const selectLabel = useLabelApi();
  const {language} = useContext(NavigationContext);

  const formats = [
    ...(props.dataset.containsService ? [DATA_SERVICE] : []),
    ...props.dataset.formats
  ];
  const labelSelector = (value) => {
    if (DATA_SERVICE === value) {
      return translateString(language, DATA_SERVICE);
    }
    return selectLabel(value);
  };

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
      <TagLine
        items={formats}
        size={0.7}
        labelFunction={labelSelector}
      />
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
