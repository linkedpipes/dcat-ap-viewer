import {fetchJson} from "app-services/http-request";

export function fetchKeywordsByPublishers(lang) {
  const url = "./api/v1/resource/static?id=keywords_by_publishers" + "_" + lang;
  return fetchJson(url).then((response) => {
    return response.json.json;
  });
}