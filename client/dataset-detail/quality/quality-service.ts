import {QualityMeasure, QualityMeasures} from "./quality-model";
import {SDMX, DQV, SKOS} from "../../vocabulary/vocabulary";
import {JsonLdArray} from "../../api/api-interface";
import {
  getResource,
  getStrings,
  getValue,
  iterateEntitiesByType
} from "../../jsonld";
import {fetchQualityDataset} from "../../api/api-action";
import {fetchQualityDistribution} from "../../api/api-action";

export class DefaultQualityMeasures implements QualityMeasures {

  measures: QualityMeasure[];

  constructor(measures: QualityMeasure[]) {
    this.measures = measures;
  }

  public getMeasure(measureOf: string): QualityMeasure | null {
    for (const measure of this.measures) {
      if (measure.measureOf === measureOf) {
        return measure;
      }
    }
    return null;
  }

}

export function fetchDatasetQuality(iri: string) {
  return fetchQualityDataset(iri);
}

export function jsonLdToQualityMeasures(jsonld: JsonLdArray): QualityMeasures {
  const measures: QualityMeasure[] = [];
  iterateEntitiesByType(jsonld, DQV.QualityMeasurement, (entity) => {
    measures.push({
      "value": Boolean(getValue(entity, DQV.value)),
      "lastCheck": sdmxRefToDate(getResource(entity, SDMX.refPeriod)),
      "measureOf": getResource(entity, DQV.isMeasurementOf),
      "note": getStrings(entity, SKOS.note),
    })
  });
  return new DefaultQualityMeasures(measures);
}

function sdmxRefToDate(iri?: string) {
  if (iri === undefined) {
    return undefined;
  }
  return iri.substr(iri.lastIndexOf("/") + 1).replace("T", " ");
}

export function fetchDistributionQuality(iri: string) {
  return fetchQualityDistribution(iri);
}
