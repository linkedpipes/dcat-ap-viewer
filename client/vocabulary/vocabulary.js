const DCTERMS_PREFIX = "http://purl.org/dc/terms/";
export const DCTERMS = {
  "modified": DCTERMS_PREFIX + "modified",
  "accrualPeriodicity": DCTERMS_PREFIX + "accrualPeriodicity",
  "description": DCTERMS_PREFIX + "description",
  "issued": DCTERMS_PREFIX + "issued",
  "publisher": DCTERMS_PREFIX + "publisher",
  "spatial": DCTERMS_PREFIX + "spatial",
  "title": DCTERMS_PREFIX + "title",
  "temporal": DCTERMS_PREFIX + "temporal",
  "format": DCTERMS_PREFIX + "format",
  "license": DCTERMS_PREFIX + "license",
  "accessRights": DCTERMS_PREFIX + "accessRights",
  "conformsTo": DCTERMS_PREFIX + "conformsTo",
  "hasVersion": DCTERMS_PREFIX + "hasVersion",
  "identifier": DCTERMS_PREFIX + "identifier",
  "isVersionOf": DCTERMS_PREFIX + "isVersionOf",
  "language": DCTERMS_PREFIX + "language",
  "provenance": DCTERMS_PREFIX + "provenance",
  "relation": DCTERMS_PREFIX + "relation",
  "source": DCTERMS_PREFIX + "source",
  "type": DCTERMS_PREFIX + "type",
  "rights": DCTERMS_PREFIX + "rights",
};

const DCELEMENTS_PREFIX = "http://purl.org/dc/elements/1.1/";
export const DCELEMENTS = {
  "source": DCELEMENTS_PREFIX + "source",
};


const DCAT_PREFIX = "http://www.w3.org/ns/dcat#";
export const DCAT = {
  "CatalogRecord" : DCAT_PREFIX + "CatalogRecord",
  "Catalog": DCAT_PREFIX + "Catalog",
  "Dataset": DCAT_PREFIX + "Dataset",
  "Distribution": DCAT_PREFIX + "Distribution",
  "keyword": DCAT_PREFIX + "keyword",
  "contactPoint": DCAT_PREFIX + "contactPoint",
  "distribution": DCAT_PREFIX + "distribution",
  "theme": DCAT_PREFIX + "theme",
  "landingPage": DCAT_PREFIX + "landingPage",
  "byteSize": DCAT_PREFIX + "byteSize",
  "downloadURL": DCAT_PREFIX + "downloadURL",
  "mediaType": DCAT_PREFIX + "mediaType",
  "issued": DCAT_PREFIX + "issued",
  "accessURL": DCAT_PREFIX + "accessURL",
  "packageFormat": DCAT_PREFIX + "packageFormat",
  "compressFormat": DCAT_PREFIX + "compressFormat",
  "DataService": DCAT_PREFIX + "DataService",
  "endpointURL": DCAT_PREFIX + "endpointURL",
  "servesDataset": DCAT_PREFIX + "servesDataset",
  "endpointDescription": DCAT_PREFIX + "endpointDescription",
  "temporalResolution": DCAT_PREFIX + "temporalResolution",
  "spatialResolutionInMeters": DCAT_PREFIX + "spatialResolutionInMeters",
};

const FOAF_PREFIX = "http://xmlns.com/foaf/0.1/";
export const FOAF = {
  "page": FOAF_PREFIX + "page",
  "name": FOAF_PREFIX + "name",
  "email": FOAF_PREFIX + "email",
};

const ADMS_PREFIX = "http://www.w3.org/ns/adms#";
export const ADMS = {
  "identifier": ADMS_PREFIX + "identifier",
  "sample": ADMS_PREFIX + "sample",
  "versionNotes": ADMS_PREFIX + "versionNotes",
  "status": ADMS_PREFIX + "status",
};

const OWL_PREFIX = "http://www.w3.org/2002/07/owl#";
export const OWL = {
  "versionInfo": OWL_PREFIX + "versionInfo",
};

const SPDX_PREFIX = "http://spdx.org/rdf/terms#";
export const SPDX = {
  "checksum": SPDX_PREFIX + "checksum",
};

const VCARD_PREFIX = "http://www.w3.org/2006/vcard/ns#";
export const VCARD = {
  "fn": VCARD_PREFIX + "fn",
  "hasEmail": VCARD_PREFIX + "hasEmail",
};

const SCHEMA_PREFIX = "http://schema.org/";
export const SCHEMA = {
  "startDate": SCHEMA_PREFIX + "startDate",
  "endDate": SCHEMA_PREFIX + "endDate",
  "Organization": SCHEMA_PREFIX + "Organization",
};

const SKOS_PREFIX = "http://www.w3.org/2004/02/skos/core#";
export const SKOS = {
  "prefLabel": SKOS_PREFIX + "prefLabel",
  "inScheme": SKOS_PREFIX + "inScheme",
  "note": SKOS_PREFIX + "note",
};

const RDF_PREFIX = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
export const RDF = {
  "type": RDF_PREFIX + "type",
  "label": RDF_PREFIX + "label",
};

export const EUA = {
  "dataTheme": "http://publications.europa.eu/resource/authority/data-theme",
};

const PU_PREFIX = "https://data.gov.cz/slovník/podmínky-užití/";
export const PU = {
  "specification": PU_PREFIX + "specifikace",
  "authorship": PU_PREFIX + "autorské-dílo",
  "author": PU_PREFIX + "autor",
  "databaseAuthorship": PU_PREFIX + "databáze-jako-autorské-dílo",
  "databaseAuthor": PU_PREFIX + "autor-databáze",
  "protectedDatabase": PU_PREFIX + "databáze-chráněná-zvláštními-právy",
  "personalData": PU_PREFIX + "osobní-údaje",
};

const POU_PREFIX = "https://data.gov.cz/podmínky-užití/";
export const PU_VALUES_MAPPING = {
  [POU_PREFIX + "neobsahuje-autorská-díla/"]: "no",
  [POU_PREFIX + "obsahuje-více-autorských-děl/"]: "multi",
  "https://creativecommons.org/licenses/by/4.0/": "ccBy",
  [POU_PREFIX + "není-autorskoprávně-chráněnou-databází/"]: "no",
  "https://creativecommons.org/publicdomain/zero/1.0/": "cc0",
  [POU_PREFIX + "není-chráněna-zvláštním-právem-pořizovatele-databáze/"]: "no",
  [POU_PREFIX + "obsahuje-osobní-údaje/"]: "contains",
  [POU_PREFIX + "neobsahuje-osobní-údaje/"]: "no",
  [POU_PREFIX + "není-specifikováno-zda-obsahuje-osobní-údaje/"]: "unspecified",
  "missing": "missing",
};

const RDFS_PREFIX = "http://www.w3.org/2000/01/rdf-schema#";
export const RDFS = {
  "label": RDFS_PREFIX + "label",
};

const NKOD_PREFIX = "https://data.gov.cz/slovník/nkod/";
export const NKOD = {
  "SourceForm": NKOD_PREFIX + "typ-datové-sady-dle-zdroje/Formulář",
  "SourceCkan": NKOD_PREFIX + "typ-datové-sady-dle-zdroje/CkanLkod",
  "SourceDcat": NKOD_PREFIX + "typ-datové-sady-dle-zdroje/DcatLkod",
  "SourceSparql": NKOD_PREFIX + "typ-datové-sady-dle-zdroje/DcatLkodSparql",
  "lkod": NKOD_PREFIX + "lkod",
  "ExceptionalPublisher": NKOD_PREFIX + "VzornýPoskytovatel",
  "CkanApiLkod": NKOD_PREFIX + "CkanApiLkod",
};

const DQV_PREFIX = "http://www.w3.org/ns/dqv#";
export const DQV = {
  "QualityMeasurement": DQV_PREFIX + "QualityMeasurement",
  "computedOn": DQV_PREFIX + "computedOn",
  "isMeasurementOf": DQV_PREFIX + "isMeasurementOf",
  "value": DQV_PREFIX + "value",
  "expectedDataType": DQV_PREFIX + "expectedDataType",
};

const QUALITY_PREFIX = "https://data.gov.cz/zdroj/datová-kvalita/metriky/";
export const QUALITY = {
  "documentationAvailability": QUALITY_PREFIX + "metrikaDostupnostiDokumentace",
  "downloadAvailability": QUALITY_PREFIX + "metrikaDostupnostiDownloadURL",
  "mediaType": QUALITY_PREFIX + "metrikaSprávnostiMediaTypu",
  "schemaAvailability": QUALITY_PREFIX + "metrikaDostupnostiSchématu",
  "authorship": QUALITY_PREFIX + "metrikaDostupnostiPodmínekUžitíAutorskéDílo",
  "databaseAuthorship": QUALITY_PREFIX + "metrikaDostupnostiPodmínekUžitíAutorskáDatabáze",
  "specialDatabaseAuthorship": QUALITY_PREFIX + "metrikaDostupnostiPodmínekUžitíZvláštníPrávoPořizovateleDatabáze",
};

export const SDMX = {
  "refPeriod": "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod",
};

const LP_PREFIX = "urn:";
export const LP = {
  "datasetsCount": LP_PREFIX + "datasetsCount",
  "count": LP_PREFIX + "count",
  "usedByPublishersCount": LP_PREFIX + "usedByPublishersCount",
  "Keyword": LP_PREFIX + "Keyword",
  "DatasetListMetadata": LP_PREFIX + "DatasetListMetadata",
  "Facet": LP_PREFIX + "Facet",
  "facet": LP_PREFIX + "facet",
  "keyword": LP_PREFIX + "keyword",
  "format": LP_PREFIX + "format",
  "publisher": LP_PREFIX + "publisher",
  "theme": LP_PREFIX + "theme",
  "code": LP_PREFIX + "code",
};

const FEL_PREFIX = "http://onto.fel.cvut.cz/ontologies/slovnik/agendovy/popis-dat/pojem/";
export const FEL = {
  "jePojmemZeSlovniku": FEL_PREFIX + "je-pojmem-ze-slovniku",
};

