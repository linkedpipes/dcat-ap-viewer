import {Catalog} from "../data-model/catalog";
import {Label} from "./api-label";

export interface ApiCatalog {

  fetchCatalogList(language: string): Promise<FetchCatalogListResponse>;

}

export interface FetchCatalogListResponse {

  catalogs: Catalog[];

  labels: Label[];

}
