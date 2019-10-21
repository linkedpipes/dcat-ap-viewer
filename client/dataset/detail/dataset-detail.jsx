import React from "react";
import {
  selectLabel,
  selectString,
  selectLabelNoIri,
} from "@/app-services/labels/index";
import {Link} from "react-router-dom";
import {getString} from "@/app-services/strings";
import {
  DATASET_LIST_URL,
  getUrl,
  KEYWORDS_QUERY,
  THEME_QUERY,
} from "@/app/navigation";
import {
  getFormLink,
  DATASET_EDIT,
  DATASET_DELETE,
  CATALOG_DELETE,
} from "@/app/form-links";
import {NKOD} from "@/app-services/vocabulary";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";

export default class DatasetView extends React.PureComponent {

  render() {
    const {dataset, publisherUrl, labels, openModal} = this.props;
    const title = selectLabel(labels, this.props.dataset);

    return (
      <div>
        <h1>{title}
          <a href={DEREFERENCE_IRI + dataset["@id"]} target="_blank"
            rel="noopener noreferrer">
            <i className="material-icons pl-2">open_in_new</i>
          </a>
          {dialogLinks(dataset)}
        </h1>
        <h2>
          <Link to={publisherUrl}>
            {selectLabel(labels, dataset.publisher)}
          </Link>
        </h2>
        <p>{selectString(dataset.description)}</p>
        <hr/>
        <Keywords keywords={dataset.keywords}/>
        <Properties labels={labels} dataset={dataset}
          openModal={openModal}/>
        <hr/>
      </div>
    )
  }

}

DatasetView.propTypes = {
  "openModal": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
  "publisherUrl": PropTypes.string.isRequired,
  "labels": PropTypes.object.isRequired,
};

function dialogLinks(dataset) {
  const isFromForm = dataset["@type"].indexOf(NKOD.SourceForm) !== -1;
  const isFromLkod =
        dataset["@type"].indexOf(NKOD.SourceCkan) !== -1 ||
        dataset["@type"].indexOf(NKOD.SourceDcat) !== -1 ||
        dataset["@type"].indexOf(NKOD.SourceSparql) !== -1;
  const actionStyle = {"color": "grey"};
  if (isFromForm) {
    const iri = dataset["@id"];
    return (
      <span>
        <a href={getFormLink(DATASET_EDIT, iri)}
          target="_blank" rel="nofollow noopener noreferrer">
          <i className="material-icons pl-2" style={actionStyle}>
                    edit
          </i>
        </a>
        <a href={getFormLink(DATASET_DELETE, iri)}
          target="_blank" rel="nofollow noopener noreferrer">
          <i className="material-icons pl-2" style={actionStyle}>
                    delete_forever
          </i>
        </a>
      </span>
    )
  } else if (isFromLkod) {
    const iri = dataset["lkod"];
    return (
      <span>
        <a href={getFormLink(CATALOG_DELETE, iri)}
          target="_blank" rel="nofollow noopener noreferrer">
          <i className="material-icons pl-2" style={actionStyle}>
                    delete_forever
          </i>
        </a>
      </span>
    )
  }
  return null;
}

function Keywords({keywords}) {
  const hasKeywords = Object.keys(keywords).length > 0;
  if (!hasKeywords) {
    return null;
  }

  const keywordsLabels = selectString(keywords);
  const keywordsRef = keywordsLabels.map((keyword) => (
    {
      "label": keyword,
      "url": getUrl(DATASET_LIST_URL, {[KEYWORDS_QUERY]: keyword}),
    }));

  return (
    <div>
      <span className="sr-only">{getString("keywords") + ":"}</span>
      {keywordsRef.map((keyword) => (
        <Link className="btn btn-light mx-1"
          to={keyword.url} role="button"
          key={keyword.label}>
          {keyword.label}
        </Link>
      ))}
      <hr/>
    </div>
  )
}

Keywords.propTypes = {
  "keywords": PropTypes.object.isRequired,
};

function Properties({labels, dataset, openModal}) {
  return (
    <div className="row">
      {firstColumn(labels, dataset)}
      {secondColumn(labels, dataset)}
      {thirdColumn(labels, dataset, openModal)}
      {fourthColumn(labels, dataset)}
    </div>
  );
}

Properties.propTypes = {
  "openModal": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
  "labels": PropTypes.object.isRequired,
};

function firstColumn(labels, dataset) {
  const hasThemes = containsData(dataset.themes);
  const hasDataThemes = containsData(dataset.datasetThemes);
  if (!hasThemes && !hasDataThemes) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      {hasDataThemes &&
            <dl>
              <dt>{getString("dataset_topic")}</dt>
              {searchableLabeledLinkEntitiesAsDd(
                labels, dataset.datasetThemes, THEME_QUERY)}
            </dl>
      }
      {hasThemes &&
            <dl>
              <dt>{getString("topic")}</dt>
              {searchableLabeledLinkEntitiesAsDd(
                labels, dataset.themes, THEME_QUERY)}
            </dl>
      }
    </div>
  )

}

function searchableLabeledLinkEntitiesAsDd(labels, entities, searchQuery) {
  if (!Array.isArray(entities)) {
    entities = [entities];
  }
  return entities.map((entity) => {
    const searchLink = getUrl(
      DATASET_LIST_URL, {[searchQuery]: entity["@id"]});
    return (
      <dd key={entity["@id"]}>
        <Link to={searchLink}>
          {selectLabel(labels, entity)}
        </Link>
        <a href={entity["@id"]} rel="nofollow noopener noreferrer" target="_blank">
          {linkIcon()}
        </a>
        <br/>
      </dd>
    )
  });
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

function containsData(value) {
  return value !== undefined && value.length !== 0;
}

function secondColumn(labels, dataset) {
  const spatial = spatialCoverage(labels, dataset);
  const spatialResolution = spatialCoverageResolution(labels, dataset);
  const temporal = temporalCoverage(dataset);
  const temporalResolution = temporalCoverageResolution(labels, dataset);
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

function spatialCoverage(labels, dataset) {
  if (!containsData(dataset.spatial)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{getString("spatial")}</dt>
      {labeledLinkEntitiesAsDd(labels, dataset.spatial)}
    </React.Fragment>
  )
}

function spatialCoverageResolution(labels, dataset) {
  if (!containsData(dataset.spatialResolutionInMeters)) {
    return null;
  }
  return (
    <React.Fragment>
      <dt>{getString("spatial_resolution")}</dt>
      {dataset.spatialResolutionInMeters} m
    </React.Fragment>
  )
}

function labeledLinkEntitiesAsDd(labels, entities) {
  if (!Array.isArray(entities)) {
    entities = [entities];
  }
  return entities.map((entity) => (
    <dd key={entity["@id"]}>
      {selectLabel(labels, entity)}
      <a href={entity["@id"]} rel="nofollow noopener noreferrer" target="_blank">
        {linkIcon()}
      </a>
      <br/>
    </dd>
  ));
}

function temporalCoverage(dataset) {
  if (!containsData(dataset.temporal)) {
    return false;
  }
  return (
    <React.Fragment>
      <dt>{getString("temporal")}</dt>
      {temporalAsString(dataset.temporal)}
    </React.Fragment>
  )
}

function temporalAsString(temporal) {
  let value;
  if (temporal.startDate === undefined) {
    if (temporal.endDate === undefined) {
      value = temporal.iri;
    } else {
      value = " - " + updateDate(temporal.endDate);
    }
  } else {
    if (temporal.endDate === undefined) {
      value = updateDate(temporal.startDate) + " - ";
    } else {
      value = updateDate(temporal.startDate) + " - " +
        updateDate(temporal.endDate);
    }
  }
  return (
    <dd>
      {value}
    </dd>
  )
}

function temporalCoverageResolution(labels, dataset) {
  if (!containsData(dataset.temporalResolution)) {
    return false;
  }
  return (
    <React.Fragment>
      <dt>{getString("temporal_resolution")}</dt>
      {xsdDurationToString(dataset.temporalResolution)}
    </React.Fragment>
  )
}

function xsdDurationToString(durationAsStr) {
  const duration = parseXsdDuration(durationAsStr);
  let output = "";
  if (duration.negative) {
    output = "- ";
  }
  output +=
    appendValue(duration.year, "year")
    + appendValue(duration.month, "month")
    + appendValue(duration.day, "day")
    + appendValue(duration.hour, "hour")
    + appendValue(duration.minute, "minute")
    + appendValue(duration.second, "second")
  ;
  return output;
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

function appendValue(value, labelName) {
  if (value === null) {
    return "";
  } else if (value === 1) {
    return "1 " + getString(labelName) + " ";
  } else if (Math.abs(value) < 5) {
    return value + " " + getString(labelName + "s-2") + " ";
  } else if (Math.abs(value) >= 5) {
    return value + " " + getString(labelName + "s-5") + " ";
  } else {
    return "";
  }
}

function thirdColumn(labels, dataset, openModal) {
  const hasDocumentation = containsData(dataset.documentation);
  const hasContacts = containsData(dataset.contactPoints);
  if (!hasDocumentation && !hasContacts) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        {hasDocumentation && documentationLabel(dataset, openModal)}
        {hasDocumentation && documentation(dataset)}
        {hasContacts && <dt>{getString("contact_point")}</dt>}
        {hasContacts && contactPoints(labels, dataset.contactPoints)}
      </dl>
    </div>
  )
}


function fourthColumn(labels, dataset) {
  const hasFrequency = containsData(dataset.frequency);
  if (!hasFrequency) {
    return null;
  }
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <dl>
        <dt>{getString("frequency")}</dt>
        {labeledLinkEntitiesAsDd(labels, dataset.frequency)}
      </dl>
    </div>
  )
}

function documentationLabel(dataset, openModal) {
  const strArgs = {
    "date": dataset.quality.documentationLastCheck,
  };
  if (!dataset.quality.ready) {
    return (
      <dt>
        {getString("documentation")}
        <Spinner size="sm" color="secondary" className="float-right"/>
      </dt>
    )
  }
  if (dataset.quality.documentation === null) {
    return (
      <dt>
        {getString("documentation")}
      </dt>
    )
  }
  if (dataset.quality.documentation) {
    return (
      <dt>
        {getString("documentation")}
        <i className="material-icons text-success float-right"
          title={getString("documentation_available", strArgs)}
          onClick={() => openModal(getString("documentation_available", strArgs))}>
                    verified_user
        </i>
      </dt>
    )
  } else {
    return (
      <dt>
        {getString("documentation")}
        <i className="material-icons text-danger float-right"
          title={getString("documentation_unavailable", strArgs)}
          onClick={() => openModal(getString("documentation_unavailable", strArgs))}>
                    link_off
        </i>
      </dt>
    )
  }
}

function documentation(dataset) {
  let entities = dataset.documentation;
  if (!Array.isArray(entities)) {
    entities = [entities];
  }
  const label = getString("documentation_download");
  return entities.map((iri) => (
    <dd key={iri}>
      <a href={iri} rel="nofollow noopener noreferrer">
        {label}
      </a>
      <br/>
    </dd>
  ));
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

function contactPoints(labels, contactPoints) {
  if (contactPoints === undefined) {
    return null;
  }
  if (!Array.isArray(contactPoints)) {
    contactPoints = [contactPoints];
  }
  return contactPoints.map((contact) => (
    <dd key={contact.iri}>
      {contactPoint(labels, contact)}
      <br/>
    </dd>
  ));
}

function contactPoint(labels, contactPoint) {
  let label = selectLabelNoIri(labels, contactPoint.iri);
  let email = getEmail(contactPoint);

  if (label === undefined) {
    if (email === undefined) {
      label = contactPoint.iri;
    } else {
      label = email;
    }
  }

  let iri;
  if (email === undefined) {
    iri = contactPoint.iri;
  } else {
    iri = "mailto:" + contactPoint.email;
  }

  return (
    <a href={iri} rel="nofollow noopener noreferrer">{label}</a>
  )
}

function getEmail(value) {
  if (value.email === undefined || value.email.length === 0) {
    return undefined;
  } else {
    return value.email[0];
  }
}
