import {
  ApiDataset,
  DatasetListQuery,
  FetchDatasetListResponse,
  FetchDatasetResponse,
  TypeaheadDataset
} from "../data-api/api-dataset";
import {
  ApiPublisher,
  FetchPublisherListResponse
} from "../data-api/api-publisher";
import {ApiCatalog, FetchCatalogListResponse} from "../data-api/api-catalog";
import {
  ApiDistribution,
  FetchDistributionResponse
} from "../data-api/api-distribution";
import {ApiKeyword, FetchKeywordListResponse} from "../data-api/api-keyword";
import {ApiLabel, FetchLabelResponse} from "../data-api/api-label";
import {ApiQuality} from "../data-api/api-quality";
import {fetchJsonLd} from "./fetch";
import {jsonLdToCatalogs} from "./jsonld-to-catalog";
import {jsonLdToLabels} from "./jsonld-to-label";
import {QualityMeasures} from "../data-model/quality";
import jsonLdToDatasetTypeahead, {jsonLdToDataset, jsonLdToDatasetList} from "./jsonld-to-dataset";
import {jsonLdToDistributionOrDataService} from "./jsonld-to-distribution";
import {jsonLdToPublishers} from "./jsonld-to-publisher";
import {jsonLdToQualityMeasures} from "./jsonld-to-quality";
import {jsonLdToKeywords} from "./jsonld-to-keyword";

export class ApiNkod
  implements ApiDataset, ApiPublisher, ApiCatalog, ApiDistribution,
    ApiKeyword, ApiPublisher, ApiLabel, ApiQuality {

  async fetchCatalogList(language: string): Promise<FetchCatalogListResponse> {
    let url = "./api/v2/catalog?";
    if (language) {
      url += "language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return {
      "catalogs": jsonLdToCatalogs(jsonld),
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchCodeListLabel(
    language: string, iri: string
  ): Promise<FetchLabelResponse> {
    let url = "./api/v2/label/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return {
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchDatasetLabel(
    language: string, iri: string
  ): Promise<FetchLabelResponse> {
    let url = "./api/v2/dataset/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return {
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchDataset(
    language: string, iri: string
  ): Promise<FetchDatasetResponse> {
    let url = "./api/v2/dataset/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    const dataset = jsonLdToDataset(jsonld);
    const distributions = [];
    for (const iri of dataset.distributions) {
      const distribution = jsonLdToDistributionOrDataService(jsonld, iri);
      if (distribution === undefined) {
        continue;
      }
      distributions.push(distribution);
    }
    return {
      "dataset": dataset,
      "distributions": distributions,
      "labels": jsonLdToLabels(jsonld),
      "publishers": jsonLdToPublishers(jsonld),
    }
  }

  async fetchDatasetList(
    language: string, query: DatasetListQuery
  ): Promise<FetchDatasetListResponse> {
    let params = datasetQueryFiltersToUrlParams(language, query);
    params += "&offset=" + query.offset;
    params += "&limit=" + query.limit;
    if (query.sort !== undefined) {
      params += "&sort=" + encodeURIComponent(query.sort);
    }
    const url = "./api/v2/dataset?" + params;
    const jsonld = await fetchJsonLd(url);
    return {
      "datasets": jsonLdToDatasetList(jsonld),
      "labels": jsonLdToLabels(jsonld),
    }
  }

  async fetchDatasetsTypeahead(
    language: string, query: DatasetListQuery, typeahead: string
  ): Promise<TypeaheadDataset[]> {
    const params = datasetQueryFiltersToUrlParams(language, {
      ...query,
      "search": typeahead,
    });
    const url = "./api/v2/dataset/typeahead?" + params;
    const jsonld = await fetchJsonLd(url);
    return jsonLdToDatasetTypeahead(jsonld);
  }

  async fetchDistribution(
    language: string, iri: string
  ): Promise<FetchDistributionResponse> {
    let url = "./api/v2/distribution/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return {
      "distribution": jsonLdToDistributionOrDataService(jsonld, iri),
      "labels": jsonLdToLabels(jsonld)
    }
  }

  async fetchKeywordList(
    language: string
  ): Promise<FetchKeywordListResponse> {
    let url = "./api/v2/keyword";
    if (language) {
      url += "?language=" + language
    }
    const jsonld = await fetchJsonLd(url);
    return  {
      "keywords" : jsonLdToKeywords(jsonld),
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchInitialLabels(language: string): Promise<FetchLabelResponse> {
    let url = "./api/v2/init-data?";
    if (language) {
      url += "language=" + language
    }
    const jsonld = await fetchJsonLd(url);
    return  {
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchLabel(
    language: string, iri: string
  ): Promise<FetchLabelResponse> {
    let url = "./api/v2/label/item?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return {
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchPublisherList(
    language: string
  ): Promise<FetchPublisherListResponse> {
    let url = "./api/v2/publisher";
    if (language) {
      url += "?language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return {
      "publishers": jsonLdToPublishers(jsonld),
      "labels": jsonLdToLabels(jsonld),
    };
  }

  async fetchQuality(
    language: string, iri: string
  ): Promise<QualityMeasures> {
    let url = "./api/v2/quality?";
    url += "iri=" + encodeURIComponent(iri);
    if (language) {
      url += "&language=" + language;
    }
    const jsonld = await fetchJsonLd(url);
    return jsonLdToQualityMeasures(jsonld);
  }

}

function datasetQueryFiltersToUrlParams(
  language: string, query: DatasetListQuery
) {
  let params: string = "language=" + encodeURIComponent(language);
  params += query.search ? "&text=" + encodeURIComponent(query.search) : "";
  params += facetToParams(query.keywords, query.keywordsLimit, "keyword");
  params += facetToParams(query.publishers, query.publishersLimit, "publisher");
  params += facetToParams(query.formats, query.formatsLimit, "format");
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
