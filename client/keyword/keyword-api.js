import {fetchJson} from "app-services/http-request";

export function fetchKeywordsByPublishers() {
    const url = "./api/v1/resource/static?id=keywords_by_publishers";
    return fetchJson(url).then((response) => {
        return response.json.json;
    });
}