import React from "react";
import {PropTypes} from "prop-types";

import {
  t, LEGAL, translateString, selectLiteral, QUALITY,
} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function DatabaseAuthorship(props) {
  return (
    <li className="list-group-item px-2">
      {render(props)}
    </li>
  );
}

DatabaseAuthorship.propTypes = {
  "language": PropTypes.string.isRequired,
  "legal": PropTypes.object.isRequired,
  "showModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};

function render({language, showModal, legal, quality}) {
  switch (LEGAL[legal.databaseAuthorship]) {
  case "no":
    return renderNo(language, showModal);
  case "ccBy":
    return renderCcBy(language, showModal, legal);
  case "missing":
    return renderMissing(language, showModal);
  default:
    return renderCustom(language, showModal, legal, quality);
  }
}

function renderNo(language, showModal) {
  const message = translateString(language, "license.dbNoComment");
  return (
    <React.Fragment>
      <div>
        {t("license.authorNo")}
        <i
          className="material-icons text-success float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          check
        </i>
      </div>
      <div className="label">
        {t("license.dbType")}
      </div>
    </React.Fragment>
  );
}

function renderCcBy(language, showModal, legal) {
  const message = translateString(language, "license.dbCcByComment");
  return (
    <React.Fragment>
      <div>
        {t("license.authorCcBy")}
        <i
          className="material-icons text-warning float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          turned_in
        </i>
      </div>
      <div className="label">
        {selectLiteral(language, legal.databaseAuthor)}
      </div>
    </React.Fragment>
  );
}

function renderMissing(language, showModal) {
  const message = translateString(language, "license.missingComment");
  return (
    <React.Fragment>
      <div>
        {t("license.missing")}
        <i
          className="material-icons text-danger float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          warning
        </i>
      </div>
      <div className="label">
        {t("license.dbType")}
      </div>
    </React.Fragment>
  );
}

function renderCustom(language, showModal, legal, quality) {
  const message = translateString(language, "license.dbCustomComment");
  return (
    <React.Fragment>
      <div>
        <a
          href={legal.databaseAuthorship}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {t("license.dbCustom")}
        </a>
        <div className="float-right">
          <i
            className="material-icons text-warning"
            title={message}
            onClick={() => showModal(message)}
          >
            help
          </i>
          <QualityOfCustomDatabaseAuthorship quality={quality}/>
        </div>
      </div>
      <div className="label">
        {t("license.dbType")}
      </div>
    </React.Fragment>
  );
}

function QualityOfCustomDatabaseAuthorship(props) {
  const definitions = [{
    "measureOf": QUALITY.databaseAuthorship,
    "labelTrue": "license.dbCustomAvailable",
    "labelFalse": "license.dbCustomUnavailable",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.databaseAuthorshipCors,
    "labelTrue": "legalCorsTrue",
    "labelFalse": "legalCorsFalse",
    "iconTrue": "http",
    "iconFalse": "http",
  }];
  return (
    <QualityIconsForMeasures
      quality={props.quality}
      measureDefinitions={definitions}
    />
  );
}

QualityOfCustomDatabaseAuthorship.propTypes = {
  "quality": PropTypes.object,
};
