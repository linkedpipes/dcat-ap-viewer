import React, {useContext} from "react";
import {PropTypes} from "prop-types";

import {
  register, ModalContext, NavigationContext, getElement,
} from "../../viewer-api";

function LegalColumn(props) {
  const {showModal} = useContext(ModalContext);
  const {language} = useContext(NavigationContext);
  if (isLegalEmpty(props.distribution.legal)) {
    const license = props.distribution.license;
    if (license === undefined) {
      const MissingLegalColumn =
        getElement("dataset-detail.parts.legal-column-missing").element;
      return (
        <MissingLegalColumn language={language}/>
      );
    }
    // Use as a fallback if there is no legal information.
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

function isLegalEmpty(legal) {
  return legal.author === undefined
    && legal.authorship === "missing"
    && legal.databaseAuthor === undefined
    && legal.databaseAuthorship === "missing"
    && legal.personalData === "missing"
    && legal.protectedDatabase === "missing";
}
