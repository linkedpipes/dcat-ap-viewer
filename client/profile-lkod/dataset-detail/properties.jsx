import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";

import {
  t, useLabelApi, useQualityApi, createUrl,
  QUALITY, translateString, configuration,
} from "../viewer-api";
import {QualityIconsForMeasures} from "./quality-icons";

function Properties(props) {
  const selectLabel = useLabelApi();
  const quality = useQualityApi(props.dataset.iri);
  return (
    <div className="row">
      {firstColumn(selectLabel, props.language, props.dataset)}
      {secondColumn(selectLabel, props.language, props.dataset)}
      {thirdColumn(selectLabel, props.language, props.dataset, quality)}
      {fourthColumn(selectLabel, props.language, props.dataset)}
    </div>
  );
}

Properties.propTypes = {
  "language": PropTypes.string.isRequired,
  "dataset": PropTypes.object.isRequired,
};

export default Properties;

function firstColumn(selectLabel, language, dataset) {
  const hasThemes = isNotEmpty(dataset.themes);
  const hasDataThemes = isNotEmpty(dataset.datasetThemes);
  if (!hasThemes && !hasDataThemes) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      {hasDataThemes &&
      <dl>
        <dt>{t("datasetTopic")}</dt>
        {
          dataset.datasetThemes.map(iri =>
            ddLabelLink(
              selectLabel, language, iri,
              datasetSearchUrl(language, {"themes": iri}),
            ),
          )
        }
      </dl>
      }
      {hasThemes &&
      <dl>
        <dt>{t("topic")}</dt>
        {
          dataset.themes.map(iri =>
            ddLabelLink(
              selectLabel, language, iri,
              datasetSearchUrl(language, {"themes": iri}),
            ),
          )
        }
      </dl>
      }
    </div>
  );

}

function isNotEmpty(value) {
  return value !== undefined && value.length !== 0;
}

function ddLabelLink(selectLabel, language, iri, url, iconUrl) {
  iconUrl = iconUrl ?? iri;
  return (
    <dd key={iri}>
      <Link to={url}>
        {selectLabel(iri)}
      </Link>
      <a
        href={iconUrl}
        title={translateString(language, "followLink")}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {linkIcon()}
      </a>
      <br/>
    </dd>
  );
}

function datasetSearchUrl(language, args) {
  return createUrl(language, "/datasets", args);
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

function secondColumn(selectLabel, language, dataset) {
  const semantic = semanticThemes(selectLabel, language, dataset);
  const spatial = spatialCoverage(selectLabel, language, dataset);
  const spatialResolution = spatialCoverageResolution(dataset);
  const temporal = temporalCoverage(dataset);
  const temporalResolution = temporalCoverageResolution(language, dataset);
  if (spatial === null && spatialResolution == null
    && temporal === null && temporalResolution == null) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        {semantic}
        {spatial}
        {spatialResolution}
        {temporal}
        {temporalResolution}
      </dl>
    </div>
  );
}

function semanticThemes(selectLabel, language, dataset) {
  if (!isNotEmpty(dataset.semanticThemes)) {
    return null;
  }
  return (
    <dl>
      <dt>{t("semanticTopic")}</dt>
      {
        dataset.semanticThemes.map(iri =>
          ddLabelLink(
            selectLabel, language, iri,
            datasetSearchUrl(language, {"themes": iri}),
            semanticBrowser(iri)
          ),
        )
      }
    </dl>
  );
}

function semanticBrowser(iri) {
  return configuration.semanticBrowser + encodeURIComponent(iri);
}

function spatialCoverage(selectLabel, language, dataset) {
  if (!isNotEmpty(dataset.spatial)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{t("spatial")}</dt>
      {dataset.spatial.map(iri => ddLabel(selectLabel, language, iri))}
    </React.Fragment>
  );
}

function ddLabel(selectLabel, language, iri) {
  return (
    <dd key={iri}>
      {selectLabel(iri)}
      <a
        href={iri}
        title={translateString(language, "followLink")}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {linkIcon()}
      </a>
      <br/>
    </dd>
  );
}

function spatialCoverageResolution(dataset) {
  if (!isNotEmpty(dataset.spatialResolutionInMeters)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{t("spatialResolution")}</dt>
      {dataset.spatialResolutionInMeters} m
    </React.Fragment>
  );
}

function temporalCoverage(dataset) {
  if (!isNotEmpty(dataset.temporal)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{t("temporal")}</dt>
      <dd>{temporalAsString(dataset.temporal)}</dd>
    </React.Fragment>
  );
}

function temporalAsString(temporal) {
  let result;
  if (temporal.startDate === undefined) {
    if (temporal.endDate === undefined) {
      result = temporal.iri;
    } else {
      result = " - " + removeTimeZone(temporal.endDate);
    }
  } else {
    if (temporal.endDate === undefined) {
      result = removeTimeZone(temporal.startDate) + " - ";
    } else {
      result = removeTimeZone(temporal.startDate) + " - " +
        removeTimeZone(temporal.endDate);
    }
  }
  return result;
}

/**
 * Simple way how to parse date in format YYYY-MM-DD+02:00 or YYYY-MM-DD.
 */
function removeTimeZone(dateAsStr) {
  const plusIndex = dateAsStr.indexOf("+");
  if (plusIndex === -1) {
    return dateAsStr;
  } else {
    return dateAsStr.substr(0, dateAsStr.indexOf("+"));
  }
}

function temporalCoverageResolution(language, dataset) {
  if (!isNotEmpty(dataset.temporalResolution)) {
    return false;
  }
  return (
    <React.Fragment>
      <dt>{t("temporalResolution")}</dt>
      <dd>{xsdDurationToString(language, dataset.temporalResolution)}</dd>
    </React.Fragment>
  );
}

function xsdDurationToString(language, durationAsStr) {
  const duration = parseXsdDuration(durationAsStr);
  let result = "";
  if (duration.negative) {
    result = "- ";
  }
  result +=
    appendValue(language, "year", duration.year)
    + appendValue(language, "month", duration.month)
    + appendValue(language, "day", duration.day)
    + appendValue(language, "hour", duration.hour)
    + appendValue(language, "minute", duration.minute)
    + appendValue(language, "second", duration.second);
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

function appendValue(language, labelName, value) {
  if (value === null) {
    return "";
  }
  return value + " " + translateString(language, labelName, {"count": value});
}

function thirdColumn(selectLabel, language, dataset, quality) {
  const hasDocumentation = isNotEmpty(dataset.documentation);
  const hasContacts = isNotEmpty(dataset.contactPoints);
  const hasSpecification = isNotEmpty(dataset.conformsTo);
  if (!hasDocumentation && !hasContacts && !hasSpecification) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        {hasDocumentation && documentationLabel()}
        {hasDocumentation && documentation(quality, dataset)}
        {hasContacts && <dt>{t("contactPoint")}</dt>}
        {hasContacts && contactPoints(selectLabel, dataset.contactPoints)}
        {hasSpecification && specificationLabel()}
        {hasSpecification && specification(
          selectLabel, language, quality, dataset)}
      </dl>
    </div>
  );
}

function documentationLabel() {
  return (
    <dt>
      {t("documentation")}
    </dt>
  );
}

function documentation(quality, dataset) {
  const definitions = [{
    "measureOf": QUALITY.documentation,
    "labelTrue": "documentationQualityTrue",
    "labelFalse": "documentationQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.documentationCors,
    "labelTrue": "documentationQualityCorsTrue",
    "labelFalse": "documentationQualityCorsFalse",
    "iconTrue": "http",
    "iconFalse": "http",
  }];
  return dataset.documentation.map((iri) => (
    <dd key={iri}>
      <a href={iri} rel="nofollow noopener noreferrer">
        {t("documentationDownload")}
      </a>
      <QualityIconsForMeasures
        object={iri}
        quality={quality}
        measureDefinitions={definitions}
      />
    </dd>
  ));
}

function contactPoints(selectLabel, contactPoints) {
  return contactPoints.map((contact) => (
    <dd key={contact.iri}>
      {contactPoint(selectLabel, contact)}
      <br/>
    </dd>
  ));
}

function contactPoint(selectLabel, contactPoint) {
  let label = selectLabel(contactPoint.iri, null);
  let email = isNotEmpty(contactPoint.email) ? contactPoint.email : null;
  if (label === null) {
    label = email;
  }
  let iri = "mailto:" + contactPoint.email;
  return contactPoint.email ? (
    <a href={iri} rel="nofollow noopener noreferrer">{label}</a>
  ) : (
    label
  );
}

function specificationLabel() {
  return (
    <dt>
      {t("specification")}
    </dt>
  );
}

function specification(selectLabel, language, quality, dataset) {
  const definitions = [{
    "measureOf": QUALITY.specification,
    "labelTrue": "specificationQualityTrue",
    "labelFalse": "specificationQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.specificationCors,
    "labelTrue": "specificationQualityCorsTrue",
    "labelFalse": "specificationQualityCorsFalse",
    "iconTrue": "http",
    "iconFalse": "http",
  }];
  return dataset.conformsTo.map((iri) => (
    <dd key={iri}>
      <a href={iri} rel="nofollow noopener noreferrer">
        {selectLabel(iri, translateString(language, "specificationOpen"))}
      </a>
      <QualityIconsForMeasures
        object={iri}
        quality={quality}
        measureDefinitions={definitions}
      />
    </dd>
  ));
}

function fourthColumn(selectLabel, language, dataset) {
  const hasFrequency = isNotEmpty(dataset.frequency);
  if (!hasFrequency) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        <dt>{t("frequency")}</dt>
        {ddLabel(selectLabel, language, dataset.frequency)}
      </dl>
    </div>
  );
}
