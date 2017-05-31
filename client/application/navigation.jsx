import React from "react";
import App from "./app";
import {Route, IndexRoute} from "react-router";
import {DatasetListView} from "../dataset/list/dataset-list-view";
import {DatasetDetailView} from "../dataset/detail/dataset-detail-view";
import {OrganisationListView} from "../organisation/list/organisation-list-view";

// Define application navigation properties
export const DATASET_LIST_URL = "DATASET_LIST";
export const DATASET_DETAIL_URL = "DATASET_DETAIL";
export const ORGANISATION_LIST_URL = "ORGANISATION_LIST";
export const PUBLISHER_QUERY = "PUBLISHER_QUERY";
export const KEYWORDS_QUERY = "KEYWORDS_QUERY";
export const FORMAT_QUERY = "FORMAT_QUERY";
export const STRING_QUERY = "STRING_QUERY";
export const DATASET_QUERY = "DATASET_QUERY";
export const PAGE_QUERY = "PAGE_QUERY";

// TODO Extract to a new file as a mapping
const COMPONENTS = {};
COMPONENTS[DATASET_LIST_URL] = DatasetListView;
COMPONENTS[DATASET_DETAIL_URL] = DatasetDetailView;
COMPONENTS[ORGANISATION_LIST_URL] = OrganisationListView;

const PAGE = "PAGE";
const QUERY = "QUERY";
const NAVIGATION = {
    "cs": {},
    "en": {}
};

// TODO Extract to a new file as a language based navigation
NAVIGATION["cs"][PAGE] = {};
NAVIGATION["cs"][PAGE][DATASET_LIST_URL] = "datové-sady";
NAVIGATION["cs"][PAGE][DATASET_DETAIL_URL] = "datová-sada";
NAVIGATION["cs"][PAGE][ORGANISATION_LIST_URL] = "poskytovatelé";
NAVIGATION["cs"][QUERY] = {};
NAVIGATION["cs"][QUERY][PUBLISHER_QUERY] = "poskytovatel";
NAVIGATION["cs"][QUERY][KEYWORDS_QUERY] = "klíčová slova";
NAVIGATION["cs"][QUERY][FORMAT_QUERY] = "formáty";
NAVIGATION["cs"][QUERY][STRING_QUERY] = "dotaz";
NAVIGATION["cs"][QUERY][DATASET_QUERY] = "iri";
NAVIGATION["cs"][QUERY][PAGE_QUERY] = "stránka";

NAVIGATION["en"][PAGE] = {};
NAVIGATION["en"][PAGE][DATASET_LIST_URL] = "datasets";
NAVIGATION["en"][PAGE][DATASET_DETAIL_URL] = "dataset";
NAVIGATION["en"][PAGE][ORGANISATION_LIST_URL] = "organisations";
NAVIGATION["en"][QUERY] = {};
NAVIGATION["en"][QUERY][PUBLISHER_QUERY] = "publisher";
NAVIGATION["en"][QUERY][KEYWORDS_QUERY] = "keywords";
NAVIGATION["en"][QUERY][FORMAT_QUERY] = "formats";
NAVIGATION["en"][QUERY][STRING_QUERY] = "query";
NAVIGATION["en"][QUERY][DATASET_QUERY] = "iri";
NAVIGATION["en"][QUERY][PAGE_QUERY] = "page";


function getLanguage() {
    return "cs";
}

export const getUrl = (page, query) => {
    let url = "/" + encodeURI(NAVIGATION[getLanguage()][PAGE][page]);
    if (query === undefined) {
        return url;
    }
    const keys = Object.keys(query);
    url += "?" + getQuery(keys[0]) + "=" + encodeURIComponent(query[keys[0]]);
    for (let index = 1; index < keys.length; ++index) {
        const value = encodeURIComponent(query[keys[index]])
        url += "&" + getQuery(keys[index]) + "=" + value;
    }
    return url;
};

export const getQuery = (query) => {
    return NAVIGATION[getLanguage()][QUERY][query];
};

export const createRoutes = () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={DatasetListView}/>
            {
                getRouteObjects().map(page =>
                    <Route path={page.link}
                           component={page.component}
                           key={page.id}/>
                )
            }
        </Route>
    );
};

function getRouteObjects() {
    const routes = [];
    Object.keys(NAVIGATION).map(function (language) {
        Object.keys(NAVIGATION[language][PAGE]).map(function (component) {
            routes.push({
                "id": component + "-" + language,
                "link": encodeURI(NAVIGATION[language][PAGE][component]),
                "component": COMPONENTS[component]
            });
        });
    });
    return routes;
}

