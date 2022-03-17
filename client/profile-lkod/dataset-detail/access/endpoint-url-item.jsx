import React from "react";
import {PropTypes} from "prop-types";

import {t, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";
import configuration from "../../lkod-configuration";

export default function EndpointUrl(props) {
  const endpointURL = props.dataService.endpointURL;
  if (endpointURL === undefined) {
    return null;
  }
  const measureDefinitions = [{
    "measureOf": QUALITY.endpointUrl,
    "labelTrue": "access.endpointUrlQualityTrue",
    "labelFalse": "access.endpointUrlQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.endpointUrlCors,
    "labelTrue": "access.endpointUrlQualityCorsTrue",
    "labelFalse": "access.endpointUrlQualityCorsFalse",
    "iconTrue": "http",
    "iconFalse": "http",
  }];
  return (
    <li className="list-group-item px-2">
      <a
        href={endpointURL}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.endpoint")}
      </a>
      <QualityIconsForMeasures
        quality={props.quality}
        measureDefinitions={measureDefinitions}
      />
      {
        shouldRenderYasgui(props.dataService)
        && renderYasgui(props.dataService.endpointURL)
      }
    </li>
  );
}

EndpointUrl.propTypes = {
  "dataService": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

function shouldRenderYasgui(dataService) {
  return conformsToSparqlEndpoint(dataService)
    && isNotEmpty(dataService.endpointURL)
    && isNotEmpty(configuration.yasguiUrl);
}

function conformsToSparqlEndpoint(dataService) {
  const conformsTo = dataService.dataServiceConformsTo;
  return conformsTo.includes("https://www.w3.org/TR/sparql11-protocol/");
}

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

function renderYasgui(endpointURL) {
  const yasgui = configuration.yasguiUrl;
  const query = encodeURIComponent(configuration.yasguiDefaultQuery);
  const endpoint = encodeURIComponent(endpointURL);
  const url = `${yasgui}#query=${query}&endpoint=${endpoint}`;
  return (
    <>
      <br style={{"clear":"both"}}/>
      <a
        href={url}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.sparqlEndpoint")}
      </a>
    </>
  );
}
