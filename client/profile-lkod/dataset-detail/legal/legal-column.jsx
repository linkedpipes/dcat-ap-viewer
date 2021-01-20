import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {Card, CardTitle, ListGroup} from "reactstrap";

import {t, register, ModalContext, NavigationContext} from "../../viewer-api";
import Authorship from "./authorship";
import DatabaseAuthorship from "./database-authorship";
import ProtectedDatabaseAuthorship from "./protected-database-authorship";
import PersonalData from "./personal-data";
import DcatApLegalColumn from "./legal-column-dcatap";
import MissingLegalColumn from "./legal-column-missing";

import translations from "./legal-column.json";

function LegalColumn(props) {
  const {showModal} = useContext(ModalContext);
  const {language} = useContext(NavigationContext);
  if (isLegalEmpty(props.distribution.legal)) {
    const license = props.distribution.license;
    if (license === undefined) {
      return (
        <MissingLegalColumn language={language}/>
      );
    }
    // Use as a fallback if there is no legal information.
    return (
      <DcatApLegalColumn license={license} language={language}/>
    )
  }
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

function isLegalEmpty(legal) {
  return legal.author === undefined
    && legal.authorship === undefined
    && legal.databaseAuthor === undefined
    && legal.databaseAuthorship === undefined
    && legal.personalData === undefined
    && legal.protectedDatabase === undefined;
}