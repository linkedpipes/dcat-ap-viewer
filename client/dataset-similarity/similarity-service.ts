import axios from "axios";
import {ApiNkod} from "../api-nkod/api-nkod";

import {FetchDatasetResponse} from "../data-api/api-dataset";

declare var CONFIGURATION: {

  datasetSimilarityEndpoint: string;

}

export async function fetchSimilar(dataset: string): Promise<{
  iri: string;
}[][]> {
  const url = CONFIGURATION.datasetSimilarityEndpoint
    .replace("${dataset}", encodeURIComponent(dataset)) ;
  // Wrap items in another array.
  return  (await axios.get(url)).data.data.map((item :any) => [item]);
}

export async function fetchSimilarGrouped(dataset: string): Promise<{
  iri: string;
}[][]> {
  const url = CONFIGURATION.datasetSimilarityEndpoint
    .replace("${dataset}", encodeURIComponent(dataset)) + "?group=0.0";
  return (await axios.get(url)).data.data;
}

export async function fetchDataset(
  language: string, dataset: string
): Promise<FetchDatasetResponse> {
  const apiNkod = new ApiNkod();
  return await apiNkod.fetchDataset(language, dataset);
}