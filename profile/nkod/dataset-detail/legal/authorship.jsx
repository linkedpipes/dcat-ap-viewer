import React from "react";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";
import {PU_VALUES_MAPPING} from "../../../client-api";

export default function Authorship({t, tLiteral, legal, quality, openModal}) {
  const mapped = PU_VALUES_MAPPING[legal.authorship];
  switch (mapped) {
  case "multi":
    return (
      <li className="list-group-item  px-2">
        <div>
          {t("license.authorMulti")}
          <i
            className="material-icons text-warning float-right"
            title={t("license.author_multi_comment")}
            onClick={() => openModal(t("license.authorMultiComment"))}
          >
              list
          </i>
        </div>
        <div className="label">
          {t("license.authorType")}
        </div>
      </li>
    );
  case "no":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license.authorNo")}
          <i
            className="material-icons text-success float-right"
            title={t("license.authorNoComment")}
            onClick={() => openModal(t("license.authorNoComment"))}
          >
              check
          </i>
        </div>
        <div className="label">
          {t("license.authorType")}
        </div>
      </li>
    );
  case "ccBy":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license.authorCcBy")}
          <i
            className="material-icons text-warning float-right"
            title={t("license.authorCcByComment")}
            onClick={() => openModal(t("license.authorCcByComment"))}
          >
              turned_in
          </i>
        </div>
        <div className="label">
          {tLiteral(legal.author)}
        </div>
      </li>
    );
  case "missing":
    return missing(t, openModal);
  default:
    return custom(t, tLiteral, legal, quality, openModal);

  }
}

Authorship.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "legal": PropTypes.object.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};

function missing(t, openModal) {
  return (
    <li className="list-group-item px-2">
      <div>
        {t("license.missing")}
        <i
          className="material-icons text-danger float-right"
          title={t("license.missingComment")}
          onClick={() => openModal(t("license.missingComment"))}
        >
          warning
        </i>
      </div>
      <div className="label">
        {t("license.authorType")}
      </div>
    </li>
  );
}

function custom(t, tLiteral, legal, quality, openModal) {
  return (
    <li className="list-group-item px-2">
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
            title={t("license.authorCustomComment")}
            onClick={() => openModal(t("license.authorCustomComment"))}
          >
            help
          </i>
          <QualityOfCustomLicense
            t={t}
            tLiteral={tLiteral}
            quality={quality}
            openModal={openModal}
          />
        </div>
      </div>
      <div className="label">
        {t("license.authorType")}
      </div>
    </li>
  );
}

function QualityOfCustomLicense({t, tLiteral, quality, openModal}) {
  if (quality === undefined) {
    return null;
  }
  if (!quality.ready) {
    // TODO Add role property -> https://react-bootstrap.github.io/components/spinners/
    return (
      <span style={{"verticalAlign": "top", "marginRight": "0.3rem"}}>
        <Spinner size="sm" color="secondary"/>
      </span>
    );
  }
  if (quality.authorshipCustom) {
    // TODO Why?
    return null;
  }
  const strArgs = {
    "date": quality.authorshipCustomLastCheck,
    "note": tLiteral(quality.authorshipCustomNote),
  };
  return (
    <i
      className="material-icons text-danger float-right"
      title={t("license.authorCustomUnavailable", strArgs)}
      onClick={() => openModal(t("license.authorCustomUnavailable", strArgs))}
    >
      link_off
    </i>
  );
}

QualityOfCustomLicense.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};
