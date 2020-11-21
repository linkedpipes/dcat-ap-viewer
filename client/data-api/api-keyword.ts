import {Keyword} from "../data-model/keyword";
import {Label} from "./api-label";

export interface ApiKeyword {

  fetchKeywordList(language: string): Promise<FetchKeywordListResponse>;

}

export interface FetchKeywordListResponse {

  keywords: Keyword[];

  labels: Label[];

}
