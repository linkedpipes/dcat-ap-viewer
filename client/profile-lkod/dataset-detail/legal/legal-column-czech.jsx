import React from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle, ListGroup} from "reactstrap";

import {t, register, registerOnlyOnce} from "../../viewer-api";
import Authorship from "./authorship";
import DatabaseAuthorship from "./database-authorship";
import ProtectedDatabaseAuthorship from "./protected-database-authorship";
import PersonalData from "./personal-data";

import translations from "./legal-column.json";

function LegalColumnCzech(props) {
  return (
    <Card>
      <CardTitle tag="h6" className="text-muted ps-2 pt-2">
        {t("distributionLicense")}
      </CardTitle>
      <ListGroup flush={true}>
        <Authorship
          language={props.language}
          showModal={props.showModal}
          legal={props.distribution.legal}
          quality={props.quality}
        />
        <DatabaseAuthorship
          language={props.language}
          showModal={props.showModal}
          legal={props.distribution.legal}
          quality={props.quality}
        />
        <ProtectedDatabaseAuthorship
          language={props.language}
          showModal={props.showModal}
          legal={props.distribution.legal}
          quality={props.quality}
        />
        <PersonalData
          language={props.language}
          showModal={props.showModal}
          legal={props.distribution.legal}
        />
      </ListGroup>
    </Card>
  );
}

LegalColumnCzech.propTypes = {
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
  "showModal": PropTypes.func.isRequired,
  "language": PropTypes.string.isRequired,
};

register({
  "name": "dataset-detail.parts.legal-column-czech",
  "element": LegalColumnCzech,
});

registerOnlyOnce({
  "name": "dataset-detail.parts.legal-column-translation",
  "translations": translations,
});
