import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {formatNumber} from "../../utils";

const DEFAULT_VISIBLE_COUNT = 7;

const SHOW_MORE_STEP = 10;

/**
 * Facet list.
 * Show list of items that can be selected/de-selected.
 *
 * The facet list show only limited number of elements, and may require fetch
 * of addition elements if needed.
 *
 * If more elements are required and the facet is later set to default size
 * and re-expanded again, the already available data are fetched.
 */
export default function FacetFilter(props) {
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  // We allays show all selected first.
  let visible = [
    ...props.activeFacets,
    ...selectSubArray(
      props.facets,
      visibleCount - props.activeFacets.length,
      props.activeFacets,
    ),
  ];

  if (props.fetchLabelsFromRemote) {
    props.fetchLabels(visible.map((item) => item.iri));
  }

  const onShowMore = () => {
    if (visibleCount + SHOW_MORE_STEP >= props.facets.length) {
      props.fetchMore(SHOW_MORE_STEP);
    }
    setVisibleCount(visibleCount + SHOW_MORE_STEP);
  };

  const onShowPopular = () => setVisibleCount(DEFAULT_VISIBLE_COUNT);

  const getFacetId = props.getFacetId || ((item) => item.iri);
  return (
    <div className="mt-2">
      <h3 className="p-lg-2">
        {props.t(props.label)}
        &nbsp;
        ({props.facets.length})
      </h3>
      <ListGroup>
        {
          visible.map((item, index) => (
            <ListGroupItem
              key={item.iri}
              onClick={() => props.onToggleFacet(getFacetId(item))}
              action
              className="filter-button"
              active={index < props.activeFacets.length}
              style={{"wordWrap": "break-word"}}
              tag="button"
            >
              {props.getFacetLabel(item)} ({formatNumber(item.count)})
            </ListGroupItem>
          ))
        }
        {
          (!props.isAllFetched || visibleCount < props.facets.length)
          &&
          <ListGroupItem
            key="show-more"
            onClick={onShowMore}
            action
            className="filter-button"
            tag="button"
          >
            <strong>{props.t("facet.show_more")}</strong>
          </ListGroupItem>
        }
        {
          visibleCount > DEFAULT_VISIBLE_COUNT
          && props.facets.length > DEFAULT_VISIBLE_COUNT
          &&
          <ListGroupItem
            key="show-popular"
            onClick={onShowPopular}
            action
            className="filter-button"
            tag="button"
          >
            <strong>{props.t("facet.show_popular")}</strong>
          </ListGroupItem>
        }
      </ListGroup>
    </div>
  )
}

FacetFilter.propTypes = {
  "t": PropTypes.func.isRequired,
  "label": PropTypes.string.isRequired,
  "getFacetLabel": PropTypes.func.isRequired,
  "getFacetId": PropTypes.func,
  "facets": PropTypes.arrayOf(PropTypes.shape({
    "iri": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
  })).isRequired,
  "fetchMore": PropTypes.func.isRequired,
  "isAllFetched": PropTypes.bool.isRequired,
  "activeFacets": PropTypes.array.isRequired,
  "onToggleFacet": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
  "fetchLabelsFromRemote": PropTypes.bool,
};

function selectSubArray(array, size, ignore) {
  const filtered = array.filter(item => !ignore.includes(item));
  if (filtered.length < size) {
    return filtered;
  } else {
    return filtered.splice(0, size);
  }
}
