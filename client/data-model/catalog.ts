import {Literal} from "./primitives";

export enum CatalogType {
  DcatApSparql = "DcatApSparql",
  CkanApiLkod = "CkanApiLkod",
  DcatApLkod = "DcatApLkod",
}

export interface Catalog {

  iri: string;

  title?: Literal;

  type: CatalogType;

  endpoint?: string;

  publisher?: string;

  contactName?: Literal;

  contactEmail?: string;

  homepage?: string;

}
