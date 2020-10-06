import React from "react";
import {Col, Container, Row} from "reactstrap";
import {ELEMENT_DATASET_LIST} from "../../../client/dataset-list";
import {register, getRegisteredElement} from "../../client-api";
import {PropTypes} from "prop-types";

const DatasetList = (props) => {
  const FacetFilter = getRegisteredElement("app.dataset-list.facets");
  const Query = getRegisteredElement("app.dataset-list.query");
  const View = selectView(props.query.view);
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <FacetFilter
            query={props.query}
            state={props.state}
            onUpdateViewQuery={props.onUpdateViewQuery}
            onUpdateViewState={props.onUpdateViewState}
          />
        </Col>
        <Col xs={12} md={9}>
          <div className="m-md-1">
            <Query
              query={props.query}
              onUpdateViewQuery={props.onUpdateViewQuery}
            />
          </div>
          <div className="m-md-1">
            <View
              query={props.query}
              state={props.state}
              onUpdateViewQuery={props.onUpdateViewQuery}
              onUpdateViewState={props.onUpdateViewState}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

DatasetList.propTypes = {
  "query": PropTypes.object.isRequired,
  "state": PropTypes.object.isRequired,
  "onUpdateViewQuery": PropTypes.func.isRequired,
  "onUpdateViewState": PropTypes.func.isRequired,
};

function selectView(view) {
  switch (view) {
  case 1:
    return getRegisteredElement("app.dataset-list.keyword-view");
  case 2:
    return getRegisteredElement("app.dataset-list.theme-view");
  case 0:
  default:
    return getRegisteredElement("app.dataset-list.dataset-view");
  }
}

register({
  "name": ELEMENT_DATASET_LIST,
  "element": DatasetList,
});
