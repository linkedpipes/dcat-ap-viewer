import {fetchJson} from "app-services/http-request";

export function fetchPublishers() {
    const url = constructQueryUrl();
    return fetchJson(url).then((entry) => {
        return parseResponse(entry.json);
    });
}

function constructQueryUrl() {
    const url = "api/v1/solr/query?" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1&" +
        "rows=0";
    return url;
}

function parseResponse(pyload) {
    const publisher = pyload["facet_counts"]["facet_fields"]["publisherName"];
    const output = [];
    for (let index = 0; index < publisher.length; index += 2) {
        output.push({
            "@id": publisher[index],
            "label": publisher[index],
            "count": publisher[index + 1]
        });
    }
    return output;
}
