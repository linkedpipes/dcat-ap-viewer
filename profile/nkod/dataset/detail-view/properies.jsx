import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import React from "react";
import {Spinner} from "reactstrap";
import {
  URL_DATASET_LIST,
  QUERY_DATASET_LIST_THEME,
} from "../../../client-api";

export default function Properties(
  {t, tLabel, tUrl, dataset, quality, openModal}) {
  //
  return (
    <div className="row">
      {firstColumn(t, tLabel, tUrl, dataset)}
      {secondColumn(t, tLabel, tUrl, dataset)}
      {thirdColumn(t, tLabel, dataset, quality, openModal)}
      {fourthColumn(t, tLabel, dataset)}
    </div>
  );
}

Properties.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
  "quality": PropTypes.object,
  "openModal": PropTypes.func.isRequired,
};

function firstColumn(t, tLabel, tUrl, dataset) {
  const hasThemes = isNotEmpty(dataset.themes);
  const hasDataThemes = isNotEmpty(dataset.datasetThemes);
  if (!hasThemes && !hasDataThemes) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      {hasDataThemes &&
      <dl>
        <dt>{t("dataset_topic")}</dt>
        {
          dataset.datasetThemes.map(iri =>
            searchableLabeledLinkEntitiesAsDd(
              tLabel, tUrl, iri, QUERY_DATASET_LIST_THEME))
        }
      </dl>
      }
      {hasThemes &&
      <dl>
        <dt>{t("topic")}</dt>
        {
          dataset.themes.map(iri =>
            searchableLabeledLinkEntitiesAsDd(
              tLabel, tUrl, iri, QUERY_DATASET_LIST_THEME))
        }
      </dl>
      }
    </div>
  )

}

function isNotEmpty(value) {
  return value !== undefined && value.length !== 0;
}

function searchableLabeledLinkEntitiesAsDd(tLabel, tUrl, iri, queryName) {
  return (
    <dd key={iri}>
      <Link to={tUrl(URL_DATASET_LIST, {[queryName]: iri})}>
        {tLabel(iri)}
      </Link>
      <a href={iri} rel="nofollow noopener noreferrer" target="_blank">
        {linkIcon()}
      </a>
      <br/>
    </dd>
  )
}

function linkIcon() {
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <i className="material-icons" style={iconStyle}>
      open_in_new
    </i>
  );
}

function secondColumn(t, tLabel, tUrl, dataset) {
  const spatial = spatialCoverage(t, tLabel, dataset);
  const spatialResolution = spatialCoverageResolution(t, dataset);
  const temporal = temporalCoverage(t, dataset);
  const temporalResolution = temporalCoverageResolution(t, dataset);
  if (spatial === null && spatialResolution == null
    && temporal === null && temporalResolution == null) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        {spatial}
        {spatialResolution}
        {temporal}
        {temporalResolution}
      </dl>
    </div>
  )
}

function spatialCoverage(t, tLabel, dataset) {
  if (!isNotEmpty(dataset.spatial)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{t("spatial")}</dt>
      {dataset.spatial.map(iri => labeledLinkEntitiesAsDd(tLabel, iri))}
    </React.Fragment>
  )
}

function labeledLinkEntitiesAsDd(tLabel, iri) {
  return (
    <dd key={iri}>
      {tLabel(iri)}
      <a href={iri} rel="nofollow noopener noreferrer" target="_blank">
        {linkIcon()}
      </a>
      <br/>
    </dd>
  );
}

function spatialCoverageResolution(t, dataset) {
  if (!isNotEmpty(dataset.spatialResolutionInMeters)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{t("spatial_resolution")}</dt>
      {dataset.spatialResolutionInMeters} m
    </React.Fragment>
  )
}

function temporalCoverage(t, dataset) {
  if (!isNotEmpty(dataset.temporal)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{t("temporal")}</dt>
      <dd>{temporalAsString(dataset.temporal)}</dd>
    </React.Fragment>
  )
}

function temporalAsString(temporal) {
  let result;
  if (temporal.startDate === undefined) {
    if (temporal.endDate === undefined) {
      result = temporal.iri;
    } else {
      result = " - " + updateDate(temporal.endDate);
    }
  } else {
    if (temporal.endDate === undefined) {
      result = updateDate(temporal.startDate) + " - ";
    } else {
      result = updateDate(temporal.startDate) + " - " +
        updateDate(temporal.endDate);
    }
  }
  return result;
}

// TODO Add better date handling, the format is YYYY-MM-DD+02:00 or YYYY-MM-DD
function updateDate(value) {
  const plusIndex = value.indexOf("+");
  if (plusIndex === -1) {
    return value;
  } else {
    return value.substr(0, value.indexOf("+"));
  }
}

function temporalCoverageResolution(t, dataset) {
  if (!isNotEmpty(dataset.temporalResolution)) {
    return false;
  }
  return (
    <React.Fragment>
      <dt>{t("temporal_resolution")}</dt>
      <dd>{xsdDurationToString(t, dataset.temporalResolution)}</dd>
    </React.Fragment>
  )
}

function xsdDurationToString(t, durationAsStr) {
  const duration = parseXsdDuration(durationAsStr);
  let result = "";
  if (duration.negative) {
    result = "- ";
  }
  result +=
    appendValue(duration.year, t, "year")
    + appendValue(duration.month, t, "month")
    + appendValue(duration.day, t, "day")
    + appendValue(duration.hour, t, "hour")
    + appendValue(duration.minute, t, "minute")
    + appendValue(duration.second, t, "second");
  return result;
}

function parseXsdDuration(value) {
  // https://www.w3schools.com/xml/schema_dtypes_date.asp
  let parsedValues = {
    "year": null,
    "month": null,
    "day": null,
    "hour": null,
    "minute": null,
    "second": null,
    "negative": value.startsWith("-"),
  };
  // Upper case and remove starting 'P'.
  value = value.toLocaleUpperCase();
  let readingTime = false;
  let buffer = "";
  for (let index = value.indexOf("P") + 1; index < value.length; ++index) {
    const char = value[index];
    if (char === "T") {
      readingTime = true;
    } else if (char === "Y") {
      parsedValues["year"] = buffer;
      buffer = "";
    } else if (char === "M") {
      if (readingTime) {
        parsedValues["minute"] = buffer;
      } else {
        parsedValues["month"] = buffer;
      }
      buffer = "";
    } else if (char === "D") {
      parsedValues["day"] = buffer;
      buffer = "";
    } else if (char === "H") {
      parsedValues["hour"] = buffer;
      buffer = "";
    } else if (char === "S") {
      parsedValues["second"] = buffer;
      buffer = "";
    } else {
      buffer += char;
    }
  }
  return parsedValues;
}

function appendValue(value, t, labelName) {
  if (value === null) {
    return "";
  } else if (value === 1) {
    return "1 " + t(labelName) + " ";
  } else if (Math.abs(value) < 5) {
    return value + " " + t(labelName + "s-2") + " ";
  } else if (Math.abs(value) >= 5) {
    return value + " " + t(labelName + "s-5") + " ";
  } else {
    return "";
  }
}

function thirdColumn(t, tLabel, dataset, quality, openModal) {
  const hasDocumentation = isNotEmpty(dataset.documentation);
  const hasContacts = isNotEmpty(dataset.contactPoints);
  if (!hasDocumentation && !hasContacts) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        {hasDocumentation && documentationLabel(t, dataset, quality, openModal)}
        {hasDocumentation && documentation(t, dataset)}
        {hasContacts && <dt>{t("contact_point")}</dt>}
        {hasContacts && contactPoints(tLabel, dataset.contactPoints)}
      </dl>
    </div>
  )
}

function documentationLabel(t, dataset, quality, openModal) {
  // TODO Move to another profile, as here it is not never used.
  if (!quality) {
    return (
      <dt>
        {t("documentation")}
      </dt>
    )
  } else if (!quality.ready) {
    return (
      <dt>
        {t("documentation")}
        <Spinner size="sm" color="secondary" className="float-right"/>
      </dt>
    )
  } else if (quality.documentation === undefined) {
    return (
      <dt>
        {t("documentation")}
      </dt>
    )
  } else if (quality.documentation) {
    const args = {
      "date": quality.documentationLastCheck,
    };
    return (
      <dt>
        {t("documentation")}
        <i
          className="material-icons text-success float-right"
          title={t("documentation_available", args)}
          onClick={() => openModal(t("documentation_available", args))}
        >
          verified_user
        </i>
      </dt>
    )
  } else {
    const args = {
      "date": quality.documentationLastCheck,
    };
    return (
      <dt>
        {t("documentation")}
        <i
          className="material-icons text-danger float-right"
          title={t("documentation_unavailable", args)}
          onClick={() => openModal(t("documentation_unavailable", args))}
        >
          link_off
        </i>
      </dt>
    )
  }
}

function documentation(t, dataset) {
  return dataset.documentation.map((iri) => (
    <dd key={iri}>
      <a href={iri} rel="nofollow noopener noreferrer">
        {t("documentation_download")}
      </a>
      <br/>
    </dd>
  ));
}

function contactPoints(labels, contactPoints) {
  if (contactPoints === undefined) {
    return null;
  }
  return contactPoints.map((contact) => (
    <dd key={contact.iri}>
      {contactPoint(labels, contact)}
      <br/>
    </dd>
  ));
}

function contactPoint(tLabel, contactPoint) {
  let label = tLabel(contactPoint.iri, null);
  let email = isNotEmpty(contactPoint.email) ? contactPoint.email : null;
  if (label === null) {
    label = email;
    if (label == null) {
      label = "";
    }
  }
  let iri = contactPoint.email ?
    "mailto:" + contactPoint.email : contactPoint.iri;
  return (
    <a href={iri} rel="nofollow noopener noreferrer">{label}</a>
  )
}

function fourthColumn(t, tLabel, dataset) {
  const hasFrequency = isNotEmpty(dataset.frequency);
  if (!hasFrequency) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        <dt>{t("frequency")}</dt>
        {labeledLinkEntitiesAsDd(tLabel, dataset.frequency)}
      </dl>
    </div>
  )
}
