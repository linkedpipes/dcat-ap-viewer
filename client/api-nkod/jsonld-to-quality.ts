import {
  getResource,
  getString,
  JsonLdEntity,
  iterateEntitiesByType,
  getValue,
  getId,
} from "./jsonld";
import {SKOS, SDMX, DQV, SCHEMA} from "./vocabulary"
import {QualityMeasures, QualityMeasure} from "../data-model/quality";

export function jsonLdToQualityMeasures(jsonld: JsonLdEntity[])
  : QualityMeasures {
  const measures: QualityMeasure[] = [];
  iterateEntitiesByType(jsonld, DQV.QualityMeasurement, (entity) => {
    measures.push({
      "iri": getId(entity),
      "value": Boolean(getValue(entity, DQV.value)),
      "lastCheck": sdmxRefToDate(getResource(entity, SDMX.refPeriod)),
      "computedOn": getResource(entity, DQV.computedOn),
      "measureOf": getResource(entity, DQV.isMeasurementOf),
      "note": getString(entity, SKOS.note),
      "object": getResource(entity, SCHEMA.object),
    })
  });
  measures.sort((left, right) => left.iri.localeCompare(right.iri));
  return new QualityMeasures(measures);
}

function sdmxRefToDate(iri?: string) {
  if (iri === undefined) {
    return undefined;
  }
  return iri.substr(iri.lastIndexOf("/") + 1).replace("T", " ");
}
