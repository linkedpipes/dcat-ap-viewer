import {NkodDistribution, NkodDataService,} from "../data-model/distribution";
import {Label} from "./api-label";

export interface ApiDistribution {

  fetchDistribution(
    language: string, iri: string
  ): Promise<FetchDistributionResponse>;

}

export interface FetchDistributionResponse {

  distribution?: NkodDistribution | NkodDataService;

  labels: Label[];

}

