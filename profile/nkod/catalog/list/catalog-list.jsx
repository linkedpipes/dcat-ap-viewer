import React from "react";
import {connect} from "react-redux";
import {
  selectT,
  selectTLabel,
  fetchLabels,
  ELEMENT_CATALOG_LIST,
  register,
  selectLanguage,
  getRegisteredElement,
} from "../../../client-api";
import {formatNumber} from "../../utils";
import {PropTypes} from "prop-types";
import withStatus from "../../user-iterface/status";
import {CATALOG_LIST_ITEM} from "../../nkod-component-names";

function CatalogList({catalogs, t, tLabel, fetchLabels, language}) {
  const CatalogListItem = getRegisteredElement(CATALOG_LIST_ITEM);
  return (
    <div className="container p-3">
      <h4>
        {formatNumber(catalogs.length)}&nbsp;{t("catalogs_found")}
      </h4>
      <hr/>
      <div className="row">
        {catalogs.map((catalog) => (
          <CatalogListItem
            key={catalog.iri}
            tLabel={tLabel}
            fetchLabels={fetchLabels}
            catalog={catalog}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

CatalogList.propTypes = {
  "catalogs": PropTypes.arrayOf(PropTypes.object).isRequired,
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": ELEMENT_CATALOG_LIST,
  "element": connect((state) => ({
    "t": selectT(state),
    "tLabel": selectTLabel(state),
    "language": selectLanguage(state),
  }), (dispatch) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
  }))(withStatus(CatalogList)),
});
