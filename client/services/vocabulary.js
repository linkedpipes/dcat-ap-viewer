const DCTERMS_PREFIX = "http://purl.org/dc/terms/";
export const DCTERMS = {
    "modified": DCTERMS_PREFIX + "modified",
    "accrualPeriodicity": DCTERMS_PREFIX + "accrualPeriodicity",
    "description" : DCTERMS_PREFIX + "description",
    "issued" : DCTERMS_PREFIX + "issued",
    "publisher" : DCTERMS_PREFIX + "publisher",
    "spatial" : DCTERMS_PREFIX + "spatial",
    "title" : DCTERMS_PREFIX + "title",
    "temporal" : DCTERMS_PREFIX + "temporal",
    "format" : DCTERMS_PREFIX + "format",
    "license" : DCTERMS_PREFIX + "license",
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
    "rights": DCTERMS_PREFIX + "rights"
};

const DCAT_PREFIX = "http://www.w3.org/ns/dcat#";
export const DCAT = {
    "Dataset": DCAT_PREFIX + "Dataset",
    "keyword": DCAT_PREFIX + "keyword",
    "contactPoint": DCAT_PREFIX + "contactPoint",
    "distribution": DCAT_PREFIX + "distribution",
    "theme": DCAT_PREFIX + "theme",
    "landingPage": DCAT_PREFIX + "landingPage",
    "byteSize": DCAT_PREFIX + "byteSize",
    "downloadURL": DCAT_PREFIX + "downloadURL",
    "mediaType": DCAT_PREFIX + "mediaType",
    "issued": DCAT_PREFIX + "issued"
};

const FOAF_PREFIX = "http://xmlns.com/foaf/0.1/";
export const FOAF  = {
    "page" : FOAF_PREFIX + "page"
};

const ADMS_PREFIX = "http://www.w3.org/ns/adms#";
export const ADMS = {
    "identifier" : ADMS_PREFIX + "identifier",
    "sample" : ADMS_PREFIX + "sample",
    "versionNotes" : ADMS_PREFIX + "versionNotes",
    "status" : ADMS_PREFIX + "status"
};

const OWL_PREFIX = "http://www.w3.org/2002/07/owl#";
export const OWL = {
    "versionInfo" : OWL_PREFIX + "versionInfo"
};

const SPDX_PREFIX = "http://spdx.org/rdf/terms#";
export const SPDX = {
    "checksum" : SPDX_PREFIX + "checksum"
};