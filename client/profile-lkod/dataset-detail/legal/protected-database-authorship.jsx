import React from "react";
import {PropTypes} from "prop-types";

import {t, LEGAL, translateString, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function ProtectedDatabaseAuthorship(props) {
  return (
    <li className="list-group-item px-2">
      {render(props)}
    </li>
  );
}

ProtectedDatabaseAuthorship.propTypes = {
  "language": PropTypes.string.isRequired,
  "legal": PropTypes.object.isRequired,
  "showModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};

function render({language, showModal, legal, quality}) {
  switch (LEGAL[legal.protectedDatabase]) {
  case "no":
    return renderNo(language, showModal);
  case "cc0":
    return renderCc0(language, showModal, legal);
  case "missing":
    return renderMissing(language, showModal);
  default:
    return renderCustom(language, showModal, legal, quality);
  }
}

function renderNo(language, showModal) {
  const message = translateString(language, "license.specialdbNo");
  return (
    <React.Fragment>
      <div>
        {t("license.specialdbNo")}
        <i
          className="material-icons text-success float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          check
        </i>
      </div>
      <div className="label">
        {t("license.specialdbType")}
      </div>
    </React.Fragment>
  );
}

function renderCc0(language, showModal) {
  const message = translateString(language, "license.specialdbCc0Comment");
  return (
    <React.Fragment>
      <div>
        {t("license.specialdbCc0")}
        <i
          className="material-icons text-success float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          check
        </i>
      </div>
      <div className="label">
        {t("license.specialdbType")}
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
          className="material-icons text-success float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          check
        </i>
      </div>
      <div className="label">
        {t("license.specialdbType")}
      </div>
    </React.Fragment>
  );
}


function renderCustom(language, showModal, legal, quality) {
  const message = translateString(language, "license.specialdbCustomComment");
  return (
    <React.Fragment>
      <div>
        <a
          href={legal.protectedDatabase}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {t("license.specialdbCustom")}
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
        {t("license.specialdbType")}
      </div>
    </React.Fragment>
  );
}

function QualityOfCustomDatabaseAuthorship(props) {
  const definitions = [{
    "measureOf": QUALITY.specialDatabaseAuthorship,
    "labelTrue": "license.specialdbCustomAvailable",
    "labelFalse": "license.specialdbCustomUnavailable",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.specialDatabaseAuthorshipCors,
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
