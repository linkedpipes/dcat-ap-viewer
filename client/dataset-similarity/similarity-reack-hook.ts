import {useEffect, useState} from "react";
import {fetchDataset, fetchSimilar} from "./similarity-service";
import {NkodDataset} from "../data-model/dataset";
import {useDispatch} from "react-redux";
import {LabelActions} from "../viewer-react/service/label";

export function withSimilarDatasets(dataset: string, threshold: string) {
  const [state, setState] = useState<{
    loading: boolean,
    failed: boolean,
    groups: {
      iri: string,
    }[][],
  }>({
    "loading": true,
    "failed": false,
    "groups": [],
  });

  useEffect(() => {
    if (threshold == "") {
      return;
    }
    fetchSimilar(dataset, threshold)
      .then((data) => {
        setState({
          "loading": false,
          "failed": false,
          "groups": data,
        });
      })
      .catch((error) => {
        console.error("Can't load dataset data.", error);
        setState({
          "loading": false,
          "failed": true,
          "groups": [],
        });
      });
    setState({
      "loading": true,
      "failed": false,
      "groups": [],
    });
  }, [dataset, threshold]);

  return state;
}

export function withDatasetDetail(
  language: string, dataset: string | undefined
) {
  const [state, setState] = useState<{
    "loading": boolean,
    "failed": boolean,
    "dataset"?: NkodDataset,
  }>({
    "loading": true,
    "failed": false,
    "dataset": undefined,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataset === undefined) {
      setState({
        "loading": false,
        "failed": false,
        "dataset": undefined,
      });
      return;
    }

    fetchDataset(language, dataset)
      .then((data) => {

        dispatch(LabelActions.fetchLabel.success({
          "labels": data.labels,
        }));

        setState({
          "loading": false,
          "failed": false,
          "dataset": data.dataset,
        });
      })
      .catch((error) => {
        console.error("Can't load dataset data.", error);
        setState({
          "loading": false,
          "failed": true,
        });
      });
    setState({
      "loading": true,
      "failed": false,
    });
  }, [language, dataset]);

  return state;
}
