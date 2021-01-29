import React from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle} from "reactstrap";
import {register, registerOnlyOnce, translateString} from "../../viewer-api";

import translations from "./legal-column.json";

function LegalColumnDcatAp(props) {
  return (
    <Card>
      <CardTitle tag="h6" className="text-muted pl-2 pt-2">
        <a
          href={props.license}
          className="card-link"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {translateString(props.language, "distributionLicense")}
        </a>
      </CardTitle>
    </Card>
  );
}

LegalColumnDcatAp.propTypes = {
  "license": PropTypes.string.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.parts.legal-column-dcat-ap",
  "element": LegalColumnDcatAp,
});

registerOnlyOnce({
  "name": "dataset-detail.parts.legal-column-translation",
  "translations": translations,
});
