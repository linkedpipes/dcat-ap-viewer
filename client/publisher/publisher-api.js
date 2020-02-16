import {fetchJson} from "app-services/http-request";
import {parseFacetFromSolrResponse} from "@/app-services/solr";
import {graph, triples} from "@/app-services/jsonld";
import {NKOD} from "@/app-services/vocabulary";

export function fetchPublishersFromSolr() {
  const url = constructQueryUrl();
  return fetchJson(url).then((entry) => {
    return parseFacetFromSolrResponse(entry.json, "publisher", false);
  });
}

function constructQueryUrl() {
  return "./api/v1/solr/query?" +
        "facet.field=publisher&" +
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
    .map((entity) => triples.id(entity));
}