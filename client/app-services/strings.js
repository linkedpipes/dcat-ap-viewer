import "@/modules";
import {getLanguage} from "@/app/navigation";
import {getRegistered} from "@/app/register";

// System and app-ui strings.
const strings = {
    "cs": {
        "404_title": "404 stránka nenalezena"
        , "404_text_before": "Zkuste hledat na stránce "
        , "404_link": "datových sad"
        , "404_text_after": "."
        , "http.fetching": "Načítám data ..."
        , "http.missing_resource": "Nepodařilo se nalézt hledaná data."
        , "http.error_response": "Nepodařilo se načíst data."
        , "http.server_failure": "Nepodařilo se načíst data."
        , "http.fetch_failed": "Nepodařilo se načíst data."
        , "header.logo_alt": "Otevřená data"
        , "datasets": "Datové sady"
        , "publishers": "Poskytovatelé"
        , "keywords": "Klíčová slova"
        , "en": "English"
        , "cs": "Čeština"
        , "more": "Další"
        , "for_interested_in_open_data": "Pro zájemce o otevírání dat"
        , "for_programmes": "Pro uživatele a programátory"
        , "for_publishers": "Pro poskytovatele dat"

    },
    "en": {
        "404_title": "404 page not found"
        , "404_text_before": "You can try to search on the "
        , "404_link": "datasets"
        , "404_text_after": " page."
        , "http.fetching": "Loading ..."
        , "http.missing_resource": "Failed to find data."
        , "http.error_response": "Failed to load data."
        , "http.server_failure": "Failed to load data."
        , "http.fetch_failed": "Failed to load data."
        , "header.logo_alt": "Open data"
        , "datasets": "Datasets"
        , "publishers": "Publishers"
        , "keywords": "Keywords"
        , "en": "English"
        , "cs": "Čeština"
        , "more": "More"
        , "for_interested_in_open_data": "About Open Data"
        , "for_programmes": "For users and programmers"
        , "for_publishers": "For publishers"
    }
};

export function initialize() {
    getRegistered().forEach((entry) => {
        if (entry.strings === undefined) {
            return;
        }
        Object.keys(entry.strings).forEach((language) => {
            if (!strings[language]) {
                strings[language] = {};
            }
            strings[language] = {
                ...strings[language],
                ...entry.strings[language]
            }
        });
    });
}

export function getLanguages() {
    let languages = [];
    for (let lang in strings) {
        languages.push(lang);
    }
    return languages;
}

export function getString(name) {
    if (process.env.NODE_ENV === "development") {
        const language = getLanguage();
        const value = strings[language][name];
        if (value === undefined) {
            console.error("Missing key (", language, ") :", name);
        }
        return value;
    } else {
        return strings[getLanguage()][name];
    }
}

export function getStringArgs(name) {
    return getString(name).format(arguments.slice(1));
}
