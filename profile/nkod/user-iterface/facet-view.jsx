import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {selectTLabel} from "../../client-api";
import TagCloud from "./tag-cloud";

function FacetView({tLabel, items, onToggle, fetchMore}) {
  fetchMore(-1);

  const renderer = (tag, size) => tagRenderer(tLabel, tag, size);

  return (
    <div
      className="col col-sm-12 col-md-9 offset-md-1"
      style={{"textAlign": "center", "display": "block"}}
    >
      <br/>
      <TagCloud
        tags={items}
        renderFunction={renderer}
        onClick={onToggle}
      />
    </div>
  )
}

FacetView.propTypes = {
  "tLabel": PropTypes.func.isRequired,
  "items": PropTypes.arrayOf(PropTypes.exact({
    "iri": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
    "color": PropTypes.string.isRequired,
  })).isRequired,
  "onToggle": PropTypes.func.isRequired,
  "fetchMore": PropTypes.func.isRequired,
};

export default connect((state) => ({
  "tLabel": selectTLabel(state),
}))(FacetView);

function tagRenderer(tLabel, tag, size) {
  const style = {
    "marginLeft": "1rem",
    "verticalAlign": "middle",
    "display": "inline-block",
    "cursor": "pointer",
  };

  // If all elements have the same count, then size is NaN.
  if (isNaN(size)) {
    size = 32;
  }

  return (
    <span className="tag-cloud-tag" style={style} key={tag.iri}>
      <span style={{"color": tag.color, "fontSize": size}}>
        {tLabel(tag.iri)}
      </span>
    </span>
  )
}