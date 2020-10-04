import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PropTypes} from "prop-types";
import {Button} from "reactstrap";
import TagCloud from "../../user-iterface/tag-cloud";
import {selectT} from "../../../client-api";
import {
  fetchMoreFacets,
  onToggleFacet,
  updateFacets,
} from "../dataset-list-facet-service";

const DEFAULT_FACET_SIZE = 32;

const INCREASE_BY_SIZE = 16;

export default function GenericFacetView(props) {
  const t = useSelector(selectT);
  const dispatch = useDispatch();
  const [size, setSize] = useState(DEFAULT_FACET_SIZE);
  const onShowMore = () => {
    const nextSize = size + INCREASE_BY_SIZE;
    setSize(nextSize);
    fetchMoreFacets(dispatch, props.query, props.facetName, nextSize);
  };
  const onClickFacet = (facet) => onToggleFacet(
    props.onUpdateNavigation, props.query, props.facetName, facet.code);
  useEffect(() => updateFacets(
    dispatch, {...props.query, [props.facetName + "Limit"]: size}
  ), [props.query]);
  return renderGenericFacetView(
    t, onClickFacet, onShowMore,
    props.selectFacetLabel, props.facetData, props.facetCount
  );
}

GenericFacetView.propTypes = {
  "facetName": PropTypes.string.isRequired,
  "query": PropTypes.object.isRequired,
  "facetData": PropTypes.arrayOf(PropTypes.exact({
    "iri": PropTypes.string.isRequired,
    "code": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
    "color": PropTypes.string.isRequired,
  })).isRequired,
  "facetCount": PropTypes.number.isRequired,
  "selectFacetLabel": PropTypes.func.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
};

function renderGenericFacetView(
  t, onClickFacet, onShowMore, selectFacetLabel, facetData, facetCount
) {
  const renderer =
    (tag, size) => tagRenderer(selectFacetLabel, tag, size);
  return (
    <div
      className="col col-sm-12 col-md-9 offset-md-1"
      style={{"textAlign": "center", "display": "block"}}
    >
      <TagCloud
        tags={facetData}
        renderFunction={renderer}
        onClick={onClickFacet}
      />
      {facetCount > facetData.length && (
        <div>
          <br/>
          <Button
            onClick={onShowMore}
            style={{"float": "left"}}
          >
            {t("facet.showMore")}
          </Button>
        </div>
      )}
    </div>
  );
}

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
    <span className="tag-cloud-tag" style={style} key={tag.iri}>
      <span style={{"color": tag.color, "fontSize": size}}>
        {selectFacetLabel(tag)} ({tag.count})
      </span>
    </span>
  );
}
