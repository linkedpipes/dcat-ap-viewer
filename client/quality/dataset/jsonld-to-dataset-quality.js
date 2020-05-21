import {SDMX, DQV, QUALITY, SKOS} from "../../vocabulary/vocabulary";
import {
  getEntitiesByType,
  getResource,
  getStrings,
  getValue,
} from "../../jsonld";
import {sdmxRefToDate} from "../parse-quality-utils";

export default function loadDatasetQuality(jsonld) {
  const quality = {
    "ready": true,
  };
  const measures = getEntitiesByType(jsonld, DQV.QualityMeasurement);
  measures.forEach((measure) => {
    const period = getResource(measure, SDMX.refPeriod);
    const measureOf = getResource(measure, DQV.isMeasurementOf);
    const value = getValue(measure, DQV.value);
    switch (measureOf) {
    case QUALITY.documentationAvailability:
      quality["documentation"] = value;
      quality["documentationLastCheck"] = sdmxRefToDate(period);
      quality["documentationNote"] = getStrings(measure, SKOS.note);
      break;
    default:
      break;
    }
  });
  return quality;
}
