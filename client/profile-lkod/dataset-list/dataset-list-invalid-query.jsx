import React from "react";
import {PropTypes} from "prop-types";
import {Container} from "reactstrap";

import {register, t, tLink} from "../viewer-api";

function DatasetListInvalidQuery() {
  return (
    <Container>
      <p style={{"textAlign": "center"}}>
        {t("invalid_dataset_list_query_argument")} <br/>
        {tLink("/datasets", "invalid_dataset_list_query_argument_link")}
      </p>
    </Container>
  );
}

DatasetListInvalidQuery.propTypes = {
  "report": PropTypes.arrayOf(PropTypes.shape({
    "name": PropTypes.string.isRequired,
    "value": PropTypes.any.isRequired,
  })).isRequired,
};

register({
  "name": "dataset-list.invalid-query",
  "element": DatasetListInvalidQuery,
});
