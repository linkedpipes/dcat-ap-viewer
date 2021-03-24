import React, {useState, useCallback} from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";

import {register, t, formatNumber} from "../viewer-api";

const DEFAULT_FACET_SIZE = 7;

const SHOW_MORE_STEP = 7;

/**
 * Facet list shows list of items that can be selected/de-selected.
 *
 * The facet list show only limited number of elements, and may require fetch
 * of addition elements if needed.
 *
 * If more elements are required and the facet is later set to default size
 * and re-expanded again, the already available data are fetched.
 */
function Facet(props) {
  const [visible, setVisible] = useState(DEFAULT_FACET_SIZE);

  const showMoreVisible =
    props.facetCount > props.facetData.length
    || visible < props.facetData.length;

  const showPopularVisible =
    visible > DEFAULT_FACET_SIZE
    && props.facetData.length > DEFAULT_FACET_SIZE;

  const showPopular = useCallback(() => setVisible(DEFAULT_FACET_SIZE), []);

  const {facetData, onFetchMore} = props;
  const showMore = useCallback(() => {
    const limit = visible + SHOW_MORE_STEP;
    setVisible(limit);
    if (limit >= facetData.length) {
      onFetchMore(limit);
    }
  }, [visible, facetData, onFetchMore]);

  const items = [
    ...selectActiveFacetsToShow(props.facetData, props.activeFacets),
    ...selectRemainingFacetsToShow(
      props.facetData,
      visible - props.activeFacets.length,
      props.activeFacets,
    ),
  ];

  return (
    <div className="mt-2">
      <h3 className="p-lg-2">
        {t(props.label)}
        {
          !props.hydeCount
          && props.facetCount !== undefined
          && " (" + formatNumber(props.facetCount) + ")"
        }
      </h3>
      <ListGroup>
        {
          items.map((item, index) => (
            <ListGroupItem
              key={item.queryCode}
              onClick={() => props.onFacetClick(item.queryCode)}
              action
              className="filter-button"
              active={index < props.activeFacets.length}
              style={{"wordWrap": "break-word"}}
            >
              {props.selectFacetLabel(item)}
              {!props.hydeCount && " (" + formatNumber(item.count) + ")"}
              {index < props.activeFacets.length &&
              <i
                className="material-icons center ps-2"
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
          <strong>{t("facet.showMore")}</strong>
        </ListGroupItem>
        }
        {showPopularVisible && <ListGroupItem
          key="show-popular"
          onClick={showPopular}
          action
          className="filter-button"
        >
          <strong>{t("facet.showPopular")}</strong>
        </ListGroupItem>
        }
      </ListGroup>
    </div>
  );

}

Facet.propTypes = {
  /**
   * Label, is translated before is used.
   */
  "label": PropTypes.string.isRequired,
  /**
   * If true number of facets is not shown.
   */
  "hydeCount": PropTypes.bool,
  /**
   * Facet data.
   */
  "facetData": PropTypes.arrayOf(PropTypes.shape({
    "queryCode": PropTypes.string.isRequired,
    "count": PropTypes.number,
  })).isRequired,
  /**
   * Codes of active/selected facets.
   */
  "activeFacets": PropTypes.array.isRequired,
  /**
   * Total number of facet that can be fetched.
   */
  "facetCount": PropTypes.number,
  /**
   * Called when user click on facet value, the value may be active or
   * inactive.
   */
  "onFacetClick": PropTypes.func.isRequired,
  /**
   * Request fetch of additional labels.
   */
  "onFetchMore": PropTypes.func,
  /**
   * Function used to get label for entry from facetData.
   */
  "selectFacetLabel": PropTypes.func.isRequired,
};

register({
  "name": "app.dataset-list.facets.element",
  "element": Facet,
});

function selectActiveFacetsToShow(array, active) {
  const result = [];
  for (const code of active) {
    let found = false;
    for (const facet of array) {
      if (facet.queryCode === code) {
        result.push(facet);
        found = true;
        break;
      }
    }
    // We must allow user to deselect the value, this can happen when
    // user access using URL parameters, so the result query
    // from backend may be empty.
    if (!found) {
      result.push({
        "queryCode": code,
        "count": 0,
      });
    }
  }
  return result;
}

function selectRemainingFacetsToShow(array, size, active) {
  const filtered = array.filter(item => !active.includes(item.queryCode));
  if (filtered.length < size) {
    return filtered;
  } else {
    return filtered.splice(0, size);
  }
}
