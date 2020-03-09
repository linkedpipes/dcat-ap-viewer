import React from "react";
import {PU_VALUES_MAPPING} from "../../../../client-api";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";

export default function Authorship({t, tLiteral, legal, quality, openModal}) {
  const mapped = PU_VALUES_MAPPING[legal.authorship];
  switch (mapped) {
    case "multi":
      return (
        <li className="list-group-item  px-2">
          <div>
            {t("license_author_multi")}
            <i
              className="material-icons text-warning float-right"
              title={t("license_author_multi_comment")}
              onClick={() => openModal(t("license_author_multi_comment"))}
            >
              list
            </i>
          </div>
          <div className="label">
            {t("license_author_type")}
          </div>
        </li>
      );
    case "no":
      return (
        <li className="list-group-item px-2">
          <div>
            {t("license_author_no")}
            <i
              className="material-icons text-success float-right"
              title={t("license_author_no_comment")}
              onClick={() => openModal(t("license_author_no_comment"))}
            >
              check
            </i>
          </div>
          <div className="label">
            {t("license_author_type")}
          </div>
        </li>
      );
    case "ccBy":
      return (
        <li className="list-group-item px-2">
          <div>
            {t("license_author_ccBy")}
            <i
              className="material-icons text-warning float-right"
              title={t("license_author_ccBy_comment")}
              onClick={() => openModal(t("license_author_ccBy_comment"))}
            >
              turned_in
            </i>
          </div>
          <div className="label">
            {t(legal.author)}
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
        {t("license_author_type")}
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
          {t("license_author_custom")}
        </a>
        <div className="float-right">
          <QualityOfCustomLicense
            t={t}
            tLiteral={tLiteral}
            quality={quality}
            openModal={openModal}
          />
          <i
            className="material-icons text-warning"
            title={t("license_author_custom_comment")}
            onClick={() => openModal(t("license_author_custom_comment"))}
          >
            help
          </i>
        </div>
      </div>
      <div className="label">
        {t("license_author_type")}
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
    )
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
      title={t("license_author_custom_unavailable", strArgs)}
      onClick={() => openModal(t("license_author_custom_unavailable", strArgs))}
    >
      link_off
    </i>
  )
}

QualityOfCustomLicense.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};
