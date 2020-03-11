import {
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
  register,
} from "../../../client-api";
import React, {useState} from "react";
import {getRegisteredElement} from "../../../../client/app/register";
import {
  DATASET_LIST_FACET_FILTER,
  DATASET_LIST_FACET_FILTERS,
} from "../../nkod-component-names";
import {Button, Col} from "reactstrap";
import {PropTypes} from "prop-types";

function Facets({t, tLabel, "facetContainer": FacetContainer}) {
  const [facetsOpen, setFacetsOpen] = useState(false);
  //
  const FacetFilter = getRegisteredElement(DATASET_LIST_FACET_FILTER);
  const facetClassName = "collapse-sm-down" + (facetsOpen ? " show" : "");
  const selectKeywordId = (item) => item.code;
  return (
    <Col xs={12} md={3}>
      <div className="d-sm-none">
        <Button
          onClick={() => setFacetsOpen(!facetsOpen)}
          style={{"margin": "1em"}}
        >
          {t(facetsOpen ? "facet.hide" : "facet.show")}
        </Button>
      </div>
      <div className={facetClassName}>
        <FacetContainer
          group={QUERY_DATASET_LIST_PUBLISHER}
          component={FacetFilter}
          t={t}
          label="publishers"
          getFacetLabel={(item) => tLabel(item.iri)}
          fetchLabelsFromRemote={true}
        />
        <FacetContainer
          group={QUERY_DATASET_LIST_THEME}
          component={FacetFilter}
          t={t}
          label="themes"
          getFacetLabel={(item) => tLabel(item.iri)}
          fetchLabelsFromRemote={true}
        />
        <FacetContainer
          group={QUERY_DATASET_LIST_KEYWORD}
          component={FacetFilter}
          t={t}
          label="keywords"
          getFacetLabel={selectKeywordId}
          getFacetId={selectKeywordId}
        />
        <FacetContainer
          group={QUERY_DATASET_LIST_FORMAT}
          component={FacetFilter}
          t={t}
          label="formats"
          getFacetLabel={(item) => tLabel(item.iri)}
          fetchLabelsFromRemote={true}
        />
      </div>
    </Col>
  )
}

Facets.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "facetContainer": PropTypes.object.isRequired,
};


register({
  "name": DATASET_LIST_FACET_FILTERS,
  "element": Facets,
});
