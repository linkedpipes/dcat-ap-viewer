import {register} from "@/app/register.js";
import reducer from "./dataset-detail-reducer";
import {DatasetDetailContainer} from "./dataset-detail-container";
import {DATASET_DETAIL_URL} from "@/app/navigation";
import termsOfUseString from "./distribution/terms-of-use/strings";

register({
    "reducer": reducer.reducer,
    "name": reducer.name,
    "url": [DATASET_DETAIL_URL],
    "component": DatasetDetailContainer,
    "strings": {
        "cs": {
            "documentation": "Dokumentace"
            , "contact_point": "Kontaktní bod"
            , "frequency": "Periodicita aktualizace"
            , "documentation_download": "Zobrazit dokumentaci"
            , "spatial": "Územní pokrytí"
            , "temporal": "Časové pokrytí"
            , "dataset_topic": "Téma datové sady"
            , "topic": "EuroVoc Témata"
            , "unnamed_distribution": "Distribuce"
            , "download": "Stáhnout"
            , "file_available": "Soubor byl {date} dostupný."
            , "file_unavailable": "Soubor byl {date} nedostupný."
            , "schema": "Schéma"
            , "schema_available" : "Schéma bylo {date} dostupné."
            , "schema_unavailable" : "Schéma bylo {date} nedostupné."
            , "licence": "Podmínky užití"
            , "distribution_access": "Přístup k distribuci"
            , "distribution_license": "Podmínky užití distribuce"
            , "documentation_available": "Dokumentace byla {date} dostupná."
            , "documentation_unavailable": "Dokumentace byla {date} nedostupná."
            , "format_match": "Datový formát registrovaný poskytovatelem odpovídá datovému formátu, který indikuje webový server."
            , "format_mismatch" : "Datový formát registrovaný poskytovatelem je jiný, než datový formát indikovaný webovým serverem: {note}."
            , ...termsOfUseString["cs"]
        },
        "en": {
            "documentation": "Documentation"
            , "contact_point": "Contact point"
            , "frequency": "Frequency"
            , "documentation_download": "Show documentation"
            , "spatial": "Spatial coverage"
            , "temporal": "Temporal coverage"
            , "dataset_topic": "Dataset Theme"
            , "topic": "Dataset Theme"
            , "unnamed_distribution": "Distribution"
            , "download": "Download"
            , "file_available": "The file was available on {date}."
            , "file_unavailable": "The file was unavailable on {date}."
            , "schema": "Schema"
            , "schema_available" : "Schéma bylo {date} nedostupné."
            , "schema_unavailable" : "The schema was unavailable on {date}."
            , "licence": "Licence"
            , "distribution_access": "Access"
            , "distribution_license": "Terms of use"
            , "documentation_available": "The documentation was available on {date}."
            , "documentation_unavailable": "The documentation was unavailable on {date}."
            , "format_match": "The media type registered by the publisher matches the media type indicated by the web server."
            , "format_mismatch" : " The media type registered by the publisher differs from the media type indicated by the web server: {note}."
            , ...termsOfUseString["en"]
        }
    }
});
