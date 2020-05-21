import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {formatNumber} from "../../utils";
import {register, getGlobal, DEFAULT_FACET_SIZE} from "../../../client-api";
import {DATASET_LIST_FACET_FILTER} from "../../nkod-component-names";

const SHOW_MORE_STEP = 7;

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
function FacetFilter(props) {
  const defaultFacetSize = getGlobal(DEFAULT_FACET_SIZE);
  const [visible, setVisible] = useState(defaultFacetSize);

  const showMore = () => {
    const limit = visible + SHOW_MORE_STEP;
    setVisible(limit);
    if (limit >= props.facetData.length) {

      props.fetchMore(limit);
    }
  };

  const showMoreVisible =
    !props.facetAllFetched || visible < props.facetData.length;

  const showPopularVisible =
    visible > defaultFacetSize
    && props.facetData.length > defaultFacetSize;

  const showPopular = () => setVisible(defaultFacetSize);

  const items = [
    ...props.facetData.filter(item => props.facetActive.includes(item.code)),
    ...selectRemainingFacetsToShow(
      props.facetData,
      visible - props.facetActive.length,
      props.facetActive
    ),
  ];

  if (props.fetchLabels) {
    props.fetchLabels(items.map(item => item.iri));
  }

  return (
    <div className="mt-2">
      <h3 className="p-lg-2">
        {props.t(props.label)}
        {props.facetCount !== undefined && " (" + props.facetCount + ")"}
      </h3>
      <ListGroup>
        {
          items.map((item, index) => (
            <ListGroupItem
              key={item.code}
              onClick={() => props.toggleFacet(item.code)}
              action
              className="filter-button"
              active={index < props.facetActive.length}
              style={{"wordWrap": "break-word"}}
            >
              {props.getFacetLabel(item)} ({formatNumber(item.count)})
              {index < props.facetActive.length &&
              <i
                className="material-icons center pl-2"
                style={{"float": "right"}}
              >
                close
              </i>
              }
            </ListGroupItem>
          ))
        }
        {showMoreVisible && <ListGroupItem
          key="show-more"
          onClick={showMore}
          action
          className="filter-button"
        >
          <strong>{props.t("facet.show_more")}</strong>
        </ListGroupItem>
        }
        {showPopularVisible && <ListGroupItem
          key="show-popular"
          onClick={showPopular}
          action
          className="filter-button"
        >
          <strong>{props.t("facet.show_popular")}</strong>
        </ListGroupItem>
        }
      </ListGroup>
    </div>
  );

}

FacetFilter.propTypes = {
  //
  "t": PropTypes.func.isRequired,
  "label": PropTypes.string.isRequired,
  "getFacetLabel": PropTypes.func.isRequired,
  "fetchMore": PropTypes.func.isRequired,
  "toggleFacet": PropTypes.func.isRequired,
  "facetActive": PropTypes.array.isRequired,
  // withFaceProps
  "facetName": PropTypes.string.isRequired,
  "facetData": PropTypes.arrayOf(PropTypes.shape({
    "code": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
  })).isRequired,
  "facetAllFetched": PropTypes.bool.isRequired,
  "facetCount": PropTypes.number,
  "fetchLabels": PropTypes.func,
};

register({
  "name": DATASET_LIST_FACET_FILTER,
  "element": FacetFilter,
});

function selectRemainingFacetsToShow(array, size, active) {
  const filtered = array.filter(item => !active.includes(item.code));
  if (filtered.length < size) {
    return filtered;
  } else {
    return filtered.splice(0, size);
  }
}

