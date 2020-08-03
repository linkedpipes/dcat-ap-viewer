import {JsonLdEntity} from "../jsonld/model";
import {createServerHttpApi} from "./api-server-http";
export type {JsonLdArray} from "jsonld/jsonld-spec";

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

export function areDatasetListQueryEqual(
  left: DatasetListQuery,
  right?: DatasetListQuery): boolean {
  if (right === undefined) {
    return false;
  }
  return left.offset === right.offset
    && left.limit === right.limit
    && left.sort === right.sort
    && left.search === right.search
    && arraysAreEqual(left.publisher, right.publisher)
    && left.publisherLimit === right.publisherLimit
    && arraysAreEqual(left.theme, right.theme)
    && left.themeLimit === right.themeLimit
    && arraysAreEqual(left.keyword, right.keyword)
    && left.keywordLimit === right.keywordLimit
    && arraysAreEqual(left.format, right.format)
    && left.formatLimit === right.formatLimit
    && left.temporalStart === right.temporalStart
    && left.temporalEnd === right.temporalEnd;
}

function arraysAreEqual(left: string[], right?: string[]): boolean {
  if (right === undefined) {
    return false;
  }
  if (left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; ++index) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}
