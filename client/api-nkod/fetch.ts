import {JsonLdEntity} from "./jsonld";
import {flatten} from "jsonld";

export class ResponseIsNotOk extends Error {

  public code: number;

  constructor(code: number) {
    super(`Fetch response code: ${code}`);
    this.code = code;
  }

  public isNotFound() {
    return this.code === 404;
  }

}

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
    throw new ResponseIsNotOk(response.status);
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

/**
 * Return empty array on status code 404.
 */
export async function fetchJsonLdIgnoreNotFound(
  url: string): Promise<JsonLdEntity[]> {
  try {
    return await fetchJsonLd(url);
  } catch (error) {
    if (error instanceof ResponseIsNotOk
      && (error as ResponseIsNotOk).isNotFound()) {
      return [];
    } else {
      throw error;
    }
  }
}