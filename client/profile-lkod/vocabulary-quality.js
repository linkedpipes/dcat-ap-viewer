
const QUALITY_PREFIX = "https://data.gov.cz/zdroj/datová-kvalita/metriky/";

export const QUALITY = {
  "documentation":
    QUALITY_PREFIX + "metrikaDostupnostiDokumentace",
  "documentationCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSDokumentace",
  "download":
    QUALITY_PREFIX + "metrikaDostupnostiDownloadURL",
  "downloadCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSDownloadURL",
  "mediaType":
    QUALITY_PREFIX + "metrikaSprávnostiMediaTypu",
  "schema":
    QUALITY_PREFIX + "metrikaDostupnostiSchématu",
  "schemaCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSSchématu",
  "specification":
    QUALITY_PREFIX + "metrikaDostupnostiSpecifikace",
  "specificationCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSSpecifikace",
  "authorship":
    QUALITY_PREFIX + "metrikaDostupnostiPodmínekUžitíAutorskéDílo",
  "authorshipCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSPodmínekUžitíAutorskéDílo",
  "databaseAuthorship":
    QUALITY_PREFIX + "metrikaDostupnostiPodmínekUžitíAutorskáDatabáze",
  "databaseAuthorshipCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSPodmínekUžitíAutorskáDatabáze",
  "specialDatabaseAuthorship":
    QUALITY_PREFIX + "metrikaDostupnostiPodmínekUžití"
    + "ZvláštníPrávoPořizovateleDatabáze",
  "specialDatabaseAuthorshipCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSPodmínekUžití"
    + "ZvláštníPrávoPořizovateleDatabáze",
  "endpointDescription":
    QUALITY_PREFIX + "metrikaDostupnostiEndpointDescription",
  "endpointDescriptionCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSEndpointDescription",
  "endpointUrl":
    QUALITY_PREFIX + "metrikaDostupnostiEndpointURL",
  "endpointUrlCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSEndpointURL",
  "conformsTo":
    QUALITY_PREFIX + "metrikaDostupnostiServiceConformsTo",
  "conformsToCors":
    QUALITY_PREFIX + "metrikaDostupnostiCORSServiceConformsTo",
};