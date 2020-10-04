import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {
  register,
  getGlobal,
  selectT,
  DEFAULT_FACET_SIZE,
} from "../../client-api";
import {useSelector} from "react-redux";

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
  const t = useSelector(selectT);
  const defaultFacetSize = getGlobal(DEFAULT_FACET_SIZE);
  const [visible, setVisible] = useState(defaultFacetSize);

  const showMoreVisible =
    props.facetCount > props.facetData.length
    || visible < props.facetData.length;

  const showPopularVisible =
    visible > defaultFacetSize
    && props.facetData.length > defaultFacetSize;

  const showPopular = () => setVisible(defaultFacetSize);

  const showMore = () => {
    const limit = visible + SHOW_MORE_STEP;
    setVisible(limit);
    if (limit >= props.facetData.length) {
      props.onFetchMore(limit);
    }
  };

  const items = [
    ...props.facetData.filter(item => props.activeFacets.includes(item.code)),
    ...selectRemainingFacetsToShow(
      props.facetData,
      visible - props.activeFacets.length,
      props.activeFacets
    ),
  ];

  return (
    <div className="mt-2">
      <h3 className="p-lg-2">
        {t(props.label)}
        {
          !props.hydeCount
          && props.facetCount !== undefined
          && " (" + props.facetCount + ")"
        }
      </h3>
      <ListGroup>
        {
          items.map((item, index) => (
            <ListGroupItem
              key={item.code}
              onClick={() => props.onFacetClick(item.code)}
              action
              className="filter-button"
              active={index < props.activeFacets.length}
              style={{"wordWrap": "break-word"}}
            >
              {props.selectFacetLabel(item)}
              {!props.hydeCount && " (" + item.count + ")"}
              {index < props.activeFacets.length &&
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
    "code": PropTypes.string.isRequired,
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

function selectRemainingFacetsToShow(array, size, active) {
  const filtered = array.filter(item => !active.includes(item.code));
  if (filtered.length < size) {
    return filtered;
  } else {
    return filtered.splice(0, size);
  }
}
