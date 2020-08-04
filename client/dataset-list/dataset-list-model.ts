import {Literal} from "../jsonld";

export class DatasetList {
  datasets: DatasetListItem[] = [];
  datasetsCount?: number;
  themes: Facet[] = [];
  themesCount?: number;
  keywords: Facet[] = [];
  keywordsCount?: number;
  publishers: Facet[] = [];
  publishersCount?: number;
  formats: Facet[] = [];
  formatsCount?: number;
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
}