import {DatasetList, Facet} from "../../data-api/api-dataset";

export interface DatasetListData extends DatasetList {

  loading: boolean;

  updating: boolean;

  failed: boolean;

  isPartOf: Facet[];

}

export interface ExtendedDatasetListQuery {

  page: number;

  pageSize: number;

  showMore: number;

  sort: string;

  search: string;

  publishers: string[];

  publishersLimit: number;

  themes: string[];

  themesLimit: number;

  keywords: string[];

  keywordsLimit: number;

  formats: string[];

  formatsLimit: number;

  temporalStart: string;

  temporalEnd: string;

  isPartOf: string[];

  view: number;

}
