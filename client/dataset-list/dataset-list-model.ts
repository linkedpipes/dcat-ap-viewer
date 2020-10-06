import {Literal} from "../jsonld";

export interface DatasetList {
  datasets: DatasetListItem[];
  datasetsCount: number;
  themes: Facet[];
  themesCount: number;
  keywords: Facet[];
  keywordsCount: number;
  publishers: Facet[];
  publishersCount: number;
  formats: Facet[];
  formatsCount: number;
}

export class DatasetListItem {
  iri: string;
  accrualPeriodicity?: string;
  description?: Literal[];
  formats: string[] = [];
  issued?: Date;
  modified?: Date;
  publisher?: string;
  spatial?: string;
  keywords: Literal[] = [];
  themes: string[] = [];
  order: number;

  constructor(iri: string, order: number) {
    this.iri = iri;
    this.order = order;
  }

}

export interface Facet {
  iri: string;
  count: number;
  // Used to identify the facet for purpose of query.
  code: string;
  color?: string;
}

/**
 * Holds status of the dataset view, that is not saved into URL.
 */
export interface DatasetListViewState {
  publisherLimit: number;
  themeLimit: number;
  keywordLimit: number;
  formatLimit: number;
  showMore: number;
}

/**
 * Holds status of dataset view, that is saved in the URL.
 */
export interface DatasetListViewQuery {
  page: number;
  pageSize: number;
  view: number;
  sort?: string;
  search?: string;
  publisher: string[];
  theme: string[];
  keyword: string[];
  format: string[];
  temporalStart?: string;
  temporalEnd?: string;
  isPartOf: string[];
}
