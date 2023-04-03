import {DatasetList, Facet} from "../../data-api/api-dataset";

export interface DatasetListData extends DatasetList {

  loading: boolean;

  updating: boolean;

  failed: boolean;

  isPartOf: Facet[];

}

export type InvalidQueryReport  = {

  name: string;

  value: unknown;

}[];

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

  containsService: boolean;

  isVdfPublicData: boolean;

  isVdfCodelist: boolean;

  /**
   * Contains errors related to parsing the query.
   */
  report: InvalidQueryReport;

}
