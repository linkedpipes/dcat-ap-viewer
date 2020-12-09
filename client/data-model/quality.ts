import {Literal} from "./primitives";

export interface QualityMeasure {

  iri:string;

  value: boolean;

  lastCheck?: string;

  computedOn?: string,

  measureOf?: string;

  note?: Literal;

  /**
   * As some attributes with quality can have multiple values,
   * we use this co connect quality with particular value.
   */
  object?: string;

}

/**
 * Container quality measures.
 */
export class QualityMeasures {

  measures: QualityMeasure[];

  constructor(measures: QualityMeasure[]) {
    this.measures = measures;
  }

  public getMeasure(
    measureOf: string, object: string | undefined = undefined
  ): QualityMeasure | undefined {
    for (const measure of this.measures) {
      if (measure.measureOf !== measureOf) {
        continue;
      }
      if (object !== undefined  && measure.object !== object) {
        continue;
      }
      return measure;
    }
    return undefined;
  }

}
