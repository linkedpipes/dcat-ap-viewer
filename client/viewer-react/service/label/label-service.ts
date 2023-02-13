import {useCallback, useContext} from "react";
import {useDispatch, useSelector} from "../../hooks";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";

import {LabelActions} from "./label-action";
import {labelsSelector, shouldFetchSelector} from "./label-reducer";
import {getApi} from "../../api-instance";
import {NavigationContext} from "../navigation";
import {Literal} from "../../../data-model/primitives";

enum LabelType {
  General = "General",
  Dataset = "Dataset",
}

export function useLabelApi() {
  const dispatch = useDispatch();
  const navigation = useContext(NavigationContext);
  const labels = useSelector(labelsSelector);

  const selectLabel = useCallback((
    iri: string | undefined,
    defaultValue: string | null | undefined = undefined,
    labelType: LabelType = LabelType.General,
    ) => {
      if (iri === undefined) {
        if (defaultValue === undefined) {
          return "";
        } else {
          return defaultValue;
        }
      }
      const label = labelSelector(labels, navigation.language, iri);
      if (label === undefined) {
        if (!isBlankNode(iri)) {
          dispatch(fetchLabel(iri, navigation.language, labelType));
        }
        if (defaultValue === undefined) {
          return iri;
        } else {
          return defaultValue;
        }
      } else {
        return label;
      }
    },
    [navigation.language, labels]
  );

  return selectLabel;
}

function isBlankNode(iri: string) {
  return iri.startsWith("_:");
}

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

function fetchLabel(
  iri: string, language: string, type:LabelType
): ThunkVoidResult {
  return async (dispatch, getState) => {
    const shouldFetch = shouldFetchSelector(getState(), iri, language);
    if (!shouldFetch) {
      return;
    }
    dispatch(LabelActions.fetchLabel.request({
      "iri": iri,
      "language": language,
    }));
    try {
      let response
      switch (type) {
      case LabelType.Dataset:
        response = await getApi().fetchDatasetLabel(language, iri);
        break;
      case LabelType.General:
      default:
        response = await getApi().fetchLabel(language, iri);
        break;
      }
      dispatch(LabelActions.fetchLabel.success({
        "labels": response.labels,
      }));
    } catch (ex) {
      console.log("Can't fetch label for", iri, "in", language, ex);
      dispatch(LabelActions.fetchLabel.failure());
    }
  };
}

export function labelSelector(
  labels: { [iri: string]: Literal }, language: string, iri: string,
): string | undefined {
  const literal = labels[iri];
  if (literal === undefined) {
    reportMissingLabel(iri, language, {});
    return undefined;
  }
  if (literal[language]) {
    return literal[language];
  }
  reportMissingLabel(iri, language, literal);
  // Return any available.
  for (const [labelLanguage, label] of Object.entries(literal)) {
    return label;
  }
}

const DEVELOP_REPORTED: Set<string> = new Set();

function reportMissingLabel(iri: string, language: string, literal: Literal) {
  if (process.env.NODE_ENV !== "production") {
    if (!DEVELOP_REPORTED.has(iri)) {
      DEVELOP_REPORTED.add(iri);
      console.log(
       "Missing label for  " + JSON.stringify(iri) + " for " + language
       + " available:", literal);
    }
  }
}
