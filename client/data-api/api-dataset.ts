import {Literal} from "../data-model/primitives";
import {NkodDataset} from "../data-model/dataset";
import {NkodDistribution, NkodDataService} from "../data-model/distribution";
import {Publisher} from "../data-model/publisher";
import {Label} from "./api-label";

export interface ApiDataset {

  fetchDataset(language: string, iri: string): Promise<FetchDatasetResponse>;

  fetchDatasetList(
    language: string, query: DatasetListQuery
  ): Promise<FetchDatasetListResponse>;

  fetchDatasetsTypeahead(
    language: string, query: DatasetListQuery, typeahead: string
  ): Promise<TypeaheadDataset[]>;

}

export interface FetchDatasetResponse {

  dataset: NkodDataset;

  distributions: (NkodDistribution | NkodDataService)[];

  labels: Label[];

  publishers: Publisher[];

}

export interface FetchDatasetListResponse {

  datasets: DatasetList;

  labels: Label[];

}

export interface DatasetList {

  datasets: DatasetListItem[];

  datasetsCount: number;

  themes: Facet[];

  themesCount: number;

  keywords: Facet[];

  keywordsCount: number;

  publishers: Facet[];

  publishersCount: number;

  fileTypes: Facet[];

  fileTypesCount: number;

  dataServiceTypes: Facet[];

  dataServiceTypesCount: number;

}

export interface DatasetListItem {

  iri: string;

  title?: Literal;

  accrualPeriodicity?: string;

  description?: Literal;

  fileTypes: string[];

  dataServiceTypes: string[];

  issued?: Date;

  modified?: Date;

  publisher?: string;

  spatial: string[];

  keywords: Literal[];

  themes: string[];

  order: number;

  isPartOf?: string;

}

export interface Facet {

  iri: string;

  title?: Literal;

  count: number;

  color?: string;

  /**
   * Use this value in the query for datasets.
   */
  queryCode: string;

}

export interface DatasetListQuery {

  /**
   * Dataset.
   */
  offset: number;

  /**
   * Dataset.
   */
  limit: number;

  sort: string;

  search: string;

  publishers: string[];

  publishersLimit: number;

  themes: string[];

  themesLimit: number;

  keywords: string[];

  keywordsLimit: number;

  fileTypes: string[];

  fileTypesLimit: number;

  dataServiceTypes: string[];

  dataServiceTypesLimit: number;

  temporalStart: string;

  temporalEnd: string;

  isPartOf: string[];

  isVdfPublicData: boolean;

  isVdfCodelist: boolean;

}

export interface TypeaheadDataset {

  iri: string;

  title: string;

}
