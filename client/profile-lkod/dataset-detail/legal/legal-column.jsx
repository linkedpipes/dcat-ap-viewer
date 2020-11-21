import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle, ListGroup} from "reactstrap";

import {t, register, ModalContext, NavigationContext} from "../../viewer-api";
import Authorship from "./authorship";
import DatabaseAuthorship from "./database-authorship";
import ProtectedDatabaseAuthorship from "./protected-database-authorship";
import PersonalData from "./personal-data";

import translations from "./legal-column.json";

function LegalColumn(props) {
  const {showModal} = useContext(ModalContext);
  const {language} = useContext(NavigationContext);
  return (
    <Card>
      <CardTitle tag="h6" className="text-muted pl-2 pt-2">
        {t("distributionLicense")}
      </CardTitle>
      <ListGroup flush={true}>
        <Authorship
          language={language}
          showModal={showModal}
          legal={props.distribution.legal}
          quality={props.quality}
        />
        <DatabaseAuthorship
          language={language}
          showModal={showModal}
          legal={props.distribution.legal}
          quality={props.quality}
        />
        <ProtectedDatabaseAuthorship
          language={language}
          showModal={showModal}
          legal={props.distribution.legal}
          quality={props.quality}
        />
        <PersonalData
          language={language}
          showModal={showModal}
          legal={props.distribution.legal}
        />
      </ListGroup>
    </Card>
  );
}

LegalColumn.propTypes = {
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

register({
  "name": "dataset-detail.parts.legal-column",
  "element": LegalColumn,
  "translations": translations,
});
