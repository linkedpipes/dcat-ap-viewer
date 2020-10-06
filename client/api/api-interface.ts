import {JsonLdEntity} from "../jsonld";
import {createServerHttpApi} from "./api-server-http";
export type {JsonLdArray} from "jsonld/jsonld-spec";

/**
 * Definition of query that can be used to retrieve data.
 */
export interface DatasetListQuery {
  offset: number; // Dataset
  limit: number; // Dataset
  sort?: string;
  search?: string;
  publisher: string[];
  publisherLimit: number;
  theme: string[];
  themeLimit: number;
  keyword: string[];
  keywordLimit: number;
  format: string[];
  formatLimit: number;
  temporalStart?: string;
  temporalEnd?: string;
  isPartOf:string[];
}

export type FlatJsonLdPromise = Promise<JsonLdEntity[]>;

export interface Api {

  fetchDatasetList(language: string, query: DatasetListQuery)
    : FlatJsonLdPromise;

  fetchDataset(language: string, iri: string): FlatJsonLdPromise;

  fetchDatasetTypeahead(
    language: string, query: DatasetListQuery, text: string): FlatJsonLdPromise;

  fetchDistribution(language: string, iri: string): FlatJsonLdPromise;

  fetchPublisherList(language: string): FlatJsonLdPromise;

  fetchKeywordList(language: string): FlatJsonLdPromise;

  fetchLabel(language: string, iri: string): FlatJsonLdPromise;

  fetchInitialData(language: string): FlatJsonLdPromise;

  fetchQualityDistribution(language: string, iri: string): FlatJsonLdPromise;

  fetchQualityDataset(language: string, iri: string): FlatJsonLdPromise;

  fetchQualityPublisherList(language: string): FlatJsonLdPromise;

  fetchCatalogList(language: string): FlatJsonLdPromise;

}

export function createApiImplementation(): Api {
  return createServerHttpApi();
}
