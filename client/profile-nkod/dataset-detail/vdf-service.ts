import {useState, useEffect} from "react";
import {fetchJson} from "../../api-nkod/fetch";
import {getApi} from "../../viewer-react/api-instance";
import {Literal} from "../../data-model/primitives";

export function useDatasetVdf(language: string, dataset: string) {
  const [usedAsCodelistBy, setUsedAsCodelistBy] = useState([] as string[]);
  const [usingCodelists, setUsingCodelists] = useState([] as string[]);
  const [datasets, setDatasets] = useState({} as Record<string, DatasetListItem>);

  useEffect(() => {
    let url = "./api/v2/vdf/dataset?iri=" + encodeURIComponent(dataset);
    fetchJson(url).then((data: any) => {
      setUsedAsCodelistBy(data["isUsedAsCodelistBy"] ?? []);
      setUsingCodelists(data["usingCodelists"] ?? []);
    });
  }, [setUsedAsCodelistBy, setUsingCodelists]);

  useEffect(() => {
    const datasetToFetch = [...usedAsCodelistBy, ...usingCodelists]
      .filter(iri => datasets[iri] === undefined);

    if (datasetToFetch.length === 0) {
      return;
    }

    const datasetIri = datasetToFetch[0];
    fetchDatasetDetail(language, datasetIri).then(dataset => {
      setDatasets({...datasets, [datasetIri]: dataset} as any);
    });

  }, [usedAsCodelistBy, usingCodelists, datasets, setDatasets]);

  return [usedAsCodelistBy, usingCodelists, datasets];
}

interface DatasetListItem {

  iri: string;

  title?: Literal;

  description?: Literal;

}

async function fetchDatasetDetail(
  language: string, iri: string
): Promise<DatasetListItem | null> {
  const response = await getApi().fetchDataset(language, iri);
  return {
    "iri" :iri,
    "title": response.dataset.title,
    "description": response.dataset.description,
  };
}
