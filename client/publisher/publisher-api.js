import {fetchJson} from "app-services/http-request";
import {parseFacetFromSolrResponse} from "@/app-services/solr";

export function fetchPublishersFromSolr() {
    const url = constructQueryUrl();
    return fetchJson(url).then((entry) => {
        return parseFacetFromSolrResponse(entry.json, "publisherName");
    });
}

function constructQueryUrl() {
    const url = "./api/v1/solr/query?" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1&" +
        "rows=0";
    return url;
}