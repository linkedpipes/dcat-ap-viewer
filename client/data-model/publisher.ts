import {Literal} from "./primitives";

export interface Publisher {

  iri: string;

  title?: Literal;

  datasetCount?: number;

}
