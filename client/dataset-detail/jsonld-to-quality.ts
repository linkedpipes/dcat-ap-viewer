import {
  JsonLdEntity,
  getValue,
  getStrings,
  getResource,
  iterateEntitiesByType,
} from "../jsonld";
import {
  SKOS,
  DQV,
  SDMX,
} from "../vocabulary/vocabulary"
import {QualityMeasures, QualityMeasure} from "./dataset-detail-model";

export function jsonLdToQualityMeasures(jsonld: JsonLdEntity[])
  : QualityMeasures {
  const measures: QualityMeasure[] = [];
  iterateEntitiesByType(jsonld, DQV.QualityMeasurement, (entity) => {
    measures.push({
      "value": Boolean(getValue(entity, DQV.value)),
      "lastCheck": sdmxRefToDate(getResource(entity, SDMX.refPeriod)),
      "measureOf": getResource(entity, DQV.isMeasurementOf),
      "note": getStrings(entity, SKOS.note),
    })
  });
  return new QualityMeasures(measures);
}

function sdmxRefToDate(iri?: string) {
  if (iri === undefined) {
    return undefined;
  }
  return iri.substr(iri.lastIndexOf("/") + 1).replace("T", " ");
}
