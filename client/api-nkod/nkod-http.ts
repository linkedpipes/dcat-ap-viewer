import {flatten} from "jsonld";

import {fetchJson} from "./fetch";
import {JsonLdEntity} from "./jsonld";
import {DatasetListQuery} from "../data-api/api-dataset";

export type FlatJsonLdPromise = Promise<JsonLdEntity[]>;

export class NkodHttp {

  fetchCatalogList(language: string): FlatJsonLdPromise {
    let url = "./api/v2/catalog?";
    if (language) {
      url += "language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchDataset(language: string, iri: string): FlatJsonLdPromise {
    let url = "./api/v2/dataset/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchDatasetList(
    language: string, query: DatasetListQuery
  ): FlatJsonLdPromise {
    let params = datasetQueryFiltersToUrlParams(language, query);
    params += "&offset=" + query.offset;
    params += "&limit=" + query.limit;
    if (query.sort !== undefined) {
      params += "&sort=" + encodeURIComponent(query.sort);
    }
    return fetchJsonLd("./api/v2/dataset?" + params);
  }

  fetchDatasetTypeahead(
    language: string, query: DatasetListQuery, text: string
  ): FlatJsonLdPromise {
    query.search = text;
    const params = datasetQueryFiltersToUrlParams(language, query);
    return fetchJsonLd("./api/v2/dataset/typeahead?" + params);
  }

  fetchDistribution(language: string, iri: string): FlatJsonLdPromise {
    let url = "./api/v2/distribution/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchInitialData(language: string): FlatJsonLdPromise {
    let url = "./api/v2/init-data?";
    if (language) {
      url += "language=" + language
    }
    return fetchJsonLd(url);
  }

  fetchKeywordList(language: string): FlatJsonLdPromise {
    let url = "./api/v2/keyword";
    if (language) {
      url += "?language=" + language
    }
    return fetchJsonLd(url);
  }

  fetchLabel(language: string, iri: string): FlatJsonLdPromise {
    let url = "./api/v2/label/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchPublisherList(language: string): FlatJsonLdPromise {
    let url = "./api/v2/publisher";
    if (language) {
      url += "?language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchQualityDataset(language: string, iri: string): FlatJsonLdPromise {
    let url = "./api/v2/quality/dataset?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchQualityDistribution(language: string, iri: string): FlatJsonLdPromise {
    let url = "./api/v2/quality/distribution?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchQualityPublisherList(language: string): FlatJsonLdPromise {
    let url = "./api/v2/quality/publishers";
    if (language) {
      url += "?language=" + language;
    }
    return fetchJsonLd(url);
  }

}

function fetchJsonLd(url: string): FlatJsonLdPromise {
  return new Promise((accept, reject) => {
    fetchJson(url).then(response => {
      flatten(response)
        // @ts-ignore
        .then(accept)
        .catch(reject);
    }).catch(error => {
      reject(error);
    });
  });
}

function datasetQueryFiltersToUrlParams(
  language: string, query: DatasetListQuery) {
  let params: string = "language=" + encodeURIComponent(language);
  params += query.search ? "&text=" + encodeURIComponent(query.search) : "";
  params += facetToParams(query.keywords, query.keywordsLimit, "keyword");
  params += facetToParams(query.publishers, query.publishersLimit, "publisher");
  params += facetToParams(query.fileTypes, query.fileTypesLimit, "format");
  params += facetToParams(query.themes, query.themesLimit, "theme");
  params += query.temporalStart ?
    ("&temporal-start=" + query.temporalStart) : "";
  params += query.temporalEnd ?
    ("&temporal-end=" + query.temporalEnd) : "";
  params += query.isPartOf ? facetToParams(query.isPartOf, 0, "isPartOf") : "";
  return params;
}

function facetToParams(values: string[], limit: number, name: string): string {
  let result = "&" + name + "Limit=" + String(limit);
  for (let value of values) {
    result += "&" + name + "=" + encodeURIComponent(value);
  }
  return result;
}
