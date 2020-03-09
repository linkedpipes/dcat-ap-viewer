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

  fetchDatasetFacets(language: string, name: string, amount: number)
    : FlatJsonLdPromise {
    //
    let url = "./api/v2/dataset/facet?";
    url += "facet=" + encodeURIComponent(name) + "&";
    url += "limit=" + amount;
    if (language) {
      url += "&language=" + language;
    }
    return fetchJsonLd(url);
  }

  fetchDatasetList(language: string, query: DatasetListQuery)
    : FlatJsonLdPromise {
    const params = datasetQueryToUrlParams(language, query);
    return fetchJsonLd("./api/v2/dataset" + params);
  }

  fetchDatasetTypeahead(
    language: string, text: string, query: DatasetListQuery)
    : FlatJsonLdPromise {
    //
    query.search = text;
    const params = datasetQueryToUrlParams(language, query);
    return fetchJsonLd("./api/v2/dataset/typeahead" + params);
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
          .then(flatJsonLd => {
            accept(flatJsonLd);
          })
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

function datasetQueryToUrlParams(language: string, query: DatasetListQuery) {
  let params: string = "?language=" + encodeURIComponent(language);
  if (query.page && query.pageSize) {
    params += "&offset=" + (query.page * query.pageSize);
    params += "&limit=" + query.pageSize;
  }
  params += query.search ? "&text=" + encodeURIComponent(query.search) : "";
  params += query.sort ? "&sort=" + encodeURIComponent(query.sort) : "";
  params += stringArrayToArgs(query.keyword, "keyword");
  params += stringArrayToArgs(query.publisher, "publisher");
  params += stringArrayToArgs(query.format, "format");
  params += stringArrayToArgs(query.theme, "theme");
  params += query.temporalStart ?
    ("&temporal-start=" + query.temporalStart) : "";
  params += query.temporalEnd ?
    ("&temporal-end=" + query.temporalEnd) : "";
  return params;
}

function stringArrayToArgs(values: string[] | undefined, name: string): string {
  if (values === undefined) {
    return "";
  }
  let result = "";
  for (let value of values) {
    result += "&" + name + "=" + encodeURIComponent(value);
  }
  return result;
}

export function createServerHttpApi(): Api {
  return new HttpApi();
}

