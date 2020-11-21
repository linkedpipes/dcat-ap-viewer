import {Literal} from "../data-model/primitives";

export interface ApiLabel {

  /**
   * As optimization we can fetch multiple labels on the start to save
   * later requests.
   */
  fetchInitialLabels(language: string): Promise<FetchLabelResponse>;

  fetchLabel(language: string, iri: string): Promise<FetchLabelResponse>;

  fetchCodeListLabel(
    language: string, iri: string
  ): Promise<FetchLabelResponse>;

  fetchDatasetLabel(language: string, iri: string): Promise<FetchLabelResponse>;

}

export interface FetchLabelResponse {

  labels: Label[];

}

export interface Label {

  iri: string;

  value: Literal;

}
