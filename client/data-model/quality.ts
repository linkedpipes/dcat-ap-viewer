import {Literal} from "./primitives";

export interface QualityMeasure {

  iri:string;

  value: boolean;

  lastCheck?: string;

  computedOn?: string,

  measureOf?: string;

  note?: Literal;

}

/**
 * Container quality measures.
 */
export class QualityMeasures {

  measures: QualityMeasure[];

  constructor(measures: QualityMeasure[]) {
    this.measures = measures;
  }

  public getMeasure(measureOf: string): QualityMeasure | undefined {
    for (const measure of this.measures) {
      if (measure.measureOf === measureOf) {
        return measure;
      }
    }
    return undefined;
  }

}
