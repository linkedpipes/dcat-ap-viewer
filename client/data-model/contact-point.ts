import {Literal} from "./primitives";

export interface ContactPoint {

  iri: string;

  title?: Literal;

  email?: string;

}