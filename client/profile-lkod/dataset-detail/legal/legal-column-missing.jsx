import React from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle, ListGroup} from "reactstrap";
import {t, translateString} from "../../viewer-api";

function LegalDcatApColumn(props) {
  return (
    <Card>
      <CardTitle tag="h6" className="text-muted pl-2 pt-2">
        {translateString(props.language, "distributionLicense")}
      </CardTitle>
      <ListGroup flush={true}>
        <li className="list-group-item px-2">
          {translateString(props.language, "license.missing")}
        </li>
      </ListGroup>
    </Card>
  )
}

LegalDcatApColumn.propTypes = {
  "license": PropTypes.string.isRequired,
};

export default LegalDcatApColumn;
