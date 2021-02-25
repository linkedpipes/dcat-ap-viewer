import React from "react";
import {PropTypes} from "prop-types";

import {Button} from "reactstrap";

import TagCloud from "../components/tag-cloud";
import {t, formatNumber} from "../viewer-api";

const INCREASE_BY_SIZE = 15;

export default function FacetView(props) {

  const onShowMore = () => props.onShowMore(INCREASE_BY_SIZE);

  const renderer =
    (tag, size) => tagRenderer(props.selectFacetLabel, tag, size);

  return (
    <React.Fragment>
      <h4>
        {t(props.title, {"count": formatNumber(props.facetCount)})}
      </h4>
      <div style={{"textAlign": "center", "display": "block"}}>
        <TagCloud
          tags={props.facets}
          renderFunction={renderer}
          onClick={props.onClickFacet}
        />
      </div>
      {props.facetCount > props.facets.length && (
        <React.Fragment>
          <br/>
          <Button onClick={onShowMore} style={{"float": "left"}}>
            {t("facet.showMore")}
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );

}

FacetView.propTypes = {
  "title": PropTypes.string.isRequired,
  "facets": PropTypes.arrayOf(PropTypes.shape({
    "queryCode": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
    "color": PropTypes.string.isRequired,
  })).isRequired,
  "facetCount": PropTypes.number.isRequired,
  "selectFacetLabel": PropTypes.func.isRequired,
  "onClickFacet": PropTypes.func.isRequired,
  "onShowMore": PropTypes.func.isRequired,
};

function tagRenderer(selectFacetLabel, tag, size) {
  const style = {
    "marginLeft": "1rem",
    "verticalAlign": "middle",
    "display": "inline-block",
    "cursor": "pointer",
  };
  // If all elements have the same facetCount, then size is NaN.
  if (isNaN(size)) {
    size = 32;
  }
  return (
    <span className="tag-cloud-tag" style={style} key={tag.queryCode}>
      <span style={{"color": tag.color, "fontSize": size}}>
        {selectFacetLabel(tag)} ({formatNumber(tag.count)})
      </span>
    </span>
  );
}
