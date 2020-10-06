import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {PropTypes} from "prop-types";
import {Button} from "reactstrap";
import TagCloud from "../../user-iterface/tag-cloud";
import {selectT} from "../../../client-api";
import {
  toggleFacet,
} from "../../../../client/dataset-list";

const DEFAULT_FACET_SIZE = 32;

const INCREASE_BY_SIZE = 16;

export default function GenericFacetView(props) {
  const t = useSelector(selectT);
  const [size, setSize] = useState(DEFAULT_FACET_SIZE);
  const onShowMore = useCallback(() => {
    const nextSize = size + INCREASE_BY_SIZE;
    setSize(nextSize);
    const nextState = {...this.state};
    nextState[props.facetName + "Limit"] = nextSize;
    props.onUpdateViewState(nextState);
  }, [size]);
  const onClickFacet = useCallback((value) => {
    const nextQuery = toggleFacet(props.query, props.facetName, value);
    props.onUpdateNavigation(nextQuery);
  }, [props.query, props.facetName]);
  //
  return renderGenericFacetView(
    t, onClickFacet, onShowMore,
    props.selectFacetLabel, props.facetData, props.facetCount
  );
}

GenericFacetView.propTypes = {
  "facetName": PropTypes.string.isRequired,
  "query": PropTypes.object.isRequired,
  "state": PropTypes.object.isRequired,
  "facetData": PropTypes.arrayOf(PropTypes.exact({
    "iri": PropTypes.string.isRequired,
    "code": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
    "color": PropTypes.string.isRequired,
  })).isRequired,
  "facetCount": PropTypes.number.isRequired,
  "selectFacetLabel": PropTypes.func.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
  "onUpdateViewState": PropTypes.func.isRequired,
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
