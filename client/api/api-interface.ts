import {JsonLdEntity} from "../jsonld/model";
import {createServerHttpApi} from "./api-server-http";

export interface DatasetListQuery {
  search?:string;
  publisher: string[];
  theme: string[];
  keyword: string[];
  format: string[];
  page: number;
  pageSize: number;
  sort: string;
  temporalStart?: string;
  temporalEnd?: string;
}

export type FlatJsonLdPromise = Promise<{ jsonld?: JsonLdEntity[] }>;

export interface Api {

  fetchDatasetList(language: string, query: DatasetListQuery)
    : FlatJsonLdPromise;

  fetchDataset(language: string, iri: string): FlatJsonLdPromise;

  fetchDatasetTypeahead(
    language: string, text: string, query: DatasetListQuery): FlatJsonLdPromise;

  fetchDatasetFacets(language: string, name: string, amount: number)
    : FlatJsonLdPromise;

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
