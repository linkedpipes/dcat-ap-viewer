import React from "react";
import {PropTypes} from "prop-types";

import {
  t, LEGAL, translateString, selectLiteral, QUALITY,
} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function Authorship(props) {
  return (
    <li className="list-group-item px-2">
      {render(props)}
    </li>
  );
}

Authorship.propTypes = {
  "language": PropTypes.string.isRequired,
  "legal": PropTypes.object.isRequired,
  "showModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};

function render({language, showModal, legal, quality}) {
  switch (LEGAL[legal.authorship]) {
    case "multi":
      return renderMulti(language, showModal);
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

function renderMulti(language, showModal) {
  const message = translateString(language, "license.author_multi_comment");
  return (
    <React.Fragment>
      <div>
        {t("license.authorMulti")}
        <i
          className="material-icons text-warning float-right"
          title={message}
          onClick={() => showModal(message)}
        >
          list
        </i>
      </div>
      <div className="label">
        {t("license.authorType")}
      </div>
    </React.Fragment>
  );
}

function renderNo(language, showModal) {
  const message = translateString(language, "license.authorNoComment");
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
        {t("license.authorType")}
      </div>
    </React.Fragment>
  );
}

function renderCcBy(language, showModal, legal) {
  const message = translateString(language, "license.authorCcByComment");
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
        {selectLiteral(language, legal.author)}
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
        {t("license.authorType")}
      </div>
    </React.Fragment>
  );
}

function renderCustom(language, showModal, legal, quality) {
  const message = translateString(language, "license.authorCustomComment");
  return (
    <React.Fragment>
      <div>
        <a
          href={legal.authorship}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {t("license.authorCustom")}
        </a>
        <div className="float-right">
          <i
            className="material-icons text-warning"
            title={message}
            onClick={() => showModal(message)}
          >
            help
          </i>
          <QualityOfCustomLicense quality={quality}/>
        </div>
      </div>
      <div className="label">
        {t("license.authorType")}
      </div>
    </React.Fragment>
  );
}

function QualityOfCustomLicense(props) {
  const definitions = [{
    "measureOf": QUALITY.authorship,
    "labelTrue": "license.authorCustomAvailable",
    "labelFalse": "license.authorCustomUnavailable",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.authorshipCors,
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

QualityOfCustomLicense.propTypes = {
  "quality": PropTypes.object,
};
