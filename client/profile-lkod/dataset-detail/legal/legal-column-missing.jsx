import React from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle, ListGroup} from "reactstrap";
import {register, registerOnlyOnce, translateString} from "../../viewer-api";

import translations from "./legal-column.json";

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

register({
  "name": "dataset-detail.parts.legal-column-missing",
  "element": LegalColumnMissing,
});

registerOnlyOnce({
  "name": "dataset-detail.parts.legal-column-translation",
  "translations": translations,
});
