import React from "react";
import {PropTypes} from "prop-types";
import {Spinner} from "reactstrap";
import {PU_VALUES_MAPPING} from "../../../client-api";

export default function DatabaseAuthorship(
  {t, tLiteral, legal, quality, openModal}) {
  //
  const mapped = PU_VALUES_MAPPING[legal.databaseAuthorship];
  switch (mapped) {
  case "no":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("license.authorNo")}
          <i
            className="material-icons text-success float-right"
            title={t("license.dbNoComment")}
            onClick={() => openModal(t("license.dbNoComment"))}
          >
              check
          </i>
        </div>
        <div className="label">
          {t("license.dbType")}
        </div>
      </li>
    );
  case "ccBy":
    return (
      <li className="list-group-item px-2">
        <div>
          {t("licenseAuthorCcBy")}
          <i
            className="material-icons text-warning float-right"
            title={t("license.dbCcByComment")}
            onClick={() => openModal(t("license.dbCcByComment"))}
          >
              turned_in
          </i>
        </div>
        <div className="label">
          {tLiteral(legal.databaseAuthor)}
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
          {t("license.dbType")}
        </div>
      </li>
    );
  default:
    return custom(t, tLiteral, legal, quality, openModal);
  }
}

DatabaseAuthorship.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "legal": PropTypes.object.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};

function custom(t, tLiteral, legal, quality, openModal) {
  const strArgs = {
    "date": quality.databaseAuthorshipLastCheck,
    "note": quality.databaseAuthorshipNote,
  };
  return (
    <li className="list-group-item px-2">
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
            title={t("license.dbCustomComment")}
            onClick={() => openModal(t("license.dbCustomComment", strArgs))}
          >
            help
          </i>
          <QualityOfCustomDatabaseAuthorship
            t={t}
            tLiteral={tLiteral}
            quality={quality}
            openModal={openModal}
          />
        </div>
      </div>
      <div className="label">
        {t("license.dbType")}
      </div>
    </li>
  );
}

function QualityOfCustomDatabaseAuthorship({t, tLiteral, quality, openModal}) {
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
  if (quality.databaseAuthorship) {
    // TODO Why?
    return null;
  }
  const strArgs = {
    "date": quality.databaseAuthorshipLastCheck,
    "note": tLiteral(quality.databaseAuthorshipNote),
  };
  return (
    <i
      className="material-icons text-danger"
      title={t("license.dbCustomUnavailable", strArgs)}
      onClick={() => openModal(t("license.dbCustomUnavailable", strArgs))}
    >
      link_off
    </i>
  );
}

QualityOfCustomDatabaseAuthorship.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};
