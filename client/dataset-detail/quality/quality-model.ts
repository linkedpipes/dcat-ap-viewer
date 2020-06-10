import {Literal} from "../../jsonld";

export interface QualityMeasure {
  value: boolean;
  lastCheck?: string;
  measureOf?: string;
  note: Literal[];
}

export interface QualityMeasures {

  getMeasure(measureOf: string): QualityMeasure | null;

}

