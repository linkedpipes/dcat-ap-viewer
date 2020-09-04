import React from "react";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";
import {PU_VALUES_MAPPING} from "../../../client-api";

export default function ProtectedDatabaseAuthorship(
  {t, tLiteral, legal, quality, openModal}) {
  const mapped = PU_VALUES_MAPPING[legal.protectedDatabase];
  switch (mapped) {
  case "no":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license.specialdbNo")}
          <i
            className="material-icons text-success float-right"
            title={t("license.specialdbNoComment")}
            onClick={() => openModal(t("license.specialdbNoComment"))}
          >
              check
          </i>
        </div>
        <div className="label">
          {t("license.specialdbType")}
        </div>
      </li>
    );
  case "cc0":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license.specialdbCc0")}
          <i
            className="material-icons text-success float-right"
            title={t("license.specialdbCc0Comment")}
            onClick={() => openModal(t("license.specialdbCc0Comment"))}
          >
              check
          </i>
        </div>
        <div className="label">
          {t("license.specialdbType")}
        </div>
      </li>
    );
  case "missing":
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
          {t("license.specialdbType")}
        </div>
      </li>
    );
  default:
    return custom(t, tLiteral, legal, quality, openModal);
  }
}

ProtectedDatabaseAuthorship.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "legal": PropTypes.object.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};

function custom(t, tLiteral, legal, quality, openModal) {
  return (
    <li className="list-group-item px-2">
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
            title={t("license.specialdbCustomComment")}
            onClick={() => openModal(t("license.specialdbCustomComment"))}
          >
            help
          </i>
          <QualityProtectedDatabaseAuthorship
            t={t}
            tLiteral={tLiteral}
            quality={quality}
            openModal={openModal}
          />
        </div>
      </div>
      <div className="label">
        {t("license.specialdbType")}
      </div>
    </li>
  );
}

function QualityProtectedDatabaseAuthorship({t, tLiteral, quality, openModal}) {
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
  if (quality.protectedDatabaseAuthorship) {
    // TODO Why?
    return null;
  }
  const strArgs = {
    "date": quality.protectedDatabaseAuthorshipLastCheck,
    "note": tLiteral(quality.protectedDatabaseAuthorshipNote),
  };
  const opeModal = () => openModal(
    t("license.specialdbCustomUnavailable", strArgs));
  return (
    <i
      className="material-icons text-danger"
      title={t("license.specialdbCustomUnavailable", strArgs)}
      onClick={opeModal}
    >
      link_off
    </i>
  );
}

QualityProtectedDatabaseAuthorship.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};
