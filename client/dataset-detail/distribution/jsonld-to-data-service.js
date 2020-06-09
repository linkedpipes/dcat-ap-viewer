import {
  DCAT,
} from "../../vocabulary/vocabulary";
import {
  getId,
  getEntityByType,
  getResource,
} from "../../jsonld";

import {jsonLdToDistribution} from "./jsonld-to-distribution";

export function jsonLdToDataService(jsonld) {
  const distribution = jsonLdToDistribution(jsonld);
  const dataService = getEntityByType(jsonld, DCAT.DataService);
  if (distribution === undefined || dataService === undefined) {
    return undefined;
  }

  return {
    ...distribution,
    // We keep the IRI from distribution as the distribution
    // is pointed by dataset.
    "endpointDescription": getResource(dataService, DCAT.endpointDescription),
    "endpointURL": getResource(dataService, DCAT.endpointURL),
    "dataService": getId(dataService),
  };
}
