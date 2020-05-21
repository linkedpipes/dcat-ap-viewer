import React from "react";
import {PU_VALUES_MAPPING} from "../../../../client-api";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";

export default function ProtectedDatabaseAuthorship(
  {t, tLiteral, legal, quality, openModal}) {
  const mapped = PU_VALUES_MAPPING[legal.protectedDatabase];
  switch (mapped) {
  case "no":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license_specialdb_no")}
          <i
            className="material-icons text-success float-right"
            title={t("license_specialdb_no_comment")}
            onClick={() => openModal(t("license_specialdb_no_comment"))}
          >
              check
          </i>
        </div>
        <div className="label">
          {t("license_specialdb_type")}
        </div>
      </li>
    );
  case "cc0":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license_specialdb_cc0")}
          <i
            className="material-icons text-success float-right"
            title={t("license_specialdb_cc0_comment")}
            onClick={() => openModal(t("license_specialdb_cc0_comment"))}
          >
              check
          </i>
        </div>
        <div className="label">
          {t("license_specialdb_type")}
        </div>
      </li>
    );
  case "missing":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license_missing")}
          <i
            className="material-icons text-danger float-right"
            title={t("license_missing_comment")}
            onClick={() => openModal(t("license_missing_comment"))}
          >
              warning
          </i>
        </div>
        <div className="label">
          {t("license_specialdb_type")}
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
          {t("license_specialdb_custom")}
        </a>
        <div className="float-right">
          <i
            className="material-icons text-warning"
            title={t("license_specialdb_custom_comment")}
            onClick={() => openModal(t("license_specialdb_custom_comment"))}
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
        {t("license_specialdb_type")}
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
    t("license_specialdb_custom_unavailable", strArgs));
  return (
    <i
      className="material-icons text-danger"
      title={t("license_specialdb_custom_unavailable", strArgs)}
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
