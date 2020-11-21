import {QualityMeasures} from "../data-model/quality";

export interface ApiQuality {

  fetchQuality(
    language: string, iri: string
  ): Promise<QualityMeasures>;

}
