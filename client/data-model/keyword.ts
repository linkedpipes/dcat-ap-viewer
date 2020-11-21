import {Literal} from "./primitives";

export interface Keyword {

  /**
   * Identification for query.
   */
  code: string;

  title: Literal;

  usedByPublisherCount: number;

}
