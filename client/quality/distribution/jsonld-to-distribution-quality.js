import {SDMX, DQV, QUALITY, SKOS} from "../../vocabulary/vocabulary"
import {
  getEntitiesByType,
  getResource,
  getValue,
  getStrings,
} from "../../jsonld";

export function jsonLdToQualityDistribution(jsonld) {
  const measures = getEntitiesByType(jsonld, DQV.QualityMeasurement);
  const quality = {
    "ready": true,
  };
  measures.forEach((measure) => {
    const period = getResource(measure, SDMX.refPeriod);
    const measureOf = getResource(measure, DQV.isMeasurementOf);
    const value = getValue(measure, DQV.value);
    switch (measureOf) {
      case QUALITY.downloadAvailability:
        quality["download"] = value;
        quality["downloadLastCheck"] = sdmxRefToDate(period);
        quality["downloadNote"] = getStrings(measure, SKOS.note);
        break;
      case QUALITY.mediaType:
        quality["mediaType"] = value;
        quality["mediaTypeLastCheck"] = sdmxRefToDate(period);
        quality["mediaTypeNote"] = getStrings(measure, SKOS.note);
        break;
      case QUALITY.schemaAvailability:
        quality["schema"] = value;
        quality["schemaLastCheck"] = sdmxRefToDate(period);
        quality["schemaNote"] = getStrings(measure, SKOS.note);
        break;
      case QUALITY.authorship:
        quality["authorshipCustom"] = value; // TODO Check meaning.
        quality["authorshipCustomLastCheck"] = sdmxRefToDate(period);
        quality["authorshipCustomNote"] = getStrings(measure, SKOS.note);
        break;
      case QUALITY.databaseAuthorship:
        quality["databaseAuthorship"] = value;
        quality["databaseAuthorshipLastCheck"] = sdmxRefToDate(period);
        quality["databaseAuthorshipNote"] = getStrings(measure, SKOS.note);
        break;
      case QUALITY.specialDatabaseAuthorship:
        quality["protectedDatabaseAuthorship"] = value;
        quality["protectedDatabaseAuthorshipLastCheck"] =
          sdmxRefToDate(period);
        quality["protectedDatabaseAuthorshipNote"] =
          getStrings(measure, SKOS.note);
        break;
      default:
        break;
    }
  });
  return quality;
}

function sdmxRefToDate(iri) {
  return iri.substr(iri.lastIndexOf("/") + 1)
    .replace("T", " ")
    .replace("-", ".");
}
