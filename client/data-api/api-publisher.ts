import {Publisher} from "../data-model/publisher";
import {Label} from "./api-label";

export interface ApiPublisher {

  fetchPublisherList(language: string): Promise<FetchPublisherListResponse>;

}

export interface FetchPublisherListResponse {

  publishers: Publisher[];

  labels: Label[];

}
