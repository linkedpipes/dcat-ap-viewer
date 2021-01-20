import React from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle, ListGroup} from "reactstrap";
import {translateString} from "../../viewer-api";

function LegalColumnMissing(props) {
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
  );
}

LegalColumnMissing.propTypes = {
  "language": PropTypes.string.isRequired,
};

export default LegalColumnMissing;
