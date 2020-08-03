import {Api, DatasetListQuery, FlatJsonLdPromise} from "./api-interface";
import {fetchJson, ErrorType} from "./fetch-api";
import {flatten} from "jsonld";

class HttpApi implements Api {

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

  fetchDatasetList(language: string, query: DatasetListQuery)
    : FlatJsonLdPromise {
    let params = datasetQueryFiltersToUrlParams(language, query);
    params += "&offset=" + query.offset;
    params += "&limit=" + query.limit;
    if (query.sort !== undefined) {
      params += "&sort=" + encodeURIComponent(query.sort);
    }
    return fetchJsonLd("./api/v2/dataset?" + params);
  }

  fetchDatasetTypeahead(
    language: string, query: DatasetListQuery, text: string)
    : FlatJsonLdPromise {
    //
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

/**
 * Fetch JSONLD and flatten it before it is passed to the rest
 * of the application.
 */
function fetchJsonLd(url: string): FlatJsonLdPromise {
  return new Promise((accept, reject) => {
    fetchJson(url).then(response => {
      if (response.data) {
        flatten(response.data)
          // @ts-ignore
          .then(accept)
          .catch(error => {
            reject({
              ...error,
              "code": ErrorType.PARSE,
            });
          });
      } else {
        reject({"code": response.error});
      }
    }).catch(error => {
      reject(error);
    });
  });
}

function datasetQueryFiltersToUrlParams(
  language: string, query: DatasetListQuery) {
  let params: string = "language=" + encodeURIComponent(language);
  params += query.search ? "&text=" + encodeURIComponent(query.search) : "";
  params += facetToParams(query.keyword, query.keywordLimit, "keyword");
  params += facetToParams(query.publisher, query.publisherLimit, "publisher");
  params += facetToParams(query.format, query.formatLimit, "format");
  params += facetToParams(query.theme, query.themeLimit, "theme");
  params += query.temporalStart ?
    ("&temporal-start=" + query.temporalStart) : "";
  params += query.temporalEnd ?
    ("&temporal-end=" + query.temporalEnd) : "";
  return params;
}

function facetToParams(values: string[], limit: number, name: string): string {
  let result = "&" + name + "Limit=" + String(limit);
  for (let value of values) {
    result += "&" + name + "=" + encodeURIComponent(value);
  }
  return result;
}

export function createServerHttpApi(): Api {
  return new HttpApi();
}

