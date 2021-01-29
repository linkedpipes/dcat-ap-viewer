import React, {useContext} from "react";
import {PropTypes} from "prop-types";

import {
  register, ModalContext, NavigationContext, getElement,
} from "../../viewer-api";

function LegalColumn(props) {
  const {showModal} = useContext(ModalContext);
  const {language} = useContext(NavigationContext);
  if (shouldRenderDcatApLegal(props.distribution.legal)) {
    const license = props.distribution.license;
    // Use as a fallback if there is no Czech legal information, but there
    // is DCAT-AP compatible.
    const DcatApLegalColumn =
      getElement("dataset-detail.parts.legal-column-dcat-ap").element;
    return (
      <DcatApLegalColumn license={license} language={language}/>
    );
  }
  const CzechLegalColumn =
    getElement("dataset-detail.parts.legal-column-czech").element;
  return (
    <CzechLegalColumn
      distribution={props.distribution}
      quality={props.quality}
      showModal={showModal}
      language={language}
    />
  );
}

LegalColumn.propTypes = {
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

register({
  "name": "dataset-detail.parts.legal-column",
  "element": LegalColumn,
});

function shouldRenderDcatApLegal(distribution) {
  return distribution.license !== undefined
    && distribution.legal.author === undefined
    && distribution.legal.authorship === "missing"
    && distribution.legal.databaseAuthor === undefined
    && distribution.legal.databaseAuthorship === "missing"
    && distribution.legal.personalData === "missing"
    && distribution.legal.protectedDatabase === "missing";
}
