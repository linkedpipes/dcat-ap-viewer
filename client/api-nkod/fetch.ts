import {JsonLdEntity} from "./jsonld";
import {flatten} from "jsonld";

export async function fetchJson(url: string): Promise<object> {
  let response;
  try {
    response = await fetch(url, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
      },
    });
  } catch (error) {
    console.error("Fetch failed:", error);
    throw new Error("Can't fetch data.");
  }
  if (response.ok === false) {
    if (response.status === 404) {
      return {};
    } else {
      throw new Error(`Fetch response code: ${response.status}`);
    }
  }
  try {
    return await response.json();
  } catch (error) {
    console.error("Can't parse JSON.", error);
    throw new Error("Can't parse response as JSON.");
  }
}

export async function fetchJsonLd(url: string): Promise<JsonLdEntity[]> {
  let json = await fetchJson(url);
  let jsonld = await flatten(json as any);
  return jsonld as any;
}
