// import axios from "axios";
import {ApiNkod} from "../api-nkod/api-nkod";

import {FetchDatasetResponse} from "../data-api/api-dataset";

declare var CONFIGURATION: {

  datasetSimilarityEndpoint: string;

}

export async function fetchSimilar(dataset: string): Promise<string[]> {
  const url = CONFIGURATION.datasetSimilarityEndpoint
    .replace("${dataset}", encodeURIComponent(dataset));
  // return (await axios.get(url)).data.data;
  return Promise.resolve([
    "https://data.gov.cz/zdroj/datové-sady/00551023/861588425/97cc2f93fb68734595e42f93f77c8021",
    "https://data.gov.cz/zdroj/datové-sady/https---dataor.justice.cz-api-3-action-package_show-id-as-actual-brno-2005"
  ]);
}

export async function fetchDataset(
  language:string, dataset: string
): Promise<FetchDatasetResponse> {
  const apiNkod = new ApiNkod();
  return await apiNkod.fetchDataset(language, dataset);
}
