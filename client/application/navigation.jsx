import React from "react";
import {App} from "./app";
import {Route, IndexRoute} from "react-router";
import {DatasetListView} from "../dataset/list/dataset-list-view";
import {DatasetDetailView} from "../dataset/detail/dataset-detail-view";
import {OrganisationListView} from "../organisation/list/organisation-list-view";
import {KeywordsViewView} from "../keyword/tagcloud/keyword-tagloud-view";
import {PageNotFound} from "../system/page-not-found";

// Define application navigation properties
export const DATASET_LIST_URL = "DATASET_LIST";
export const DATASET_DETAIL_URL = "DATASET_DETAIL";
export const ORGANISATION_LIST_URL = "ORGANISATION_LIST";
export const KEYWORDS_LIST_URL = "KEYWORDS_LIST_URL";
export const PUBLISHER_QUERY = "PUBLISHER_QUERY";
export const KEYWORDS_QUERY = "KEYWORDS_QUERY";
export const FORMAT_QUERY = "FORMAT_QUERY";
export const STRING_QUERY = "STRING_QUERY";
export const DATASET_QUERY = "DATASET_QUERY";
export const PAGE_QUERY = "PAGE_QUERY";
export const SORT_QUERY = "SORT_QUERY";
export const PAGE_SIZE_QUERY = "PAGE_SIZE_QUERY";
export const TEMPORAL_START = "TEMPORAL_START";
export const TEMPORAL_END = "TEMPORAL_END";

// TODO Extract to a new file as a mapping
const COMPONENTS = {};
COMPONENTS[DATASET_LIST_URL] = DatasetListView;
COMPONENTS[DATASET_DETAIL_URL] = DatasetDetailView;
COMPONENTS[ORGANISATION_LIST_URL] = OrganisationListView;
COMPONENTS[KEYWORDS_LIST_URL] = KeywordsViewView;

const PAGE = "PAGE";
const QUERY = "QUERY";
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
NAVIGATION["cs"][QUERY] = {};
NAVIGATION["cs"][QUERY][PUBLISHER_QUERY] = "poskytovatel";
NAVIGATION["cs"][QUERY][KEYWORDS_QUERY] = "klíčová slova";
NAVIGATION["cs"][QUERY][FORMAT_QUERY] = "formáty";
NAVIGATION["cs"][QUERY][STRING_QUERY] = "dotaz";
NAVIGATION["cs"][QUERY][DATASET_QUERY] = "iri";
NAVIGATION["cs"][QUERY][PAGE_QUERY] = "stránka";
NAVIGATION["cs"][QUERY][SORT_QUERY] = "pořadí";
NAVIGATION["cs"][QUERY][PAGE_SIZE_QUERY] = "velikost stránky";
NAVIGATION["cs"][QUERY][TEMPORAL_START] = "temporal start";
NAVIGATION["cs"][QUERY][TEMPORAL_END] = "temporal end";

NAVIGATION["en"][PAGE] = {};
NAVIGATION["en"][PAGE][DATASET_LIST_URL] = "datasets";
NAVIGATION["en"][PAGE][DATASET_DETAIL_URL] = "dataset";
NAVIGATION["en"][PAGE][ORGANISATION_LIST_URL] = "publishers";
NAVIGATION["en"][PAGE][KEYWORDS_LIST_URL] = "keywords";
NAVIGATION["en"][QUERY] = {};
NAVIGATION["en"][QUERY][PUBLISHER_QUERY] = "publisher";
NAVIGATION["en"][QUERY][KEYWORDS_QUERY] = "keywords";
NAVIGATION["en"][QUERY][FORMAT_QUERY] = "formats";
NAVIGATION["en"][QUERY][STRING_QUERY] = "query";
NAVIGATION["en"][QUERY][DATASET_QUERY] = "iri";
NAVIGATION["en"][QUERY][PAGE_QUERY] = "page";
NAVIGATION["en"][QUERY][SORT_QUERY] = "sort";
NAVIGATION["en"][QUERY][PAGE_SIZE_QUERY] = "page size";
NAVIGATION["en"][QUERY][TEMPORAL_START] = "temporal start";
NAVIGATION["en"][QUERY][TEMPORAL_END] = "temporal end";

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

function setLanguage(language) {
    activeLanguage = language;
}

//
//
//

export const getUrl = (page, query) => {
    let url = "/" + NAVIGATION[getLanguage()][PAGE][page];
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

export const getQuery = (query) => {
    return NAVIGATION[getLanguage()][QUERY][query];
};

//
//
//

export const createRoutes = () => (
    <Route path="/" component={App}>
        <IndexRoute component={DatasetListView}/>
        {
            getRouteObjects().map(page =>
                <Route path={page.link}
                       component={page.component}
                       key={page.id}/>
            )
        }
        <Route path="*" component={PageNotFound} />
    </Route>
);

function getRouteObjects() {
    const routes = [];
    Object.keys(NAVIGATION).map(function (language) {
        Object.keys(NAVIGATION[language][PAGE]).map(function (component) {
            // Some browsers (IE, Edge) does not escape national characters,
            // while others (Firefox, Chrome) do, therefore we need to be ready
            // to handle both variants. So we add escaped version for all
            // but english.
            if (language !== "en") {
                routes.push({
                    "id": component + "-" + language,
                    "link": encodeURI(NAVIGATION[language][PAGE][component]),
                    "component": COMPONENTS[component]
                });
            }
            routes.push({
                "id": component + "-" + language,
                "link": (NAVIGATION[language][PAGE][component]),
                "component": COMPONENTS[component]
            });
        });
    });
    return routes;
}

//
//
//

function translate(value, type, targetLanguage) {
    for (let language in NAVIGATION) {
        const value_map = NAVIGATION[language][type];
        for (let key in value_map) {
            if (value === value_map[key]) {
                return NAVIGATION[targetLanguage][type][key];
            }
        }
    }
}

function getLanguageForUrl(value) {
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

/**
 * Top level component, does not modify the content.
 * Set the language based on the URL, browser options or perform
 * redirect.
 */
export class LanguageReRouter extends React.Component {

    componentWillMount() {
        const lang = this.props.location.query.lang;
        if (lang === undefined) {
            this.handleNoLanguageQuery();
        } else {
            this.handleLanguageQuery();
        }
    }

    handleNoLanguageQuery() {
        const location = this.props.location;
        const pathname = decodeURI(location.pathname.substring(1));
        if (pathname === "") {
            this.redirectToHome();
        } else {
            const pathLanguage = getLanguageForUrl(pathname);
            setLanguage(pathLanguage);
            // Dataset list parse query from URL, as we change the language we
            // need to update this - in order to trigger the update
            // we change the router.
            // TODO Solve this in other way which does not require redraw.
            this.props.router.push({
                "pathname": location.pathname,
                "query": location.query
            });
        }
    }

    redirectToHome() {
        this.props.router.push({
            "pathname": getUrl(DATASET_LIST_URL),
            "query": location.query
        });
    }

    handleLanguageQuery() {
        const location = this.props.location;
        const pathname = decodeURI(location.pathname.substring(1));
        const pathLanguage = getLanguageForUrl(pathname);
        const queryLanguage = location.query.lang;
        if (pathLanguage === queryLanguage) {
            this.handleLanguagesAreSame(location, queryLanguage);
        } else {
            this.handleLanguagesAreDifferent(location, pathname, queryLanguage);
        }
    }

    handleLanguagesAreSame(location, targetLanguage) {
        const path = location.pathname;
        const query = {
            ...location.query,
            "lang": undefined
        };
        setLanguage(targetLanguage);
        this.props.router.push({
            "pathname": path,
            "query": query
        });
    }

    handleLanguagesAreDifferent(location, pathname, targetLanguage) {
        let path = this.translatePathName(pathname, targetLanguage);
        const query = this.translateQuery(location, targetLanguage);
        setLanguage(targetLanguage);
        this.props.router.push({
            "pathname": path,
            "query": query
        });
    }

    translatePathName(pathname, targetLanguage) {
        const path = translate(decodeURI(pathname), PAGE, targetLanguage);
        // Stay on the same site if the translation is missing.
        if (path === undefined) {
            return "/" + pathname;
        } else {
            return encodeURI(path);
        }
    }

    translateQuery(location, targetLanguage) {
        const query = {};
        for (let param in location.query) {
            if (param === "lang") {
                continue;
            }
            let translated = translate(param, QUERY, targetLanguage);
            if (translated === undefined) {
                translated = param;
            }
            query[translated] = location.query[param];

        }
        return query;
    }

    render() {
        return this.props.children;
    }

}
