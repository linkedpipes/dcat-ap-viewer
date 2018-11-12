import {
    getLanguage
} from "@/app/navigation";

export const DATASET_EDIT = "DATASET_EDIT";
export const DATASET_DELETE = "DATASET_DELETE";
export const CATALOG_DELETE = "CATALOG_DELETE";

const LINKS = {"cs":{}, "en":{}};

LINKS["cs"][DATASET_EDIT] = "registrace-datové-sady";
LINKS["cs"][DATASET_DELETE] = "odstranění-datové-sady";
LINKS["cs"][CATALOG_DELETE] = "odstranění-lokálního-katalogu";
LINKS["en"][DATASET_EDIT] = "dataset-registration";
LINKS["en"][DATASET_DELETE] = "dataset-withdrawn";
LINKS["en"][CATALOG_DELETE] = "local-catalog-withdrawn";

export function getFormLink(type, iri) {
    return FORM_URL + LINKS[getLanguage()][type] +
        "?url=" + encodeURIComponent(iri);
}
