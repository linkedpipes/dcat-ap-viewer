import {fetchJson} from "app-services/http-request";
import {parseFacetFromSolrResponse} from "@/app-services/solr";
import {graph, triples} from "@/app-services/jsonld";
import {NKOD, FOAF} from "@/app-services/vocabulary";

export function fetchPublishersFromSolr() {
    const url = constructQueryUrl();
    return fetchJson(url).then((entry) => {
        return parseFacetFromSolrResponse(entry.json, "publisherName");
    });
}

function constructQueryUrl() {
    return "./api/v1/solr/query?" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1&" +
        "rows=0";
}

export function fetchPublishersQuality() {
    const url = "./api/v1/resource/quality-publishers";
    return fetchJson(url).then(parsePublisherQualityResponse);
}

function parsePublisherQualityResponse(response) {
    return graph.getAllByType(response.json, NKOD.ExceptionalPublisher)
        .map((entity) => {
            const name = triples.string(entity, FOAF.name);
            if (name["cs"]) {
                return name["cs"][0];
            } else {
                return name[""][0];
            }
        });
}