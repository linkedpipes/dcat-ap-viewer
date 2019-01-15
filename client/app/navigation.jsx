import React from "react";
import {App} from "./app";
import {Router, Route, Switch} from "react-router-dom";
import {PageNotFound} from "@/system/page-not-found";
import {getRegistered} from "./register";

// Define application navigation properties
export const DATASET_LIST_URL = "DATASET_LIST";
export const DATASET_DETAIL_URL = "DATASET_DETAIL";
export const ORGANISATION_LIST_URL = "ORGANISATION_LIST";
export const KEYWORDS_LIST_URL = "KEYWORDS_LIST";
export const CATALOG_LIST_URL = "CATALOG_LIST";
export const PUBLISHER_QUERY = "PUBLISHER_QUERY";
export const KEYWORDS_QUERY = "KEYWORDS_QUERY";
export const FORMAT_QUERY = "FORMAT_QUERY";
export const THEME_QUERY = "THEME_QUERY";
export const STRING_QUERY = "STRING_QUERY";
export const DATASET_QUERY = "DATASET_QUERY";
export const PAGE_QUERY = "PAGE_QUERY";
export const SORT_QUERY = "SORT_QUERY";
export const PAGE_SIZE_QUERY = "PAGE_SIZE_QUERY";
export const TEMPORAL_START = "TEMPORAL_START";
export const TEMPORAL_END = "TEMPORAL_END";
export const VIEW_QUERY = "VIEW_QUERY";

export const PAGE = "PAGE";
export const QUERY = "QUERY";
const VALUE = "VALUE";
const NAVIGATION = {
    "cs": {},
    "en": {}
};

// TODO Use strings
NAVIGATION["cs"][PAGE] = {};
NAVIGATION["cs"][PAGE][DATASET_LIST_URL] = "datové-sady";
NAVIGATION["cs"][PAGE][DATASET_DETAIL_URL] = "datová-sada";
NAVIGATION["cs"][PAGE][ORGANISATION_LIST_URL] = "poskytovatelé";
NAVIGATION["cs"][PAGE][KEYWORDS_LIST_URL] = "klíčová-slova";
NAVIGATION["cs"][PAGE][CATALOG_LIST_URL] = "lokální-katalogy";
NAVIGATION["cs"][QUERY] = {};
NAVIGATION["cs"][QUERY][PUBLISHER_QUERY] = "poskytovatel";
NAVIGATION["cs"][QUERY][KEYWORDS_QUERY] = "klíčová slova";
NAVIGATION["cs"][QUERY][FORMAT_QUERY] = "formáty";
NAVIGATION["cs"][QUERY][THEME_QUERY] = "témata";
NAVIGATION["cs"][QUERY][STRING_QUERY] = "dotaz";
NAVIGATION["cs"][QUERY][DATASET_QUERY] = "iri";
NAVIGATION["cs"][QUERY][PAGE_QUERY] = "stránka";
NAVIGATION["cs"][QUERY][SORT_QUERY] = "pořadí";
NAVIGATION["cs"][QUERY][PAGE_SIZE_QUERY] = "velikost stránky";
NAVIGATION["cs"][QUERY][TEMPORAL_START] = "temporal start";
NAVIGATION["cs"][QUERY][TEMPORAL_END] = "temporal end";
NAVIGATION["cs"][QUERY][VIEW_QUERY] = "vizualizace";

NAVIGATION["en"][PAGE] = {};
NAVIGATION["en"][PAGE][DATASET_LIST_URL] = "datasets";
NAVIGATION["en"][PAGE][DATASET_DETAIL_URL] = "dataset";
NAVIGATION["en"][PAGE][ORGANISATION_LIST_URL] = "publishers";
NAVIGATION["en"][PAGE][KEYWORDS_LIST_URL] = "keywords";
NAVIGATION["en"][PAGE][CATALOG_LIST_URL] = "local-catalogs";
NAVIGATION["en"][QUERY] = {};
NAVIGATION["en"][QUERY][PUBLISHER_QUERY] = "publisher";
NAVIGATION["en"][QUERY][KEYWORDS_QUERY] = "keywords";
NAVIGATION["en"][QUERY][FORMAT_QUERY] = "formats";
NAVIGATION["en"][QUERY][THEME_QUERY] = "themes";
NAVIGATION["en"][QUERY][STRING_QUERY] = "query";
NAVIGATION["en"][QUERY][DATASET_QUERY] = "iri";
NAVIGATION["en"][QUERY][PAGE_QUERY] = "page";
NAVIGATION["en"][QUERY][SORT_QUERY] = "sort";
NAVIGATION["en"][QUERY][PAGE_SIZE_QUERY] = "page size";
NAVIGATION["en"][QUERY][TEMPORAL_START] = "temporal start";
NAVIGATION["en"][QUERY][TEMPORAL_END] = "temporal end";
NAVIGATION["en"][QUERY][VIEW_QUERY] = "visualization";

//
// TODO Split to multiple files
//

let activeLanguage = getDefaultLanguage();

function getDefaultLanguage() {
    const language = navigator.language || navigator.userLanguage;
    if (NAVIGATION[language] === undefined) {
        return "en";
    } else {
        return language;
    }
}

export function getLanguage() {
    return activeLanguage;
}

export function setLanguage(language) {
    activeLanguage = language;
}

export function listLanguages() {
    return Object.keys(NAVIGATION);
}

//
//
//

export const getUrl = (page, query) => {
    let url = URL_PREFIX + "/" + NAVIGATION[getLanguage()][PAGE][page];
    if (query === undefined) {
        return url;
    }
    const keys = Object.keys(query);
    url += "?" + getQuery(keys[0]) + "=" + encodeURIComponent(query[keys[0]]);
    for (let index = 1; index < keys.length; ++index) {
        const value = encodeURIComponent(query[keys[index]]);
        url += "&" + getQuery(keys[index]) + "=" + value;
    }
    return url;
};

export const getFullUrl = (page, query, lang) => {
    if (!lang) {
        lang = getLanguage();
    }
    let url = URL_BASE + "/" + NAVIGATION[lang][PAGE][page];
    const keys = Object.keys(query);
    if (keys.length === 0) {
        return url;
    }
    url += "?" + getQuery(keys[0]) + "=" + encodeURIComponent(query[keys[0]]);
    for (let index = 1; index < keys.length; ++index) {
        const value = encodeURIComponent(query[keys[index]]);
        url += "&" + getQuery(keys[index]) + "=" + value;
    }
    return url;
};

export const getQuery = (query) => {
    return NAVIGATION[getLanguage()][QUERY][query];
};

//
//
//
export const createRoutes = (history) => (
    <Router history={history}>
        <App>
            <Switch>
                {
                    getRouteObjects().map(page =>
                        <Route key={page.id}
                               path={page.link}
                               component={page.component}
                               exact={page.exact}
                        />
                    )
                }
                <Route path="*" component={PageNotFound}/>
            </Switch>
        </App>
    </Router>
);


function getRouteObjects() {
    const routes = [];
    const languages = Object.keys(NAVIGATION);
    getRegistered().forEach((entry) => {
        if (entry.url === undefined || entry.component === undefined) {
            return;
        }
        languages.forEach((language) => {
            const url = NAVIGATION[language][PAGE][entry.url];
            // Some browsers (IE, Edge) does not escape national characters,
            // while others (Firefox, Chrome) do, therefore we need to be ready
            // to handle both variants. So we add escaped version for all
            // but english.
            if (language !== "en") {
                routes.push({
                    "id": entry.name + "-" + language,
                    "link": URL_PREFIX +"/" + encodeURI(url),
                    "component": entry.component,
                    "exact" : false
                });
            }
            routes.push({
                "id": entry.name + "-" + language,
                "link": URL_PREFIX +"/" + (url),
                "component": entry.component,
                "exact" : false
            });
        });
        if (entry.homepage) {
            routes.push({
                "id": "homepage",
                "link": URL_PREFIX + "/",
                "component": entry.component,
                "exact" : true
            });
        }

    });
    return routes;
}

export function translate(value, type, targetLanguage) {
    for (let language in NAVIGATION) {
        const value_map = NAVIGATION[language][type];
        for (let key in value_map) {
            if (value === value_map[key]) {
                return NAVIGATION[targetLanguage][type][key];
            }
        }
    }
}

export function getLanguageForUrl(value) {
    for (let language in NAVIGATION) {
        const value_map = NAVIGATION[language][PAGE];
        for (let key in value_map) {
            if (value === value_map[key]) {
                return language;
            }
        }
    }
    return getDefaultLanguage();
}