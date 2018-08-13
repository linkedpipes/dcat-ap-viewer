import {getLanguage} from "./navigation";

const STRINGS = {
    "cs": {
        "title.datasets": "Datové sady",
        "title.dataset": "Datová sada",
        "title.organisations": "Poskytovatelé",
        "title.keywords": "Klíčová slova",
        "url.datasets" : "datové-sady",
        "url.dataset": "datová-sada",
        "url.publishers": "poskytovatelé",
        "query.publisher": "poskytovatel",
        "query.keywords": "klíčová slova",
        "query.formats": "formáty",
        "query.query": "dotaz",
        "query.iri" : "iri",
        "query.page": "stránka",
        "h.datasets": "Datové sady",
        "h.publishers": "Poskytovatelé",
        "h.applications": "Aplikace",
        "h.more": "Další",
        "h.keywords": "Klíčová slova",
        "h.for_interested_in_open_data": "Pro zájemce o otevírání dat",
        "h.for_programmes": "Pro uživatele a programátory",
        "h.for_publishers": "Pro poskytovatele dat",
        "s.no_data": "Žádná data nebyla nalezena",
        "s.fetching": "Načítám data ...",
        "s.fetch_failed": "Nepodařilo se načíst data",
        "s.missing_resource": "Nepodařilo se nalézt hledaná data.",
        "s.error_response": "Nepodařilo se načíst data.",
        "s.server_failure": "Nepodařilo se načíst data.",
        "s.unnamed_distribution": "Distribuce",
        "s.dataset_iri": "IRI datové sady",
        "s.contact_point": "Kontaktní bod",
        "s.publisher": "Poskytovatel",
        "s.datasetTopic": "Téma datové sady",
        "s.topic": "EuroVoc Témata",
        "s.access_right": "Přístupová práva",
        "s.conforms_to": "Splňuje",
        "s.documentation": "Dokumentace",
        "s.frequency": "Periodicita aktualizace",
        "s.has_version": "Má verzi",
        "s.is_version_of": "Je verzí",
        "s.identifier": "Identifikátor",
        "s.other_identifier": "Jiný identifikátor",
        "s.landing_page": "Vstupní stránka",
        "s.language": "Jazyk",
        "s.provenance": "Původ",
        "s.relation": "Související zdroj",
        "s.issued": "Datum vydání",
        "s.modified": "Datum aktualizace",
        "s.sample": "Vzorek",
        "s.source": "Zdroj",
        "s.spatial": "Územní pokrytí",
        "s.temporal": "Časové pokrytí",
        "s.type": "Typ",
        "s.version": "Verze",
        "s.version_notes": "Poznámka k verzi",
        "s.catalog_source": "Odkaz do PVS",
        "s.distribution": "Distribuce",
        "s.name": "Název",
        "s.file": "Soubor",
        "s.format": "Formát",
        "s.structure": "Struktura",
        "s.licence": "Specifické podmínky užití",
        "s.publishers_found": "poskytovatelů nalezeno",
        "s.one_dataset": "1 datová sada",
        "s.two_three_datasets": " datové sady",
        "s.many_datasets": " datových sad",
        "s.show_facets": "Zobrazit filtry",
        "s.hide_facets": "Skrýt filtry",
        "s.datasets_found": "datových sad nalezeno",
        "s.with_query": " na dotaz",
        "s.publishers": "Poskytovatelé",
        "s.keywords": "Klíčová slova",
        "s.formats": "Formáty",
        "s.show_popular": "Zobrazit pouze populární",
        "s.show_more": "Zobrazit další",
        "s.search_query_placeholder": "Vyhledat datové sady ...",
        "e.serviceOffline": "Služba není dostupná.",
        "s.failed": "Nepodařilo se načíst data.",
        "s.404_title": "404 stránka nenalezena",
        "s.404_text_before": "Zkuste hledat na stránce ",
        "s.404_link": "datových sad",
        "s.404_text_after" : ".",
        "title asc": "Název vzestupně",
        "title desc": "Název sestupně",
        "issued asc": "Datum vydání vzestupně",
        "issued desc": "Datum vydání sestupně",
        "modified asc": "Datum aktualizace vzestupně",
        "modified desc": "Datum aktualizace sestupně",
        "en": "English",
        "cs": "Čeština",
        "s_paginator": "Položek na stránce:",
        "service_request_failed": "",
        "missing_support": "",
        "s.clear_filters": "Smaž filtry",
        "s.from": "od",
        "s.to": "do",
        "s.search": "Vyhledat:",
        "s.searching": "Vyhledávám data ...",
        "s.no_data_found" : "Dotazu neodpovídají žádná data.",
        "s.hide_filters" : "Skrýt pokročilé filtry",
        "s.show_filters" : "Zobrazit pokročilé filtry",
        "s.download": "Stáhnout",
        "s.schema": "Schéma",
        "s.documentation_download": "Zobrazit dokumentaci",
        "s.themes": "Témata"
        //
        ,"license_author_multi": "Obsahuje více děl"
        ,"license_author_no": "Neobsahuje"
        ,"license_author_ccBy": "CC BY 4.0"
        ,"license_author_type": "Autorské dílo"
        ,"license_author_custom": "Vlastní licence"
        ,"license_db_type": "Originální databáze"
        ,"license_specialdb_type": "Zvláštní právo pořizovatele databáze"
        ,"license_personal_type": "Osobní údaje"
        ,"license_personal_no": "Neobsahuje"
        ,"license_personal_yes": "Obsahuje"
        ,"s.distribution_access": "Přístup k distribuci"
        ,"s.distribution_license": "Podmínky užití distribuce"
        ,"s.license_missing": "Nespecifikovány"
        ,"s.custom_distribution_license" : "Podmínky užití distribuce"
        ,"license_personal_unspecified": "Může obsahovat osobní údaje (nespecifikováno)"
    },
    "en": {
        "title.datasets": "Datasets",
        "title.dataset": "Dataset",
        "title.organisations": "Publisher",
        "title.keywords": "Keywords",
        "url.datasets" : "datasets",
        "url.dataset": "dataset",
        "url.publishers": "publishers",
        "query.publisher": "publisher",
        "query.keywords": "keywords",
        "query.formats": "formats",
        "query.query": "query",
        "query.iri" : "iri",
        "query.page": "page",
        "h.datasets": "Datasets",
        "h.publishers": "Publishers",
        "h.applications": "Applications",
        "h.more": "More",
        "h.keywords": "Keywords",
        "h.for_interested_in_open_data": "About Open Data",
        "h.for_programmes": "For users and programmers",
        "h.for_publishers": "For publishers",
        "s.no_data": "No data have been found ",
        "s.fetching": "Loading ...",
        "s.fetch_failed": "Failed to load data.",
        "s.missing_resource": "Failed to find data.",
        "s.error_response": "Failed to load data.",
        "s.server_failure": "Failed to load data.",
        "s.unnamed_distribution": "Distribution",
        "s.dataset_iri": "Dataset IRI",
        "s.contact_point": "Contact point",
        "s.publisher": "Publisher",
        "s.datasetTopic": "Dataset Theme",
        "s.topic": "EuroVoc Themes",
        "s.access_right": "Access right",
        "s.conforms_to": "Conforms to",
        "s.documentation": "Documentation",
        "s.frequency": "Frequency",
        "s.has_version": "Has version",
        "s.is_version_of": "is version of",
        "s.identifier": "Identifier",
        "s.other_identifier": "Other identifier",
        "s.landing_page": "Landing page",
        "s.language": "Language",
        "s.provenance": "Provenance",
        "s.relation": "Relation",
        "s.issued": "Issued",
        "s.modified": "Modified",
        "s.sample": "Sample",
        "s.source": "Source",
        "s.spatial": "Spatial coverage",
        "s.temporal": "Temporal coverage",
        "s.type": "Type",
        "s.version": "Version",
        "s.version_notes": "Version notes",
        "s.catalog_source": "Source",
        "s.distribution": "Distribution",
        "s.name": "Label",
        "s.file": "File",
        "s.format": "Format",
        "s.structure": "Structure",
        "s.licence": "Custom license",
        "s.publishers_found": "publishers found",
        "s.one_dataset": "1 dataset",
        "s.two_three_datasets": " datasets",
        "s.many_datasets": " datasets",
        "s.show_facets": "Show filters",
        "s.hide_facets": "Hide filters",
        "s.datasets_found": "datasets found",
        "s.with_query": " with query",
        "s.publishers": "Publisher",
        "s.keywords": "Keyword",
        "s.formats": "Format",
        "s.show_popular": "Show popular only",
        "s.show_more": "Show more",
        "s.search_query_placeholder": "Search datasets ...",
        "e.serviceOffline": "Service is not available.",
        "s.failed": "Data loading failed.",
        "s.404_title": "404 page not found",
        "s.404_text_before": "You can try to search on the ",
        "s.404_link": "datasets",
        "s.404_text_after": " page.",
        "title asc": "Title Ascending",
        "title desc": "Title Descending",
        "issued asc": "Issued Ascending",
        "issued desc": "Issued Descending",
        "modified asc": "Modified Ascending",
        "modified desc": "Modified Descending",
        "en": "English",
        "cs": "Čeština",
        "s_paginator": "Items per page:",
        "s.clear_filters": "Clear filters",
        "s.from": "from",
        "s.to": "to",
        "s.search": "Query:",
        "s.searching": "Searching ...",
        "s.no_data_found" : "No data found.",
        "s.hide_filters" : "Hide advanced filters",
        "s.show_filters" : "Show advanced filters",
        "s.download": "Download",
        "s.schema": "Schema",
        "s.documentation_download": "Show documentation",
        "s.themes": "Themes"
        //
        ,"license_author_multi": "Shared authorship"
        ,"license_author_no": "No license"
        ,"license_author_ccBy": "CC BY 4.0"
        ,"license_author_type": "License author type"
        ,"license_author_custom": "Custom license"
        ,"license_db_type": "Database author type"
        ,"license_specialdb_type": "Special database license"
        ,"license_personal_type": "Personal data"
        ,"license_personal_no": "Contains personal data"
        ,"license_personal_yes": "No personal data"
        ,"s.distribution_access": "Access"
        ,"s.distribution_license": "Terms of use"
        ,"s.license_missing": "Missing"
        ,"s.custom_distribution_license" : "Terms of use"
        ,"license_personal_unspecified": "May contain personal data (unspecified)"
    }
};

export const getLanguages = () => {
    let languages = [];
    for (let lang in STRINGS) {
        languages.push(lang);
    }
    return languages;
};

// TODO Add support for arguments in the string function
export const getString = (name) => {
    if (process.env.NODE_ENV === "development") {
        const language = getLanguage();
        const value = STRINGS[language][name];
        if (value === undefined) {
            console.error("Missing key (", language, ") :", name);
        }
        return value;
    } else {
        return STRINGS[getLanguage()][name];
    }
};
